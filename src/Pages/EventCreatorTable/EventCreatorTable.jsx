import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import {io} from 'socket.io-client';

const socket = io('http://localhost:3000');


const EventCreatorTable = () => {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = Cookies.get('userId');
  const [amounts, setAmounts] = useState({});

  // Normalize column names (lowercase and remove spaces)
  const normalize = (str) => {
    return str.toLowerCase().replace(/\s+/g, '');
  };

  const [bidsByUser, setBidsByUser] = useState({});
  const [newBid, setNewBid] = useState('');

  useEffect(() => {
      socket.on('userBids', (updatedBids) => {
        // Update state with the latest bids by user
        setBidsByUser(updatedBids);
      });
  
      // Cleanup on component unmount
      return () => {
        socket.off('userBids');
      };
    }, []);
  // Fetch event data by eventId
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/event/getEvents/${eventId}`);
        setEventData(response.data);
        console.log("Table data", response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching event data: ", err);
        setError("Failed to load event data.");
        setLoading(false);
      }
    };
    fetchEventData();
  }, [eventId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const { event, items } = eventData;

  const handleSubmit = async (rowId) => {
    const bidAmount = parseFloat(amounts[rowId]); // Get the amount for the specific row
    if (isNaN(bidAmount)) {
      alert('Please enter a valid amount.');
      return;
    }

    const bidData = {
      userId,
      amount: bidAmount,
      itemId: rowId,  // Use rowId as itemId since they are the same
      eventId,
    };

    try {
      const response = await axios.post('http://localhost:3000/bid', bidData);
      console.log(response.data.message);
    } catch (error) {
      console.log(error.response?.data?.error || 'Error placing bid.');
    }
  };

  return (
    <div className="max-w-full h-[100vh] flex flex-col gap-8 my-6 mx-4">
      <div className="w-full p-4 border-blue-700 border-2 rounded-2xl">
        <p className="text-2xl font-bold text-blue-700">{event.eventName}</p>
        <p className="text-lg text-gray-700">{event.description}</p>
        <p className="text-sm text-gray-500">Date: {new Date(event.eventDate).toLocaleDateString()}</p>
        <p className="text-sm text-gray-500">
          Time: {new Date(event.startTime).toLocaleTimeString()} - {new Date(event.endTime).toLocaleTimeString()}
        </p>
      </div>

      {/* Items Table */}
      {
        event.createdBy === userId ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  {items.length > 0 && items[0]?.columns.map((col, index) => (
                    <th key={index} className="border p-2 bg-gray-100 text-left">{col}</th>
                  ))}
                  {/* Headers for Bidder 1, Bidder 2, and Bidder 3 */}
                  <th className="border p-2 bg-gray-100 text-left">Bidder 1</th>
                  <th className="border p-2 bg-gray-100 text-left">Bidder 2</th>
                  <th className="border p-2 bg-gray-100 text-left">Bidder 3</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, itemIndex) => {
                  const sortedRows = [...item.rows].sort((a, b) => b.bidAmount - a.bidAmount);
                  return item.rows.map((row, rowIndex) => (
                    <tr key={`${itemIndex}-${rowIndex}`}>
                      {item.columns.map((column, colIndex) => (
                        <td key={colIndex} className="border p-2">
                          {row.data[normalize(column)]} {/* Access data field using normalized column */}
                        </td>
                      ))}
                      {/* Display bids for Bidder 1, 2, 3 */}
                      <td className="border p-2">
                        {sortedRows[0] && sortedRows[0].userId === row.userId ? (
                          <>Rank: 1 <br />Amount: ${sortedRows[0].bidAmount}</>
                        ) : null}
                      </td>
                      <td className="border p-2">
                        {sortedRows[1] && sortedRows[1].userId === row.userId ? (
                          <>Rank: 2 <br />Amount: ${sortedRows[1].bidAmount}</>
                        ) : null}
                      </td>
                      <td className="border p-2">
                        {sortedRows[2] && sortedRows[2].userId === row.userId ? (
                          <>Rank: 3 <br />Amount: ${sortedRows[2].bidAmount}</>
                        ) : null}
                      </td>
                    </tr>
                  ));
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  {items.length > 0 && items[0]?.columns.map((col, index) => (
                    <th key={index} className="border p-2 bg-gray-100 text-left">{col}</th>
                  ))}
                  <th className="border p-2 bg-gray-100 text-left">Bid Amount</th>
                  <th className="border p-2 bg-gray-100 text-left">Rank</th>
                  <th className="border p-2 bg-gray-100 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, itemIndex) => (
                  item.rows.map((row, rowIndex) => (
                    <tr key={`${itemIndex}-${rowIndex}`}>
                      {item.columns.map((column, colIndex) => (
                        <td key={colIndex} className="border p-2">
                          {row.data[normalize(column)]} {/* Access row data using normalized column */}
                        </td>
                      ))}
                      <td className="border p-2">
                        <input
                          type="text"
                          value={amounts[row._id] || ''}
                          onChange={(e) => setAmounts(prev => ({
                            ...prev,
                            [row._id]: e.target.value,
                          }))}
                          className="border rounded px-2 py-1"
                        />
                      </td>
                      <td className="border p-2">1</td>
                      <td className="border p-2">
                        <button
                          onClick={() => handleSubmit(row._id)}
                          className="bg-blue-500 text-white rounded p-2"
                        >
                          Submit
                        </button>
                      </td>
                    </tr>
                  ))
                ))}
              </tbody>

            </table>
          </div>
        )
      }
    </div>
  );
};

export default EventCreatorTable;

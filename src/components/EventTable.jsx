import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000/');

const EventTable = () => {
  const { state } = useLocation();
  const { eventData } = state || {};

  const [userInputs, setUserInputs] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    socket.on('updateLeaderboard', (updatedLeaderboard) => {
      setLeaderboard(updatedLeaderboard);
    });

    return () => {
      socket.off('updateLeaderboard');
    };
  }, []);

  const handleBidSubmit = async (userId, bidAmount) => {
    if (userId && bidAmount) {
      const bidData = {
        userId,
        amount: bidAmount,
        timestamp: new Date().toISOString(),
      };

      socket.emit('updateBid', bidData);

      try {
        const response = await fetch('http://localhost:3000/bid', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bidData),
        });

        const result = await response.json();
        if (result.success) {
          console.log('Bid submitted successfully');
        } else {
          console.error('Failed to submit bid');
        }
      } catch (error) {
        console.error('Error submitting bid:', error);
      }
    } else {
      console.error('Both userId and bid amount are required');
    }
  };

  const { eventName, startTime, endTime, columns = [], rows = [] } = eventData || {};
  console.log("Show event data", eventData);

  if (!eventData) {
    return <div className="text-center text-gray-600 mt-10">Event data not found.</div>;
  }

  const getRank = (userId) => {
    const rank = leaderboard.findIndex((entry) => entry.userId === userId);
    return rank !== -1 ? rank + 1 : '-';
  };

  // Function to handle changes to user input for each row
  const handleInputChange = (index, field, value) => {
    const updatedInputs = [...userInputs];
    updatedInputs[index] = {
      ...updatedInputs[index],
      [field]: value,
    };
    setUserInputs(updatedInputs);
  };

  return (
    <div className="w-full min-h-screen flex flex-col gap-8 p-8 bg-gray-50">
      <div className="flex flex-col p-6 rounded-2xl bg-blue-100 shadow-md items-center">
        <p className="text-3xl font-bold text-blue-900">{eventName} EVENT</p>
        <div className="mt-4 flex">
          <p className="text-xl mx-4 font-medium">
            Event Name: <span className="font-bold">{eventName}</span>
          </p>
          <p className="text-xl mx-4 font-medium">
            Start at: <span className="font-bold">{startTime}</span>
          </p>
          <p className="text-xl font-medium mx-4">
            End at: <span className="font-bold">{endTime}</span>
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-xl shadow-md bg-white">
          <thead className="bg-blue-600 text-white">
            <tr>
              {columns.map((col, index) => (
                <th key={index} className="px-4 py-3 text-left font-semibold text-sm uppercase tracking-wider">
                  {col.name || 'Invalid Column'}
                </th>
              ))}
              <th className="px-4 py-3 text-left font-semibold text-sm uppercase tracking-wider">User ID</th>
              <th className="px-4 py-3 text-left font-semibold text-sm uppercase tracking-wider">Bid Amount</th>
              <th className="px-4 py-3 text-left font-semibold text-sm uppercase tracking-wider">Rank</th>
              <th className="px-4 py-3 text-left font-semibold text-sm uppercase tracking-wider">Submit</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
             <tr key={rowIndex} className={`border-t ${rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-100`}>
             {/* Render itemName and quantity directly for the first two columns */}
             <td className="px-4 py-3 text-gray-700 text-sm">
               {row.itemName !== undefined ? row.itemName : 'Invalid data'}
             </td>
             <td className="px-4 py-3 text-gray-700 text-sm">
               {row.quantity !== undefined ? row.quantity : 'Invalid data'}
             </td>
           
             {/* Loop through the remaining columns and display corresponding data from row */}
             {columns.slice(2).map((col, colIndex) => (
               <td key={colIndex} className="px-4 py-3 text-gray-700 text-sm">
                 {/* Match row data with the column name */}
                 {row[col.name.toLowerCase().replace(" ", "")] !== undefined
                   ? row[col.name.toLowerCase().replace(" ", "")]
                   : 'Invalid data'}
               </td>
             ))}
                <td className="px-4 py-3 text-gray-700 text-sm">
                  <input
                    type="text"
                    value={userInputs[rowIndex]?.userId || ''}
                    onChange={(e) => handleInputChange(rowIndex, 'userId', e.target.value)}
                    placeholder="Enter your user ID"
                    className="p-2 border border-gray-300 rounded"
                  />
                </td>
                <td className="px-4 py-3 text-gray-700 text-sm">
                  <input
                    type="number"
                    value={userInputs[rowIndex]?.newBid || ''}
                    onChange={(e) => handleInputChange(rowIndex, 'newBid', e.target.value)}
                    placeholder="Enter your bid"
                    className="p-2 border border-gray-300 rounded"
                  />
                </td>
                <td className="px-4 py-3 text-green-400 text-sm">
                  {getRank(userInputs[rowIndex]?.userId)}
                </td>
                <td className="px-4 py-3 text-gray-700 text-sm">
                  <button
                    onClick={() =>
                      handleBidSubmit(userInputs[rowIndex]?.userId, userInputs[rowIndex]?.newBid)
                    }
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    Submit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventTable;

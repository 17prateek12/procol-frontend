import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

function Test() {
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

  const handleBidSubmit = () => {
    if (newBid) {
      // Send bid with the current user's socket ID (automatically sent by socket.io)
      socket.emit('updateBid', { amount: newBid, timestamp: new Date().toISOString() });
      setNewBid('');
    }
  };

  return (
    <div>
      <div>
        <input
          type="number"
          value={newBid}
          onChange={(e) => setNewBid(e.target.value)}
          placeholder="Enter your bid"
        />
        <button onClick={handleBidSubmit}>Submit Bid</button>
      </div>
      <h2>Bids by User:</h2>
      <div>
        {Object.entries(bidsByUser).map(([userId, userBids]) => (
          <div key={userId}>
            <h3>User {userId}</h3>
            <ul>
              {userBids.map((bid, index) => (
                <li key={index}>
                  <strong>Bid {index + 1}</strong>: ${bid.amount} at {new Date(bid.timestamp).toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Test;

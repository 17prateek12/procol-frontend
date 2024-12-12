import React from 'react';

function EventModal({ event, closeModal }) {
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50'>
      <div className='bg-white p-6 rounded-lg w-[70%]'>
        <div className='flex justify-between'>
        <h2 className=' font-bold mb-4'>{event.eventName}</h2>
        <button onClick={closeModal} className=''>&#10005;</button>
        </div>
        <table className='min-w-full'>
          <thead>
            <tr>
              <th className='border p-2'>Bidder Name</th>
              <th className='border p-2'>Bid Amount</th>
              <th className='border p-2'>Bid Time</th>
            </tr>
          </thead>
          <tbody>
            {event.bidders.map((bidder, index) => (
              <tr key={index}>
                <td className='border p-2'>{bidder.name}</td>
                <td className='border p-2'>{bidder.bidAmount}</td>
                <td className='border p-2'>{bidder.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EventModal;

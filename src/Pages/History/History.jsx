import React, { useState } from 'react';
import EventModal from './EventModal';  

function History() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const TestData = [
    { "eventName": "Music Concert", "duration": "2 hours", "startTime": "2024-12-15T18:00:00", "bidders": [ { "name": "John Doe", "bidAmount": "$150", "time": "2024-12-15T18:10:00" }, { "name": "Jane Smith", "bidAmount": "$200", "time": "2024-12-15T18:20:00" }, { "name": "Tom Brown", "bidAmount": "$250", "time": "2024-12-15T18:40:00" } ] },
    { "eventName": "Tech Conference", "duration": "3 hours", "startTime": "2024-12-16T09:00:00", "bidders": [ { "name": "Alice White", "bidAmount": "$500", "time": "2024-12-16T09:10:00" }, { "name": "David Green", "bidAmount": "$550", "time": "2024-12-16T09:30:00" } ] },
    { "eventName": "Art Exhibition", "duration": "1.5 hours", "startTime": "2024-12-17T15:30:00", "bidders": [ { "name": "Eve Black", "bidAmount": "$100", "time": "2024-12-17T15:40:00" }, { "name": "Grace Blue", "bidAmount": "$120", "time": "2024-12-17T15:50:00" } ] },
    { "eventName": "Movie Premiere", "duration": "2.5 hours", "startTime": "2024-12-18T20:00:00", "bidders": [ { "name": "Jack Red", "bidAmount": "$300", "time": "2024-12-18T20:30:00" }, { "name": "Lily Pink", "bidAmount": "$350", "time": "2024-12-18T20:45:00" } ] },
    { "eventName": "Cooking Workshop", "duration": "4 hours", "startTime": "2024-12-19T11:00:00", "bidders": [ { "name": "Oliver Grey", "bidAmount": "$75", "time": "2024-12-19T11:15:00" }, { "name": "Sophia Yellow", "bidAmount": "$100", "time": "2024-12-19T11:30:00" } ] },
    { "eventName": "Dance Performance", "duration": "1.5 hours", "startTime": "2024-12-20T17:00:00", "bidders": [ { "name": "Nina Violet", "bidAmount": "$200", "time": "2024-12-20T17:10:00" }, { "name": "Ethan Black", "bidAmount": "$220", "time": "2024-12-20T17:25:00" } ] },
    { "eventName": "Gaming Tournament", "duration": "6 hours", "startTime": "2024-12-21T10:00:00", "bidders": [ { "name": "Mason Green", "bidAmount": "$600", "time": "2024-12-21T10:30:00" }, { "name": "Isabella White", "bidAmount": "$650", "time": "2024-12-21T11:00:00" } ] },
    { "eventName": "Charity Gala", "duration": "3 hours", "startTime": "2024-12-22T19:00:00", "bidders": [ { "name": "Benjamin Brown", "bidAmount": "$500", "time": "2024-12-22T19:15:00" }, { "name": "Emma Blue", "bidAmount": "$550", "time": "2024-12-22T19:30:00" } ] }
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setModalOpen(true); 
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const filteredData = TestData.filter(val => 
    val.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    val.duration.toLowerCase().includes(searchQuery.toLowerCase()) ||
    val.startTime.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className='w-[100%] p-2'>
        <form className='flex justify-center mt-4 mb-8'>
          <input
            type="search"
            placeholder='Search for an event'
            value={searchQuery}
            onChange={handleSearchChange}
            className='rounded border-2 p-2 mr-2 w-[70%]'
          />
          <button type="button" className='px-4 bg-black p-2 text-white rounded'>Search</button>
        </form>

        <div>
          {filteredData.map((val, key) => (
            <div
              key={key}
              className='border-2 flex justify-evenly rounded-md p-4 my-2 cursor-pointer bg-black text-white'
              onClick={() => handleEventClick(val)}
            >
              <h1 className="text-xl font-bold">{val.eventName}</h1>
              <h2>{val.duration}</h2>  
              <h2> {val.startTime}</h2>
            </div>
          ))}
        </div>
      </div>

      {modalOpen && selectedEvent && (
        <EventModal event={selectedEvent} closeModal={closeModal} />
      )}
    </>
  );
}

export default History;

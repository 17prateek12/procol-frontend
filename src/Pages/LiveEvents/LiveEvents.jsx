import React, { useState, useEffect } from 'react';
import { getLiveEvent } from '../../Api/Event/event';
import EventCard from "../../components/EventCard";

function LiveEvents() {
  const [searchQuery, setSearchQuery] = useState('');
  const [liveEvents, setLiveEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tab, setTab] = useState('liveEvents');

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError('');

      try {
        const { liveEvents, upcomingEvents } = await getLiveEvent();
        setLiveEvents(liveEvents);
        console.log("live event", liveEvents)
        setUpcomingEvents(upcomingEvents);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch events.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

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

  const filteredEvents = (tab === 'liveEvents' ? liveEvents : upcomingEvents)?.filter((val) =>
    val.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    val.duration.toLowerCase().includes(searchQuery.toLowerCase()) ||
    new Date(val.startTime).toLocaleString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full p-4">
      {/* Tabs */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setTab('liveEvents')}
          className={`px-4 py-2 mx-2 ${tab === 'liveEvents' ? 'bg-black text-white' : 'bg-gray-200 text-black'} rounded`}
        >
          Live Events
        </button>
        <button
          onClick={() => setTab('upcomingEvents')}
          className={`px-4 py-2 mx-2 ${tab === 'upcomingEvents' ? 'bg-black text-white' : 'bg-gray-200 text-black'} rounded`}
        >
          Upcoming Events
        </button>
      </div>

      <form className="flex justify-center mt-4 mb-8">
        <input
          type="search"
          placeholder="Search for an event"
          value={searchQuery}
          onChange={handleSearchChange}
          className="rounded border-2 p-2 mr-2 w-3/4"
        />
        <button type="button" className="px-4 bg-black p-2 text-white rounded">
          Search
        </button>
      </form>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : filteredEvents?.length === 0 ? (
        <p className="text-center text-gray-500">No events found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredEvents?.map((event) => (
            <EventCard
            key={event.id || event._id} // Use unique key
                        event={event} // Pass event object as prop
                        type={"participate"}
            />
            //<div
            //  key={index}
            //  className="border rounded-md p-4 cursor-pointer bg-white shadow-lg hover:shadow-xl transition duration-300"
            //  onClick={() => handleEventClick(event)}
            //>
            //  <h1 className="text-lg font-bold mb-2">{event.eventName}</h1>
            //  <p className="text-sm text-gray-700 mb-2">Duration: {event.duration}</p>
            //  <p className="text-sm text-gray-700 mb-2">Start Time: {new Date(event.startTime).toLocaleString()}</p>
            //</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LiveEvents;
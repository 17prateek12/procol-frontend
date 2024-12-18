import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import EventCard from '../../components/EventCard';
import { getEventCreatedByMe } from '../../Api/Event/event';

const MyEvent = () => {
    const [myEvent, setMyEvent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMyEvents = async () => {
            try {
                const events = await getEventCreatedByMe();
                setMyEvent(events.events); // Assuming the API returns the array of events
                console.log("show mine event",events)
            } catch (err) {
                setError(err || "Failed to fetch events");
            } finally {
                setLoading(false);
            }
        };

        fetchMyEvents();
    }, []);

    if (loading) {
        return <div className="w-full h-full flex justify-center items-center my-4">Loading your events...</div>;
    }

    if (error) {
        return <div className="w-full h-full flex justify-center items-center my-4">Error: {error}</div>;
    }

    return (
        <div className='w-full h-full flex flex-col justify-center items-center my-4'>
            <h1 className='text-3xl font-bold'>My Event</h1>
            <div className='w-full flex justify-center items-center flex-wrap gap-6 mt-24'>
                {myEvent.map((event) => (
                    <EventCard
                        key={event.id || event._id} // Use unique key
                        event={event} // Pass event object as prop
                        type={"view"}
                    />
                ))}
            </div>
        </div>
    );
};

export default MyEvent;

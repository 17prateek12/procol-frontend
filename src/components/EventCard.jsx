import React from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'

const EventCard = ({event, type}) => {
  return (
    <div className='w-[300px] h-[300px] rounded-xl border border-gray-300 p-4 flex flex-col'>
        <div className='text-2xl text-black text-wrap font-bold text-center h-[100px]'>{event.eventName}</div>
        <div className='text-[16px] text-center h-[100px]'>{event.description}</div>
        <Link to={`/home/event-room/${event._id}`} className='mx-auto' >
        <Button type={type} label={"View Event"} />
        </Link>
    </div>
  )
}

export default EventCard
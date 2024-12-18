import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import CreateEvents from '../CreateEvents/CreateEvents';
import LiveEvents from '../LiveEvents/LiveEvents';
import EventTable from '../../components/EventTable';
import Sidebar from '../../Sidebar/Sidebar';
import History from '../History/History';
import Logout from '../Logout/Logout';
import MyEvent from '../MyEvent/MyEvent';
import EventCreatorTable from '../EventCreatorTable/EventCreatorTable';

const LandingPage = () => {
  return (
    <div className="w-full h-full flex items-start">
      <Sidebar />
      <div className="w-full">
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/createEvent" element={<CreateEvents />} />
          <Route path="/liveEvent" element={<LiveEvents />} />
          <Route path="/history" element={<History />} />
          <Route path="/event-table" element={<EventTable />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/myevent' element={<MyEvent />} />
          <Route path='/event-room/:eventId' element={<EventCreatorTable />} />
        </Routes>
      </div>
    </div>
  );
};

export default LandingPage;

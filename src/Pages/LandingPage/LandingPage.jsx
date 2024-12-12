import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import CreateEvents from '../CreateEvents/CreateEvents';
import LiveEvents from '../LiveEvents/LiveEvents';
import EventTable from '../../components/EventTable';
import Sidebar from '../../Sidebar/Sidebar';
import History from '../History/History';

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
        </Routes>
      </div>
    </div>
  );
};

export default LandingPage;

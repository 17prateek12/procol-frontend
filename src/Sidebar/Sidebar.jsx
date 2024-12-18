import React from 'react';
import { Link } from 'react-router-dom';

export const SidebarData = [
  { title: "Home", link: '/home' },
  { title: "Create Event", link: '/home/createEvent' },
  { title: "My Event", link: '/home/myevent' },
  { title: "Live Event", link: '/home/liveEvent' },
  { title: "History", link: '/home/history' },
  { title: "Logout", link: '/home/logout' }
];

const Sidebar = () => {
  return (
    <div className='bg-black text-white w-[250px] h-[100vh] relative'>
      <ul className="pt-12 md:pt-12 w-full">
        {SidebarData.map((val, key) => (
          <li className='my-8' key={key}>
            <Link
              to={val.link}
              className="flex items-center px-4 text-prShade hover:text-blue-400 text-lg p-2 font-bold w-[100%]"
            >
              <div>{val.title}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
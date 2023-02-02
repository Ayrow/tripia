import { NavLink } from 'react-router-dom';
import links from '../utils/userlinks';

const DashboardLeftSidebar = () => {
  return (
    <div className='relative h-0 sm:h-20 md:h-full dark:bg-gray-800'>
      <div className='hidden sm:flex md:grid grid-cols-1 items-center w-full'>
        {links.map((link) => {
          const { id, text, path, icon } = link;
          return (
            <NavLink
              key={id}
              to={path}
              className={({ isActive, isPending }) =>
                isActive
                  ? 'flex gap-2 sm:flex-grow lg:flex-grow-0 sm:justify-center lg:justify-start capitalize p-7 hover:bg-slate-600 bg-slate-700'
                  : 'flex gap-2 sm:flex-grow lg:flex-grow-0 sm:justify-center lg:justify-start capitalize p-7 hover:bg-slate-600 '
              }>
              {icon} {text}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};
export default DashboardLeftSidebar;

import { NavLink } from 'react-router-dom';
import links from '../utils/userlinks';

const DashboardLeftSidebar = () => {
  return (
    <div className='relative dark:bg-gray-800'>
      <div className='grid grid-cols-1 items-center'>
        {links.map((link) => {
          const { id, text, path, icon } = link;
          return (
            <NavLink
              key={id}
              to={path}
              className={({ isActive, isPending }) =>
                isActive
                  ? 'flex gap-2 capitalize p-7 hover:bg-slate-600 bg-slate-700'
                  : 'flex gap-2 capitalize p-7 hover:bg-slate-600 '
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

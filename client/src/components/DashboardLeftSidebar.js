import { Link } from 'react-router-dom';
import links from '../utils/userlinks';

const DashboardLeftSidebar = () => {
  return (
    <div className='relative dark:bg-gray-800'>
      <div className='grid grid-cols-1 items-center'>
        {links.map((link) => {
          const { id, text, path, icon } = link;
          return (
            <Link
              key={id}
              to={path}
              className='flex gap-2 capitalize p-3 hover:bg-slate-300'>
              {icon} {text}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default DashboardLeftSidebar;

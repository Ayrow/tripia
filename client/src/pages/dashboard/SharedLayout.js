import { Outlet } from 'react-router-dom';
import DashboardLeftSidebar from '../../components/DashboardLeftSidebar';

const SharedLayout = () => {
  return (
    <div>
      <main className='dashboard'>
        <DashboardLeftSidebar />
        <div>
          <div>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};
export default SharedLayout;

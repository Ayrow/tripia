import { Outlet } from 'react-router-dom';
import DashboardLeftSidebar from '../../components/DashboardLeftSidebar';
import Navbar from '../../components/Navbar';

const SharedLayout = () => {
  return (
    <div>
      <main className='dashboard'>
        <DashboardLeftSidebar />
        <div>
          {/*  <Navbar /> */}
          <div>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};
export default SharedLayout;

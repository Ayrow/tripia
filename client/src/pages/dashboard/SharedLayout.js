import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const SharedLayout = () => {
  return (
    <div>
      <main>
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

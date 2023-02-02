import { useEffect } from 'react';
import { useUserContext } from '../../context/user/userContext';

const DashboardMain = () => {
  const { user } = useUserContext();

  useEffect(() => {
    console.log('user.saved', user.saved);
  }, []);

  return (
    <div>
      <div>
        <h2 className='text-center text-2xl mb-10 pt-4'>Dashboard</h2>
        <p className='text-center text-xl mb-10 pt-4'>
          Go ahead and share your journeys!
        </p>
      </div>
    </div>
  );
};
export default DashboardMain;

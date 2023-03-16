import { useEffect } from 'react';
import { useTripContext } from '../../context/trip/tripContext';
import { useUserContext } from '../../context/user/userContext';

const DashboardMain = () => {
  const { user } = useUserContext();
  const { userTrips, getUserTrips } = useTripContext();

  useEffect(() => {
    getUserTrips();
    console.log('user.saved', user.saved);
    console.log('userTrips', userTrips);
  }, []);

  return (
    <div className='my-5'>
      <h2 className='text-center text-2xl mb-10 pt-4'>Dashboard</h2>
      <div className='flex-wrap items-center justify-center gap-8 text-center sm:flex'>
        <div className='w-full px-4 py-4 mt-6 rounded-lg shadow-lg sm:w-1/2 md:w-1/2 lg:w-1/4 bg-gray-800'>
          <div className='flex-shrink-0'>
            <div className='flex items-center justify-center w-12 h-12 mx-auto text-white bg-indigo-500 rounded-md'>
              <h3 className='text-xl font-bold'>{userTrips.length}</h3>
            </div>
          </div>
          <h3 className='py-4 text-2xl font-semibold sm:text-xl text-white'>
            Trips posted
          </h3>
        </div>

        {/*  */}

        <div className='w-full px-4 py-4 mt-6 rounded-lg shadow-lg sm:w-1/2 md:w-1/2 lg:w-1/4 bg-gray-800'>
          <div className='flex-shrink-0'>
            <div className='flex items-center justify-center w-12 h-12 mx-auto text-white bg-indigo-500 rounded-md'>
              <h3 className='text-xl font-bold'>{user.saved.length}</h3>
            </div>
          </div>
          <h3 className='py-4 text-2xl font-semibold sm:text-xl text-white'>
            Saved Trips
          </h3>
        </div>

        {/*  */}
      </div>
    </div>
  );
};
export default DashboardMain;

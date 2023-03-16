import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTripContext } from '../../context/trip/tripContext';
import { useUserContext } from '../../context/user/userContext';

const DashboardMain = () => {
  const { user } = useUserContext();
  const { userTrips, getUserTrips } = useTripContext();
  const navigate = useNavigate();

  useEffect(() => {
    getUserTrips();
  }, []);

  return (
    <div className='my-5 mx-5'>
      <h2 className='text-center text-3xl mb-10 pt-4 font-bold'>Dashboard</h2>
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

          <div className='flex gap-5 pr-5 py-5 text-xl justify-center'>
            <button
              className='btn btn-hipster flex items-center px-6'
              onClick={() => navigate('/dashboard/my-trips')}>
              See your Trips
            </button>
            <button
              className='btn btn-success px-6'
              onClick={() => navigate('/dashboard/my-trips')}>
              Add new Trip
            </button>
          </div>
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
          <div className='flex gap-5 pr-5 py-5 text-xl justify-center'>
            <button
              className='btn btn-hipster flex items-center px-6'
              onClick={() => navigate('/dashboard/saved-trips')}>
              Go to Saved Trips
            </button>
            <button
              className='btn btn-success px-6'
              onClick={() => navigate('/explore')}>
              Explore More trips
            </button>
          </div>
        </div>

        {/*  */}
      </div>
    </div>
  );
};
export default DashboardMain;

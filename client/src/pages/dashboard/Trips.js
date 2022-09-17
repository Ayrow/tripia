import { useEffect } from 'react';
import CreateTripForm from '../../components/CreateTripForm';
import { useAppContext } from '../../context/appContext';

const Trips = () => {
  const { trips, getUserTrips } = useAppContext();

  useEffect(() => {
    getUserTrips();
  }, [trips]);

  return (
    <div>
      <div>
        <h2 className='text-center text-2xl'>My trips</h2>
      </div>
      <div className='flex justify-center mt-2'>
        <button
          type='button'
          className='flex btn gap-2 place-items-center bg-orange-500'>
          Add a new trip
        </button>
      </div>
      <CreateTripForm />
    </div>
  );
};
export default Trips;

import { useEffect } from 'react';
import TravelCard from './TravelCard';
import { useTripContext } from '../context/tripContext';

const CardsList = () => {
  const { allTrips, getAllTrips } = useTripContext();

  useEffect(() => {
    getAllTrips();
  }, []);

  return (
    <div className='my-10'>
      <div className='grid grid-cols-1 md:grid-cols-2 mx-5 gap-10 place-items-center'>
        {allTrips.map((trip) => {
          return <TravelCard key={trip._id} {...trip} />;
        })}
      </div>
    </div>
  );
};
export default CardsList;

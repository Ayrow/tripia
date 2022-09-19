import { useEffect } from 'react';
import { useAppContext } from '../context/appContext';
import TravelCard from './TravelCard';

const CardsList = () => {
  const { allTrips, getAllTrips } = useAppContext();

  useEffect(() => {
    getAllTrips();
  }, []);

  return (
    <div className=''>
      <div>
        <h2 className='text-center text-3xl my-10'>
          Explore trips recommanded by other globetrotters !
        </h2>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 mx-5 gap-10 place-items-center'>
        {allTrips.map((trip) => {
          return <TravelCard key={trip._id} {...trip} />;
        })}
      </div>
    </div>
  );
};
export default CardsList;

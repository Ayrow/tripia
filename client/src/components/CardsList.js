import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TravelCard from './TravelCard';
import { useTripContext } from '../context/tripContext';

const CardsList = () => {
  const { allTrips, getAllTrips } = useTripContext();

  const navigate = useNavigate();

  useEffect(() => {
    getAllTrips();
  }, []);

  return (
    <div className='my-10'>
      <div className='my-10 text-center w-full px-5'>
        <h2 className='text-3xl '>
          Explore trips recommanded by other globetrotters !
        </h2>
        <p className='pt-5 text-xl'>
          Browse trips, check out the details and save them to keep being
          inspired
        </p>
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

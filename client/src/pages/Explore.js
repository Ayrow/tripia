import { useEffect } from 'react';
import CardsList from '../components/CardsList';
import FilterTrips from '../components/FilterTrips';
import { useTripContext } from '../context/tripContext';

const Explore = () => {
  const { getAllTrips, sort, search, theme, page } = useTripContext();

  useEffect(() => {
    getAllTrips();
  }, [sort, search, theme, page]);

  return (
    <div>
      <div className='my-10 text-center w-full px-5'>
        <h2 className='text-3xl '>
          Explore trips recommanded by other globetrotters !
        </h2>
        <p className='pt-5 text-xl'>
          Browse trips, check out the details and save them to keep being
          inspired
        </p>
      </div>
      <FilterTrips />
      <CardsList />
    </div>
  );
};
export default Explore;

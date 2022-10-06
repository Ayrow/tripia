import { useEffect } from 'react';
import CardsList from '../components/CardsList';
import FilterTrips from '../components/FilterTrips';
import Loading from '../components/Loading';
import { useAppContext } from '../context/app/appContext';
import { useTripContext } from '../context/trip/tripContext';

const Explore = () => {
  const { getAllTrips, sort, search, theme, maxPrice, page } = useTripContext();
  const { isLoading } = useAppContext();

  useEffect(() => {
    getAllTrips();
  }, [sort, search, theme, page, maxPrice]);

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
      {isLoading ? <Loading center={true} /> : <CardsList />}
    </div>
  );
};
export default Explore;

import TravelCard from './TravelCard';
import { useTripContext } from '../context/trip/tripContext';
import PageBtnContainer from './PageBtnContainer';

const CardsList = () => {
  const { allTrips, numOfPages } = useTripContext();

  return (
    <div className='my-10'>
      <div className='grid grid-cols-1 md:grid-cols-2 mx-5 gap-10 place-items-center'>
        {allTrips.map((trip) => {
          return <TravelCard key={trip._id} {...trip} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </div>
  );
};
export default CardsList;

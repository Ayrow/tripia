import { Fragment, useEffect } from 'react';
import HeroLanding from '../components/HeroLanding';
import { useTripContext } from '../context/trip/tripContext';
import TravelCard from '../components/TravelCard';

const LandingPage = () => {
  const { getTripsLandinPage, allTrips } = useTripContext();

  useEffect(() => {
    getTripsLandinPage();
  }, []);

  return (
    <Fragment>
      <HeroLanding />
      <div className='my-10'>
        <h2 className=' text-3xl text-center pb-5'>Most saved trips</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 mx-5 gap-10 place-items-center'>
          {allTrips.map((trip) => {
            return <TravelCard key={trip._id} {...trip} />;
          })}
        </div>
      </div>
    </Fragment>
  );
};
export default LandingPage;

import { Fragment } from 'react';
import fakeList from '../data-travel.json';
import TravelCard from '../components/TravelCard';

import HeroLanding from '../components/HeroLanding';

const LandingPage = () => {
  return (
    <Fragment>
      <HeroLanding />
      <div className='py-10'>
        <h2 className=' text-3xl text-center pb-5'>Latest experiences</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 mx-5 gap-10 place-items-center'>
          {fakeList.map((item) => {
            return <TravelCard key={item.id} {...item} />;
          })}
        </div>
      </div>
    </Fragment>
  );
};
export default LandingPage;

import { Fragment } from 'react';

import HeroLanding from '../components/HeroLanding';
import CardsList from '../components/CardsList';

const LandingPage = () => {
  return (
    <Fragment>
      <HeroLanding />
      <CardsList />
    </Fragment>
  );
};
export default LandingPage;

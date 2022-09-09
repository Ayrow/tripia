import { Fragment } from 'react';

import HeroLanding from '../components/HeroLanding';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <Fragment>
      <HeroLanding />
      <Footer />
    </Fragment>
  );
};
export default LandingPage;

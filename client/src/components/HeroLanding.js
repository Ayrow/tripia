import { Link } from 'react-router-dom';
import Hero from '../assets/images/landing-hero.svg';

const HeroLanding = () => {
  return (
    <header className='flex'>
      <div className='p-20'>
        <h2 className=' text-3xl'>Find and share your next adventure</h2>
        <p className='py-10'>
          Need advices or inspiration for your future holidays? <br />
          This is the place to be! Find details about others' trip and make your
          own!
          <br />
          You can also share your experiences to help other travellers.
        </p>
        <div className='flex gap-5'>
          <Link to='/explore' className='btn'>
            Explore
          </Link>
          <Link to='/register' className='btn'>
            Register
          </Link>
        </div>
      </div>
      <div className='hidden md:flex w-1/2'>
        <img src={Hero} alt='hero' className='' />
      </div>
    </header>
  );
};
export default HeroLanding;

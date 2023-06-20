import { Link } from 'react-router-dom';
import Hero from '../assets/images/landing-hero.svg';
import bgVector from '../assets/images/hero-vector-bg.svg';
import { useUserContext } from '../context/user/userContext';

const HeroLanding = () => {
  const { user } = useUserContext();
  return (
    <header
      className='grid md:grid-cols-2 relative h-full w-full'
      style={{
        backgroundImage: `url(${bgVector})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}>
      <div className='p-20 flex flex-col justify-center items-center text-center'>
        <h2 className=' text-3xl'>Find and share your next adventure</h2>
        <p className='py-10 text-lg'>
          Need advices or inspiration for your future holidays? <br />
          This is the place to be!
          <br /> Find details about others' trip and make your own!
          <br />
          You can also share your experiences to help other travellers.
        </p>
        <div className='flex gap-5 text-xl '>
          <Link to='/explore' className='btn'>
            Explore
          </Link>
          {user ? (
            <Link to='/dashboard' className='btn'>
              Dashboard
            </Link>
          ) : (
            <Link to='/register' className='btn'>
              Register
            </Link>
          )}
        </div>
      </div>
      <div className='flex justify-center w-full'>
        <div className='hidden md:flex justify-center'>
          <img src={Hero} alt='hero' className='' />
        </div>
      </div>
    </header>
  );
};
export default HeroLanding;

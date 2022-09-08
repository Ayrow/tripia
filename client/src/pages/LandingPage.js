import { Fragment } from 'react';
import Hero from '../assets/images/landing-hero.svg';
import Logo from '../assets/images/logo-tripia.png';

const LandingPage = () => {
  return (
    <Fragment>
      <nav className='flex place-items-center w-full'>
        <div className='flex flex-col p-5 w-1/5 place-items-center'>
          <img src={Logo} alt='logo tripia' width='70px' height='70px' />
          <h1 className='text-xl uppercase'>Tripia</h1>
        </div>
        <div className='flex justify-end w-full pr-10'>
          <ul className='flex gap-10'>
            <li>Login / Register</li>
            <li>Dark mode</li>
          </ul>
        </div>
      </nav>
      <header className=''>
        <div>Text left</div>
        <div>img</div>
      </header>
    </Fragment>
  );
};
export default LandingPage;

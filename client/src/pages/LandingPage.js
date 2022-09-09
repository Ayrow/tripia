import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../assets/images/logo-tripia.png';
import HeroLanding from '../components/HeroLanding';

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
            <Link to='/register'>Login / Register</Link>
            <li>
              <div class='mb-3'>
                <div class='relative inline-block w-10 mr-2 align-middle select-none'>
                  <input
                    type='checkbox'
                    name='toggle'
                    id='Theme'
                    class='checked:bg-black outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer'
                  />
                  <label
                    for='Light'
                    class='block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer'></label>
                </div>
                <span class='text-white font-medium'>Light</span>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <HeroLanding />
    </Fragment>
  );
};
export default LandingPage;

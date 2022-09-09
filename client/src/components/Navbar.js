import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import Logo from '../assets/images/logo-tripia.png';
import ModalMenuMobile from './ModalMenuMobile';
import { useState } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleModalMenu = () => {
    setIsMobileMenuOpen(true);
  };

  return (
    <nav className='relative flex place-items-center'>
      <Link
        to='/landing'
        className='flex flex-col p-5 w-1/5 place-items-center'>
        <img src={Logo} alt='logo tripia' width='50px' height='50px' />
        <h1 className='text-xl uppercase'>Tripia</h1>
      </Link>
      <div className='flex justify-end place-items-center w-full pr-5 md:pr-10 md:gap-10'>
        <div className='hidden sm:flex'>
          <Link to='/explore'>Explore</Link>
          <Link to='/register'>Login / Register</Link>
          <div className='relative inline-block w-10 mr-2 align-middle select-none'>
            <input
              type='checkbox'
              name='toggle'
              id='Theme'
              className='checked:bg-black outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer'
            />
            <label
              htmlFor='Light'
              className='block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer'></label>
          </div>
          <span className='text-white font-medium'>Light</span>
        </div>
        <FaBars
          className='md:hidden cursor-pointer'
          onClick={toggleModalMenu}
        />
      </div>
      {isMobileMenuOpen && (
        <ModalMenuMobile setIsMobileMenuOpen={setIsMobileMenuOpen} />
      )}
    </nav>
  );
};
export default Navbar;

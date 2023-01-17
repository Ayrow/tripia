import { Link } from 'react-router-dom';
import Logo from '../assets/images/logo-tripia.png';
import { useUserContext } from '../context/user/userContext';
import DropdownUserBtn from './DropdownUserBtn';

const Navbar = () => {
  const { user, logoutUser } = useUserContext();

  const username = user?.username;

  return (
    <nav className='relative z-10 flex place-items-center w-full bg-gray-800'>
      <Link to='/' className='flex flex-wra p-5 w-1/5 place-items-center gap-2'>
        <img
          src={Logo}
          alt='logo tripia'
          width='50px'
          height='50px'
          className=' border bg-gray-200 rounded-full'
        />
        <h1 className='text-sm md:text-xl uppercase font-semibold'>Tripia</h1>
      </Link>
      <div className='flex justify-end place-items-center w-full pr-5 gap-8 sm:gap-10'>
        <Link to='/explore'>Explore</Link>

        {user ? (
          <>
            <DropdownUserBtn logoutUser={logoutUser} username={username} />
          </>
        ) : (
          <Link to='/register'>Login / Register</Link>
        )}
        {/* 
        <button type='button' className='flex'>
          <FaMoon className='text-black' />
          <FaSun className='text-white' />
        </button>*/}
      </div>
    </nav>
  );
};
export default Navbar;

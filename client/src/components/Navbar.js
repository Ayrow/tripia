import { Link } from 'react-router-dom';
import Logo from '../assets/images/logo-tripia.png';
import { FaMoon, FaSun } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className='relative flex place-items-center '>
      <Link
        to='/landing'
        className='flex flex-col p-5 w-1/5 place-items-center'>
        <img src={Logo} alt='logo tripia' width='50px' height='50px' />
        <h1 className='text-xl uppercase'>Tripia</h1>
      </Link>
      <div className='flex justify-end place-items-center w-full pr-5 gap-10'>
        <Link to='/explore'>Explore</Link>
        <Link to='/register'>Login / Register</Link>
        <button type='button' className='flex'>
          <FaMoon className='text-black' />
          <FaSun className='text-white' />
        </button>
      </div>
    </nav>
  );
};
export default Navbar;

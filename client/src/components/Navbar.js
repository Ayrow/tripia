import { Link } from 'react-router-dom';
import Logo from '../assets/images/logo-tripia.png';

const Navbar = () => {
  return (
    <nav className='flex place-items-center w-full'>
      <Link
        to='/landing'
        className='flex flex-col p-5 w-1/5 place-items-center'>
        <img src={Logo} alt='logo tripia' width='50px' height='50px' />
        <h1 className='text-xl uppercase'>Tripia</h1>
      </Link>

      <div className='flex justify-end place-items-center w-full pr-10 gap-10'>
        <Link to='/explore'>Explore</Link>
        <Link to='/register'>Login / Register</Link>

        <div>
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
      </div>
    </nav>
  );
};
export default Navbar;

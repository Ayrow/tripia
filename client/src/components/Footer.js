import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='relative bg-white dark:bg-gray-800 w-full py-8'>
      <div className='max-w-screen-xl mx-auto px-4'>
        <ul className='max-w-screen-md mx-auto text-lg font-light flex flex-wrap justify-between'>
          <li className='my-2'>
            <Link
              to={'/faq'}
              className='text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200'>
              FAQ
            </Link>
          </li>

          <li className='my-2'>
            <a
              className='text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200'
              href='https://github.com/Ayrow'>
              Github
            </a>
          </li>
          <li className='my-2'>
            <a
              className='text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200'
              href='https://www.linkedin.com/in/aymeric-pilaert-a53b6498/'>
              LinkedIn
            </a>
          </li>
        </ul>

        <div className='text-center text-gray-500 dark:text-gray-200 pt-10 sm:pt-12 font-light flex items-center justify-center'>
          Created by Aymeric
        </div>
      </div>
    </footer>
  );
};
export default Footer;

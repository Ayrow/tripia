import { useState } from 'react';

const ModalMenuMobile = ({ setIsMobileMenuOpen }) => {
  return (
    <div className='absolute w-full h-full overflow-y-visible'>
      <div className='z-10 inset-0 bg-gray-500 bg-opacity-75 '>
        <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center'>
          <div className='inline-block relative overflow-hidden transform transition-all sm:align-middle sm:max-w-lg'>
            <div>
              <div className='rounded-lg p-8 bg-white shadow'>
                <div className='absolute right-4 top-4'>
                  <button
                    className='bg-transparent border border-transparent'
                    onClick={() => setIsMobileMenuOpen(false)}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='currentColor'
                      className='h-6 w-6 text-gray-700'
                      viewBox='0 0 1792 1792'>
                      <path d='M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z'></path>
                    </svg>
                  </button>
                </div>
                <div className='p-4 bg-white'>
                  <div className='text-center mb-4 opacity-90'>
                    <a href='#' className='block relative'>
                      <img
                        alt='profil'
                        src='/images/person/5.jpg'
                        className='mx-auto object-cover rounded-full h-16 w-16 '
                      />
                    </a>
                  </div>
                  <div className='text-center'>
                    <p className='text-2xl text-gray-800 dark:text-white'>
                      Charlie
                    </p>
                    <p className='text-xl text-gray-500 dark:text-gray-200 font-light'>
                      Lead dev
                    </p>
                    <p className='text-md text-gray-500 dark:text-gray-400 max-w-xs py-4 font-light'></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalMenuMobile;

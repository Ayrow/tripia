import { useAppContext } from '../context/app/appContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';

const ConfirmationModal = ({ deleteItem, updateItem, newUserDetails }) => {
  const {
    modalConfirmText,
    modalConfirmTitle,
    closeModalConfirm,
    itemID,
    modalConfirmType,
    needPasswordValidation,
  } = useAppContext();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className='z-20 fixed flex place-items-center justify-center w-full inset-0 h-screen bg-gray-500 bg-opacity-50'>
      <div className='flex shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-800 w-80'>
        <div className='w-full h-full text-center'>
          <div className='flex h-full flex-col justify-between'>
            <svg
              width='40'
              height='40'
              className='mt-4 w-12 h-12 m-auto text-orange-500'
              fill='currentColor'
              viewBox='0 0 1792 1792'
              xmlns='http://www.w3.org/2000/svg'>
              <path d='M704 1376v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm256 0v-704q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v704q0 14 9 23t23 9h64q14 0 23-9t9-23zm-544-992h448l-48-117q-7-9-17-11h-317q-10 2-17 11zm928 32v64q0 14-9 23t-23 9h-96v948q0 83-47 143.5t-113 60.5h-832q-66 0-113-58.5t-47-141.5v-952h-96q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h309l70-167q15-37 54-63t79-26h320q40 0 79 26t54 63l70 167h309q14 0 23 9t9 23z'></path>
            </svg>
            <p className='text-gray-800 dark:text-gray-200 text-2xl font-bold mt-4'>
              {modalConfirmTitle}
            </p>
            <p className='text-gray-600 dark:text-gray-400 text-md py-2 px-6'>
              {modalConfirmText}
            </p>

            {needPasswordValidation && (
              <div className='flex flex-col mt-4 mb-2'>
                <label className='block text-sm font-semibold text-white'>
                  Please Verify Your Password
                </label>
                <div className='flex relative '>
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    onChange={handleChange}
                    value={password}
                    autoComplete='new-password'
                    className=' relative block w-full px-4 py-2 mt-2 text-orange-700 bg-white border rounded-md focus:border-orange-400 focus:ring-orange-300 focus:outline-none focus:ring focus:ring-opacity-40 '
                    name='password'
                  />
                  <div className='absolute inset-y-0 right-0 flex items-center'>
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className=' pr-4 text-black text-xl'>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className='flex items-center justify-between gap-4 w-full mt-8'>
              {modalConfirmType === 'Update' && (
                <button
                  type='button'
                  onClick={() =>
                    updateItem({ itemID, password, newUserDetails })
                  }
                  className='py-2 px-4  bg-orange-600 hover:bg-orange-700 focus:ring-orange-500 focus:ring-offset-orange-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '>
                  Update
                </button>
              )}
              {modalConfirmType === 'Delete' && (
                <button
                  type='button'
                  onClick={() => deleteItem({ itemID, password })}
                  className='py-2 px-4  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-orange-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '>
                  Delete
                </button>
              )}
              <button
                type='button'
                onClick={closeModalConfirm}
                className='py-2 px-4  bg-white hover:bg-gray-100 focus:ring-orange-500 focus:ring-offset-orange-200 text-orange-500  w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg '>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConfirmationModal;

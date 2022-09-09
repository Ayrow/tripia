import { useState } from 'react';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='relative flex flex-col justify-center min-h-screen overflow-hidden'>
      <div className='w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl'>
        <h1 className='text-3xl font-semibold text-center text-purple-700 underline'>
          Register
        </h1>
        <form className='mt-6'>
          <div className='mb-2'>
            <label
              for='username'
              className='block text-sm font-semibold text-gray-800'>
              Username
            </label>
            <input
              type='username'
              className='block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
            />
          </div>
          <div className='mb-2'>
            <label
              for='email'
              className='block text-sm font-semibold text-gray-800'>
              Email
            </label>
            <input
              type='email'
              className='block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40'
            />
          </div>

          <div className='flex flex-col mb-2'>
            <label
              for='password'
              className='block text-sm font-semibold text-gray-800'>
              Password
            </label>
            <div className='flex relative '>
              <input
                required
                type={showPassword ? 'text' : 'password'}
                id='password'
                className='relative block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40 '
                name='password'
              />
              <div className='absolute inset-y-0 right-0 flex items-center'>
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className=' pr-4 text-black'>
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
          </div>

          <div className='flex flex-col mb-2'>
            <label
              for='confirm-password'
              className='block text-sm font-semibold text-gray-800'>
              Confirm Password
            </label>
            <div className='flex relative '>
              <input
                required
                type={showPassword ? 'text' : 'password'}
                id='confirm-password'
                className='relative block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40 '
                name='confirm-password'
              />
              <div className='absolute inset-y-0 right-0 flex items-center'>
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className=' pr-4 text-black'>
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
          </div>

          <a href='#' className='text-xs text-purple-600 hover:underline'>
            Forgot Password?
          </a>
          <div className='mt-6'>
            <button className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600'>
              Register
            </button>
          </div>
        </form>

        <p className='mt-8 text-xs font-light text-center text-gray-700'>
          Don't have an account?
          <a href='#' className='font-medium text-purple-600 hover:underline'>
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};
export default Register;

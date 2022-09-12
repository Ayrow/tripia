import { FaEyeSlash, FaEye } from 'react-icons/fa';

const LoginComponent = ({
  onSubmit,
  handleChange,
  showPassword,
  setShowPassword,
}) => {
  return (
    <form onSubmit={onSubmit} className='mt-6'>
      <div className='mb-2'>
        <label
          for='email'
          className='block text-sm font-semibold text-gray-800'>
          Email
        </label>
        <input
          type='email'
          required
          onChange={handleChange}
          className='block w-full px-4 py-2 mt-2 text-orange-700 bg-white border rounded-md focus:border-orange-400 focus:ring-orange-300 focus:outline-none focus:ring focus:ring-opacity-40'
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
            onChange={handleChange}
            className='relative block w-full px-4 py-2 mt-2 text-orange-700 bg-white border rounded-md focus:border-orange-400 focus:ring-orange-300 focus:outline-none focus:ring focus:ring-opacity-40 '
            name='password'
          />
          <div className='absolute inset-y-0 right-0 flex items-center'>
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              onChange={handleChange}
              className=' pr-4 text-black text-xl'>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
      </div>

      <a href='#' className='text-xs text-orange-600 hover:underline'>
        Forgot Password?
      </a>
      <div className='mt-6'>
        <button className='w-full btn'>Login</button>
      </div>
    </form>
  );
};
export default LoginComponent;

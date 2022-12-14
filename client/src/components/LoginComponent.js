import { FaEyeSlash, FaEye } from 'react-icons/fa';

const LoginComponent = ({
  handleChange,
  showPassword,
  setShowPassword,
  ...values
}) => {
  return (
    <>
      <div className='mb-2'>
        <label className='block text-sm font-semibold text-gray-800'>
          Email
        </label>
        <input
          type='email'
          // required
          name='email'
          value={values.email}
          onChange={handleChange}
          className='block w-full px-4 py-2 mt-2 text-orange-700 bg-white border rounded-md focus:border-orange-400 focus:ring-orange-300 focus:outline-none focus:ring focus:ring-opacity-40'
        />
      </div>

      <div className='flex flex-col mb-2'>
        <label className='block text-sm font-semibold text-gray-800'>
          Password
        </label>
        <div className='flex relative '>
          <input
            // required
            type={showPassword ? 'text' : 'password'}
            id='password'
            onChange={handleChange}
            value={values.password}
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
    </>
  );
};
export default LoginComponent;

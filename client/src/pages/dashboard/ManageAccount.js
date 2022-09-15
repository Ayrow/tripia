import { useState } from 'react';
import { useAppContext } from '../../context/appContext';

const ManageAccount = () => {
  const { user } = useAppContext();

  const initialState = {
    username: user.username,
  };

  const [value, setValue] = useState(initialState);

  const handleChange = (e) => {
    setValue({ [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='flex flex-col flex-wrap place-items-center'>
      <div className='sm:w-2/3 '>
        <h2 className=' text-2xl text-center mb-5'>Account Settings</h2>
        <div>
          <form
            className='flex items-center justify-center bg-white p-3'
            onSubmit={handleSubmit}>
            <div className=' flex flex-row flex-grow w-full'>
              <div className='flex'>
                <label
                  htmlFor='username'
                  className='text-black sm:w-32 text-center'>
                  Username
                </label>
              </div>

              <div className='w-full flex flex-row flex-grow justify-center'>
                <input
                  type='text'
                  name='username'
                  id='username'
                  value={value.username}
                  onChange={handleChange}
                  className='text-black text-center flex lg:w-1/2'
                />
              </div>
            </div>

            <button
              type='button'
              className=' hover:bg-gray-100 text-orange-600 flex sm:w-32 py-2 justify-end sm:justify-center '>
              Edit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ManageAccount;

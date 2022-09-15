import { useState } from 'react';
import { useAppContext } from '../../context/appContext';
import UnknownUser from '../../assets/images/unknown-user.png';

const ManageAccount = () => {
  const { user } = useAppContext();

  const initialState = {
    username: user.username,
    email: user.email,
    password: '*********',
  };

  const [value, setValue] = useState(initialState);

  const handleChange = (e) => {
    setValue({ [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div>
        <div className='md:grid md:grid-cols-3 md:gap-6'>
          <div className='md:col-span-1'>
            <div className='px-4 sm:px-0'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>
                Profile
              </h3>
              <p className='mt-1 text-sm text-gray-600'>
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>
          </div>
          <div className='mt-5 md:col-span-2 md:mt-0'>
            <form>
              <div className='shadow sm:overflow-hidden sm:rounded-md'>
                <div className='space-y-6 bg-white px-4 py-5 sm:p-6'>
                  <div className='grid grid-cols-3 gap-6'>
                    <div className='col-span-3 sm:col-span-2'>
                      <label
                        htmlFor='username'
                        className='block text-sm font-medium text-gray-700'>
                        Username
                      </label>
                      <div className='mt-1 flex rounded-md shadow-sm'>
                        <input
                          type='text'
                          name='username'
                          id='username'
                          className='block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-black'
                          placeholder={user.username}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Profile picture
                    </label>
                    <div className='mt-1 flex items-center'>
                      <span className='inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100'>
                        <img src={UnknownUser} alt='profile-pic' />
                      </span>
                      <input
                        type='file'
                        name=''
                        id=''
                        className='ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor='about'
                      className='block text-sm font-medium text-gray-700'>
                      About
                    </label>
                    <div className='mt-1'>
                      <textarea
                        id='about'
                        name='about'
                        rows={3}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                        placeholder='Tell a bit about yourself'
                        defaultValue={''}
                      />
                    </div>
                    <p className='mt-2 text-sm text-gray-500'>
                      Brief description for your profile. URLs are hyperlinked.
                    </p>
                  </div>
                </div>
                <div className='bg-gray-50 px-4 py-3 text-right sm:px-6'>
                  <button
                    type='submit'
                    onSubmit={handleSubmit}
                    className='inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className='hidden sm:block' aria-hidden='true'>
        <div className='py-5'>
          <div className='border-t border-gray-200' />
        </div>
      </div>

      <div className='mt-10 sm:mt-0'>
        <div className='md:grid md:grid-cols-3 md:gap-6'>
          <div className='md:col-span-1'>
            <div className='px-4 sm:px-0'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>
                Account Settings
              </h3>
              <p className='mt-1 text-sm text-gray-600'>
                Settings related to your account and won't be displayed
                publicly.
              </p>
            </div>
          </div>
          <div className='mt-5 md:col-span-2 md:mt-0'>
            <form action='#' method='POST'>
              <div className='overflow-hidden shadow sm:rounded-md'>
                <div className='bg-white px-4 py-5 sm:p-6'>
                  <div className='grid grid-cols-6 gap-6'>
                    <div className='col-span-6 sm:col-span-4'>
                      <label
                        htmlFor='email-address'
                        className='block text-sm font-medium text-gray-700'>
                        Email address
                      </label>
                      <input
                        type='text'
                        name='email'
                        id='email'
                        autoComplete='off'
                        value={user.email}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                      />
                    </div>

                    <div className='col-span-6 sm:col-span-4'>
                      <label
                        htmlFor='password'
                        className='block text-sm font-medium text-gray-700'>
                        Password
                      </label>
                      <input
                        type='password'
                        name='password'
                        id='password'
                        autoComplete='off'
                        value={value.password}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                      />
                    </div>
                  </div>
                </div>
                <div className='bg-gray-50 px-4 py-3 text-right sm:px-6 flex justify-end gap-2'>
                  <button
                    type='submit'
                    onSubmit={handleSubmit}
                    className='inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
                    Save
                  </button>
                  <button
                    type='submit'
                    className='inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'>
                    Delete Account
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className='hidden sm:block' aria-hidden='true'>
        <div className='py-5'>
          <div className='border-t border-gray-200' />
        </div>
      </div>

      <div className='mt-10 sm:mt-0'>
        <div className='md:grid md:grid-cols-3 md:gap-6'>
          <div className='md:col-span-1'>
            <div className='px-4 sm:px-0'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>
                Notifications
              </h3>
              <p className='mt-1 text-sm text-gray-600'>
                Decide which communications you'd like to receive and how.
              </p>
            </div>
          </div>
          <div className='mt-5 md:col-span-2 md:mt-0'>
            <form action='#' method='POST'>
              <div className='overflow-hidden shadow sm:rounded-md'>
                <div className='space-y-6 bg-white px-4 py-5 sm:p-6'>
                  <fieldset>
                    <legend className='sr-only'>By Email</legend>
                    <div
                      className='text-base font-medium text-gray-900'
                      aria-hidden='true'>
                      By Email
                    </div>
                    <div className='mt-4 space-y-4'>
                      <div className='flex items-start'>
                        <div className='flex h-5 items-center'>
                          <input
                            id='comments'
                            name='comments'
                            type='checkbox'
                            className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                          />
                        </div>
                        <div className='ml-3 text-sm'>
                          <label
                            htmlFor='comments'
                            className='font-medium text-gray-700'>
                            Comments
                          </label>
                          <p className='text-gray-500'>
                            Get notified when someones posts a comment on a
                            posting.
                          </p>
                        </div>
                      </div>
                      <div className='flex items-start'>
                        <div className='flex h-5 items-center'>
                          <input
                            id='candidates'
                            name='candidates'
                            type='checkbox'
                            className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                          />
                        </div>
                        <div className='ml-3 text-sm'>
                          <label
                            htmlFor='candidates'
                            className='font-medium text-gray-700'>
                            Candidates
                          </label>
                          <p className='text-gray-500'>
                            Get notified when a candidate applies for a job.
                          </p>
                        </div>
                      </div>
                      <div className='flex items-start'>
                        <div className='flex h-5 items-center'>
                          <input
                            id='offers'
                            name='offers'
                            type='checkbox'
                            className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                          />
                        </div>
                        <div className='ml-3 text-sm'>
                          <label
                            htmlFor='offers'
                            className='font-medium text-gray-700'>
                            Offers
                          </label>
                          <p className='text-gray-500'>
                            Get notified when a candidate accepts or rejects an
                            offer.
                          </p>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset>
                    <legend className='contents text-base font-medium text-gray-900'>
                      Push Notifications
                    </legend>
                    <p className='text-sm text-gray-500'>
                      These are delivered via SMS to your mobile phone.
                    </p>
                    <div className='mt-4 space-y-4'>
                      <div className='flex items-center'>
                        <input
                          id='push-everything'
                          name='push-notifications'
                          type='radio'
                          className='h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500'
                        />
                        <label
                          htmlFor='push-everything'
                          className='ml-3 block text-sm font-medium text-gray-700'>
                          Everything
                        </label>
                      </div>
                      <div className='flex items-center'>
                        <input
                          id='push-email'
                          name='push-notifications'
                          type='radio'
                          className='h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500'
                        />
                        <label
                          htmlFor='push-email'
                          className='ml-3 block text-sm font-medium text-gray-700'>
                          Same as email
                        </label>
                      </div>
                      <div className='flex items-center'>
                        <input
                          id='push-nothing'
                          name='push-notifications'
                          type='radio'
                          className='h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500'
                        />
                        <label
                          htmlFor='push-nothing'
                          className='ml-3 block text-sm font-medium text-gray-700'>
                          No push notifications
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
                <div className='bg-gray-50 px-4 py-3 text-right sm:px-6'>
                  <button
                    type='submit'
                    onSubmit={handleSubmit}
                    className='inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default ManageAccount;

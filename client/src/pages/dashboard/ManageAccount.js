import { useState } from 'react';
import Alert from '../../components/Alert';
import { useAppContext } from '../../context/app/appContext';
import ConfirmationModal from '../../components/ConfirmationModal';
import UnknownUser from '../../assets/images/unknown-user.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useUserContext } from '../../context/user/userContext';

const ManageAccount = () => {
  const { openModalConfirm, isConfirmationModalOpen, showAlert, displayAlert } =
    useAppContext();

  const { user, deleteUser, updateUser } = useUserContext();

  const initialState = {
    username: user?.username,
    email: user?.email,
    password: '',
    about: user?.about || '',
  };

  const [value, setValue] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const saveProfile = (e) => {
    e.preventDefault();
    const { username, about } = value;
    const newUserDetails = { username, about, email: user.email };
    updateUser({ newUserDetails });
    setValue(newUserDetails);
  };

  const saveSettings = (e) => {
    const { email, password } = value;
    e.preventDefault();
    // missing new email or new password so display alert
    if (!email || (user.email === email && !password)) {
      displayAlert({
        type: 'danger',
        msg: 'Please update password or email before saving',
      });
      return;
    }
    //email is empty, email not changed and new password given so update password
    else if (!email || (user.email === email && password)) {
      openModalConfirm({
        id: user.email,
        text: 'Are you sure you want to change your password?',
        title: 'Update Password',
        editType: 'Update',
        passwordValidation: true,
      });
    }
    // new password is missing and new email given so update email
    else if (!password && user.email !== email && !email) {
      //Will then update password only
      openModalConfirm({
        id: user.email,
        text: 'Are you sure you want to update your email address?',
        title: 'Update email address',
        editType: 'Update',
        passwordValidation: true,
      });
    }
    // update both email address and password
    else {
      openModalConfirm({
        id: user.email,
        text: 'Are you sure you want to update your email address and password?',
        title: 'Update account',
        editType: 'Update',
        passwordValidation: true,
      });
    }
    setValue(initialState);
  };

  return (
    <div className='relative'>
      {isConfirmationModalOpen && (
        <ConfirmationModal
          deleteItem={deleteUser}
          updateItem={updateUser}
          itemID={user.email}
          newUserDetails={value}
        />
      )}
      {showAlert && <Alert />}
      <div className='p-7'>
        <div>
          <div className='md:grid md:grid-cols-3 md:gap-6'>
            <div className='md:col-span-1'>
              <div className='px-4 sm:px-0'>
                <h3 className='text-lg font-medium leading-6 '>Profile</h3>
                <p className='mt-1 text-sm '>
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
                        <div className='mt-1 flex rounded-md shadow-sm '>
                          <input
                            type='text'
                            name='username'
                            id='username'
                            value={value.username}
                            onChange={handleChange}
                            className='relative block w-full px-4 py-2 mt-2 text-orange-700 bg-white border rounded-md focus:border-orange-400 focus:ring-orange-300 focus:outline-none focus:ring focus:ring-opacity-40'
                            placeholder={value.username}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700'>
                        Profile picture
                      </label>
                      <div className='mt-1 flex flex-col sm:flex-row items-start sm:items-center'>
                        <span className='inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100'>
                          <img src={UnknownUser} alt='profile-pic' />
                        </span>
                        <input
                          type='file'
                          name=''
                          id=''
                          className='sm:ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-black shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
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
                          className='relative block w-full px-4 py-2 mt-2 text-gray-800 bg-white border rounded-md focus:border-orange-400 focus:ring-orange-300 focus:outline-none focus:ring focus:ring-opacity-40'
                          placeholder='Tell a bit about yourself'
                          value={value.about}
                          onChange={handleChange}
                        />
                      </div>
                      <p className='mt-2 text-sm text-gray-500'>
                        Brief description for your profile. URLs are
                        hyperlinked.
                      </p>
                    </div>
                  </div>
                  <div className='bg-gray-50 px-4 py-3 text-right sm:px-6'>
                    <button
                      type='submit'
                      onClick={saveProfile}
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
                <h3 className='text-lg font-medium leading-6 '>
                  Account Settings
                </h3>
                <p className='mt-1 text-sm'>
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
                          value={value.email}
                          onChange={handleChange}
                          className='relative block w-full px-4 py-2 mt-2 text-orange-700 bg-white border rounded-md focus:border-orange-400 focus:ring-orange-300 focus:outline-none focus:ring focus:ring-opacity-40'
                        />
                      </div>

                      <div className='col-span-6 sm:col-span-4'>
                        <label
                          htmlFor='password'
                          className='block text-sm font-medium text-gray-700'>
                          New Password
                        </label>
                        <div className='flex relative '>
                          <input
                            required
                            type={showPassword ? 'text' : 'password'}
                            id='password'
                            autoComplete='new-password'
                            onChange={handleChange}
                            value={value.password}
                            className='relative block w-full px-4 py-2 mt-2 text-orange-700 bg-white border rounded-md focus:border-orange-400 focus:ring-orange-300 focus:outline-none focus:ring focus:ring-opacity-40'
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
                      <div className='col-span-6 sm:col-span-4'>
                        <label
                          htmlFor='delete-account'
                          className='block text-sm font-medium text-gray-700'>
                          Delete my account and all my data
                        </label>
                        <button
                          type='button'
                          onClick={() =>
                            openModalConfirm({
                              id: user.email,
                              text: 'Are you sure you want to delete your account and trips?',
                              title: 'Delete acccount',
                              editType: 'Delete',
                              passwordValidation: true,
                            })
                          }
                          className=' mt-1 block justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className='bg-gray-50 px-4 py-3 text-right sm:px-6 flex justify-end gap-2'>
                    <button
                      type='submit'
                      onClick={saveSettings}
                      className='inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* 
        <div className='hidden sm:block' aria-hidden='true'>
          <div className='py-5'>
            <div className='border-t border-gray-200' />
          </div>
        </div>

        <div className='mt-10 sm:mt-0'>
          <div className='md:grid md:grid-cols-3 md:gap-6'>
            <div className='md:col-span-1'>
              <div className='px-4 sm:px-0'>
                <h3 className='text-lg font-medium leading-6 '>
                  Notifications
                </h3>
                <p className='mt-1 text-sm '>
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
                              Get notified when a candidate accepts or rejects
                              an offer.
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
                      onClick={() => {}}
                      className='inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>*/}
      </div>
    </div>
  );
};
export default ManageAccount;

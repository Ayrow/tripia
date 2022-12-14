import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import LoginComponent from '../components/LoginComponent';
import RegisterComponent from '../components/RegisterComponent';
import { useAppContext } from '../context/app/appContext';
import { useTripContext } from '../context/trip/tripContext';
import { useUserContext } from '../context/user/userContext';

const initialState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  isMember: true,
};

const RegisterForm = () => {
  const navigate = useNavigate();
  const { isLoading, displayAlert, showAlert, setLoading } = useAppContext();
  const { user, setupUser } = useUserContext();
  const { getAllSavedTrips } = useTripContext();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [values, setValues] = useState(initialState);

  const toggleMember = () => {
    setValues({ initialState, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, username, password, confirmPassword, isMember } = values;

    if (
      !email ||
      !password ||
      (!isMember && !username) ||
      (!isMember && !confirmPassword)
    ) {
      displayAlert({ type: 'danger', msg: 'Please provide all values' });
      return;
    }

    if (!isMember && password !== confirmPassword) {
      displayAlert({ type: 'danger', msg: `The passwords don't match` });
      return;
    }

    const currentUser = { username, email, password };
    if (isMember) {
      setupUser({
        currentUser,
        endPoint: 'login',
        alertText: 'Login successful! Redirecting...',
        alertType: 'success',
      });
    } else {
      setupUser({
        currentUser,
        endPoint: 'register',
        alertText: 'Register successful! Redirecting...',
        alertType: 'success',
      });
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/explore');
      }, 3000);
      getAllSavedTrips();
    }
  }, [user, navigate]);

  return (
    <div className='relative flex flex-col items-center justify-center min-h-screen overflow-hidden mx-5'>
      <div className='w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl'>
        <h1 className='text-3xl font-semibold text-center text-orange-700'>
          {values.isMember ? 'Login' : 'Register'}
        </h1>
        {showAlert && <Alert />}
        <form onSubmit={onSubmit} className='mt-6'>
          {values.isMember ? (
            <LoginComponent
              onSubmit={onSubmit}
              handleChange={handleChange}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              values={values}
              isLoading={isLoading}
            />
          ) : (
            <RegisterComponent
              onSubmit={onSubmit}
              handleChange={handleChange}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              showConfirmPassword={showConfirmPassword}
              setShowConfirmPassword={setShowConfirmPassword}
              values={values}
              isLoading={isLoading}
            />
          )}
          {/* 
          <a href='#' className='text-xs text-orange-600 hover:underline'>
            Forgot Password?
          </a>*/}
          <div className='mt-6'>
            <button
              type='submit'
              className='w-full btn bg-orange-700'
              disabled={isLoading}>
              Submit
            </button>
          </div>
        </form>

        <p className='mt-8 text-md font-light text-center text-gray-700 '>
          {values.isMember ? `Don't have an account? ` : 'Already registered? '}

          <button
            type='button'
            onClick={toggleMember}
            className='font-medium text-orange-600 hover:underline text-lg'>
            {values.isMember ? 'Sign up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};
export default RegisterForm;

import { useState } from 'react';
import LoginComponent from '../components/LoginComponent';
import RegisterComponent from '../components/RegisterComponent';

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  isMember: true,
};

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [values, setValues] = useState(initialState);

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {};

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='relative flex flex-col justify-center min-h-screen overflow-hidden mx-5'>
      <div className='w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl'>
        <h1 className='text-3xl font-semibold text-center text-orange-700'>
          {values.isMember ? 'Login' : 'Register'}
        </h1>

        {values.isMember ? (
          <LoginComponent
            onSubmit={onSubmit}
            handleChange={handleChange}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        ) : (
          <RegisterComponent
            onSubmit={onSubmit}
            handleChange={handleChange}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
          />
        )}

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

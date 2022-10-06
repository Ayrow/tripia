import { createContext, useContext, useReducer } from 'react';
import reducer from './userReducer';
import {
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  DELETE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
} from '../actions';
import { useAppContext } from '../app/appContext';

import axios from 'axios';
import { useTripContext } from '../trip/tripContext';

const UserContext = createContext();

const user = localStorage.getItem('user');
const token = localStorage.getItem('token');

const initialUserState = {
  user: user ? JSON.parse(user) : null,
  token: token,
  savedTripsID: [],
};

const UserProvider = ({ children }) => {
  const { displayAlert, clearAlert, closeModalConfirm, setLoading } =
    useAppContext();
  const [state, dispatch] = useReducer(reducer, initialUserState);

  //axios
  const authFetch = axios.create({
    baseURL: '/api/v1',
  });

  // request
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // response
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        // logoutUser();
        console.log(error);
      }
      return Promise.reject(error);
    }
  );

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    setLoading(true);
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await authFetch.post(`/auth/${endPoint}`, currentUser);

      const { user, token } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: {
          user,
          token,
          savedTrips: user.saved,
        },
      });
      addUserToLocalStorage({ user, token });
      displayAlert({ type: 'success', msg: alertText });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
      });
      displayAlert({ type: 'danger', msg: error.response.data.msg });
    }
    setLoading(false);
    clearAlert();
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const verifyAccount = async (currentUser) => {
    try {
      const { data } = await authFetch.post(`/auth/login`, currentUser);
      return data;
    } catch (error) {
      displayAlert({ type: 'danger', msg: error.response.data.msg });
      return;
    }
  };

  const deleteUser = async ({ itemID: email, password }) => {
    dispatch({ type: DELETE_USER_BEGIN });
    setLoading(true);
    const currentUser = { email, password };
    try {
      const { verified } = await verifyAccount(currentUser);
      await authFetch.delete('/auth/deleteUser');
    } catch (error) {
      displayAlert({ type: 'danger', msg: error.response.data.msg });
    }
    setLoading(false);
    closeModalConfirm();
    removeUserFromLocalStorage();
    logoutUser();
  };

  const updateUser = async ({ itemID: email, password, newUserDetails }) => {
    // dispatch({ type: DELETE_USER_BEGIN });
    setLoading(true);
    try {
      const currentUser = { email, password };
      if (password) {
        const { verified } = await verifyAccount(currentUser);
      }
      const { data } = await authFetch.patch(
        '/auth/updateUser',
        newUserDetails
      );
      const { user, token } = data;
      dispatch({ type: UPDATE_USER_SUCCESS, payload: { user, token } });
      addUserToLocalStorage({ user, token });
      closeModalConfirm();
      displayAlert({ type: 'success', msg: 'Account updated successfully' });
    } catch (error) {
      closeModalConfirm();
      displayAlert({ type: 'danger', msg: error.response.data.msg });
    }
    setLoading(false);
    clearAlert();
  };

  return (
    <UserContext.Provider
      value={{ ...state, setupUser, deleteUser, updateUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { useUserContext, UserProvider };

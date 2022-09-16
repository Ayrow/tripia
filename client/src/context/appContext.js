import { createContext, useContext, useReducer } from 'react';
import reducer from './reducer';
import axios from 'axios';

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  HANDLE_CHANGE,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
} from './actions';

const user = localStorage.getItem('user');
const token = localStorage.getItem('token');

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  isEditing: false,
  destination: '',
  nbTravelers: {
    adults: 1,
    children: 0,
  },
  likes: 0,
  duration: 7,
  theme: '',
  themeOptions: [
    'Art, history, cultural',
    'Romance / honeymoon',
    'Safari, natural parks',
    'Adventure and trekking',
    'Sea and beaches',
    'Moutain, lakes and rivers',
    'Religious and spiritual places',
    'Unusual trips',
    'Luxury and charme',
    'Family',
    'Wellness',
  ],
  cost: 0,
  activities: '',
  advices: '',
  trips: [],
  totalTrips: 0,
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //axios
  const authFetch = axios.create({
    baseURL: '/api/v1',
  });

  const displayAlert = ({ type, msg }) => {
    dispatch({ type: DISPLAY_ALERT, payload: { type, msg } });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await authFetch.post(`/auth/${endPoint}`, currentUser);
      const { user, token } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: {
          user,
          token,
        },
      });
      addUserToLocalStorage({ user, token });
      displayAlert({ type: 'success', msg: alertText });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
      });
      console.log(error);
      displayAlert({ type: 'danger', msg: error.response.data.msg });
    }
    clearAlert();
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  return (
    <AppContext.Provider
      value={{ ...state, setupUser, displayAlert, logoutUser, handleChange }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { useAppContext, AppProvider, initialState };

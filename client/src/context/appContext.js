import { createContext, useContext, useReducer } from 'react';
import reducer from './reducer';
import axios from 'axios';

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  OPEN_MODAL_CONFIRM,
  CLOSE_MODAL_CONFIRM,
  HANDLE_CHANGE,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  CREATE_TRIP_BEGIN,
  CREATE_TRIP_SUCCESS,
  CREATE_TRIP_ERROR,
  GET_TRIPS_BEGIN,
  GET_USER_TRIPS_SUCCESS,
  GET_ALL_TRIPS_SUCCESS,
  GET_TRIPS_ERROR,
  GET_SINGLE_TRIP_SUCCESS,
  CLEAR_TRIP_FORM,
  DELETE_TRIP_BEGIN,
  DELETE_USER_BEGIN,
} from './actions';

const user = localStorage.getItem('user');
const token = localStorage.getItem('token');

const initialState = {
  isLoading: false,
  showAlert: false,
  isConfirmationModalOpen: '',
  modalConfirmText: '',
  modalConfirmTitle: '',
  modalConfirmType: '',
  needPasswordValidation: false,
  alertText: '',
  alertType: '',
  editType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  isEditing: false,
  itemID: null,
  destination: '',
  nbAdults: 1,
  nbChildren: 0,
  nbTravelers: {
    adults: 1,
    children: 0,
  },
  likes: 0,
  duration: 7,
  theme: '',
  themeOptions: [
    'History and Cultural',
    'Romance and Honeymoon',
    'Safari, Natural parks',
    'Adventure and Trekking',
    'Sea and Beaches',
    'Mountains',
    'Safari and Natural Parks',
    'Religious and Spiritual Places',
    'Unusual trips',
    'Luxury and Charme',
    'Family',
    'Wellness',
  ],
  cost: 0,
  TravelExpenses: '',
  accomodationExpenses: '',
  leisureExpenses: '',
  activities: '',
  singleTrip: {},
  advices: '',
  allTrips: [],
  userTrips: [],
  savedTrips: [],
  totalUserTrips: 0,
  totalTrips: 0,
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 4000);
  };

  const displayAlert = ({ type, msg }) => {
    dispatch({ type: DISPLAY_ALERT, payload: { type, msg } });
    clearAlert();
  };

  const openModalConfirm = ({
    id,
    text,
    title,
    editType,
    passwordValidation,
  }) => {
    dispatch({
      type: OPEN_MODAL_CONFIRM,
      payload: { id, text, title, editType, passwordValidation },
    });
    console.log(passwordValidation);
  };

  const closeModalConfirm = () => {
    dispatch({ type: CLOSE_MODAL_CONFIRM });
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
      displayAlert({ type: 'danger', msg: error.response.data.msg });
    }
    clearAlert();
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const createTrip = async () => {
    dispatch({ type: CREATE_TRIP_BEGIN });
    try {
      const {
        theme,
        destination,
        nbTravelers,
        duration,
        cost,
        activities,
        advices,
      } = state;

      nbTravelers.adults = state.nbAdults;
      nbTravelers.children = state.nbChildren;

      await authFetch.post('/trips/usertrips', {
        theme,
        destination,
        nbTravelers,
        duration,
        cost,
        activities,
        advices,
      });
      dispatch({ type: CREATE_TRIP_SUCCESS });
      displayAlert({
        type: 'success',
        msg: 'Trip created successfully !',
      });
    } catch (error) {
      dispatch({
        type: CREATE_TRIP_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
    clearTripForm();
    getUserTrips();
  };

  const clearTripForm = () => {
    dispatch({ type: CLEAR_TRIP_FORM });
  };

  const getAllTrips = async () => {
    let url = `/trips`;
    dispatch({ type: GET_TRIPS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { everyTrips } = data;
      dispatch({ type: GET_ALL_TRIPS_SUCCESS, payload: everyTrips });
    } catch (error) {
      dispatch({
        type: GET_TRIPS_ERROR,
        payload: { msg: error },
      });
    }
    clearAlert();
  };

  const getUserTrips = async () => {
    let url = `/trips/usertrips`;
    dispatch({ type: GET_TRIPS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { trips } = data;
      dispatch({ type: GET_USER_TRIPS_SUCCESS, payload: trips });
    } catch (error) {
      dispatch({
        type: GET_TRIPS_ERROR,
        payload: { msg: error.response.data.msg },
      });
      logoutUser();
    }
    clearAlert();
  };

  const getSingleTrip = async (id) => {
    let url = `/trips/${id}`;
    dispatch({ type: GET_TRIPS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { trip } = data;
      dispatch({ type: GET_SINGLE_TRIP_SUCCESS, payload: trip });
    } catch (error) {
      logoutUser();
    }
  };

  const deleteTrip = async ({ itemID }) => {
    dispatch({ type: DELETE_TRIP_BEGIN });
    try {
      await authFetch.delete(`/trips/usertrips/${itemID}`);
      getUserTrips();
    } catch (error) {
      console.log(error);
      // logoutUser();
    }
  };

  const verifyAccount = async (currentUser) => {
    try {
      const { data } = await authFetch.post(`/auth/login`, currentUser);
      return data;
    } catch (error) {
      console.log('error verifying account');
      return;
    }
  };

  const deleteUser = async ({ itemID: email, password }) => {
    dispatch({ type: DELETE_USER_BEGIN });
    const currentUser = { email, password };
    try {
      const { verified } = await verifyAccount(currentUser);
      await authFetch.delete('/auth/deleteUser');
    } catch (error) {
      alert('cannot delete user');
    }
    closeModalConfirm();
    removeUserFromLocalStorage();
    logoutUser();
  };

  const updateUser = async () => {};

  return (
    <AppContext.Provider
      value={{
        ...state,
        setupUser,
        displayAlert,
        logoutUser,
        handleChange,
        createTrip,
        getUserTrips,
        getAllTrips,
        clearTripForm,
        getSingleTrip,
        deleteTrip,
        openModalConfirm,
        closeModalConfirm,
        deleteUser,
        updateUser,
      }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { useAppContext, AppProvider, initialState };

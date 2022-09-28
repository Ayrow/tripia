import { createContext, useContext, useReducer } from 'react';
import reducer from './reducer';
import {
  CREATE_TRIP_BEGIN,
  CREATE_TRIP_SUCCESS,
  CREATE_TRIP_ERROR,
  GET_TRIPS_BEGIN,
  GET_USER_TRIPS_SUCCESS,
  GET_ALL_TRIPS_SUCCESS,
  GET_TRIPS_ERROR,
  EDIT_TRIP_BEGIN,
  EDIT_TRIP_SUCCESS,
  EDIT_TRIP_ERROR,
  GET_SINGLE_TRIP_SUCCESS,
  CLEAR_TRIP_FORM,
  DELETE_TRIP_BEGIN,
  CANCEL_TRIP_EDITION,
  HANDLE_CHANGE,
} from './actions';
import { useAppContext } from './appContext';
import { useUserContext } from './userContext';
import axios from 'axios';

const initialTripState = {
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
  theme: 'History and Cultural',
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
  costDetails: {
    travel: {
      travelDetail: '',
      travelCost: 0,
    },
    accomodation: {
      accomodationDetail: '',
      accomodationCost: 0,
    },
    leisure: {
      leisureDetail: '',
      leisureCost: 0,
    },
  },
  travelDetail: '',
  travelCost: 0,
  accomodationDetail: '',
  accomodationCost: 0,
  leisureDetail: '',
  leisureCost: 0,
  allTrips: [],
  userTrips: [],
  savedTrips: [],
  totalUserTrips: 0,
  totalTrips: 0,
};

const TripContext = createContext();

const TripProvider = ({ children }) => {
  const { displayAlert, clearAlert, closeModalConfirm } = useAppContext();
  const { logoutUser, token } = useUserContext();
  const [state, dispatch] = useReducer(reducer, initialTripState);

  //axios
  const authFetch = axios.create({
    baseURL: '/api/v1',
  });

  // request
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${token}`;
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

  const handleChange = ({ name, value }) => {
    console.log({ name, value });
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
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
        costDetails,
      } = state;

      nbTravelers.adults = state.nbAdults;
      nbTravelers.children = state.nbChildren;
      costDetails.travel.travelDetail = state.travelDetail;
      costDetails.travel.travelCost = state.travelCost;
      costDetails.accomodation.accomodationDetail = state.accomodationDetail;
      costDetails.accomodation.accomodationCost = state.accomodationCost;
      costDetails.leisure.leisureDetail = state.leisureDetail;
      costDetails.leisure.leisureCost = state.leisureCost;

      await authFetch.post('/trips/usertrips', {
        theme,
        destination,
        nbTravelers,
        duration,
        cost,
        activities,
        advices,
        costDetails,
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
      // logoutUser();
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
      closeModalConfirm();
      displayAlert({
        type: 'success',
        msg: 'The trip has been successfully deleted!',
      });
    } catch (error) {
      displayAlert({ type: 'danger', msg: error.response.data.msg });
      // logoutUser();
    }
  };

  const editUserTrip = (id) => {
    dispatch({ type: EDIT_TRIP_BEGIN, payload: id });
  };

  const updateTrip = async () => {
    console.log('destination', state.destination);
  };

  const cancelTripEdition = () => {
    dispatch({ type: CANCEL_TRIP_EDITION });
  };

  return (
    <TripContext.Provider
      value={{
        ...state,
        createTrip,
        getUserTrips,
        getAllTrips,
        clearTripForm,
        getSingleTrip,
        deleteTrip,
        editUserTrip,
        updateTrip,
        cancelTripEdition,
        authFetch,
        handleChange,
      }}>
      {children}
    </TripContext.Provider>
  );
};

const useTripContext = () => {
  return useContext(TripContext);
};

export { TripProvider, useTripContext };

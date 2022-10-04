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
  UPDATE_TRIP_BEGIN,
  GET_SINGLE_TRIP_SUCCESS,
  CLEAR_TRIP_FORM,
  DELETE_TRIP_BEGIN,
  CANCEL_TRIP_EDITION,
  HANDLE_CHANGE,
  RESET_SINGLE_TRIP,
  HANDLE_TRIP_CHANGE,
  GET_SAVED_TRIP_SUCCESS,
  TOGGLE_SAVE_BUTTON,
  SAVE_TRIP_SUCCESS,
} from './actions';
import { useAppContext } from './appContext';
import { useUserContext } from './userContext';
import axios from 'axios';

const initialTripState = {
  isEditing: false,
  itemID: null,
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
  allTrips: [],
  userTrips: [],
  fetchedSingleTrip: {},
  singleTrip: {
    destination: '',
    likes: 0,
    duration: 0,
    theme: '',
    cost: 0,
    advices: '',
    activities: '',
    nbTravelers: {
      adults: 1,
      children: 0,
    },
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
  },
  savedTripsID: [],
  savedTrips: [],
  totalUserTrips: null,
  totalTrips: null,
  liked: false,
  textColor: '',
  textContent: '',
  search: '',
  priceRange: [],
};

const TripContext = createContext();

const TripProvider = ({ children }) => {
  const { displayAlert, clearAlert, closeModalConfirm } = useAppContext();
  const { logoutUser, token, user } = useUserContext();
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
        logoutUser();
        console.log(error);
      }
      return Promise.reject(error);
    }
  );

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const handleTripChange = ({ name, value }) => {
    dispatch({ type: HANDLE_TRIP_CHANGE, payload: { name, value } });
  };

  const createTrip = async () => {
    dispatch({ type: CREATE_TRIP_BEGIN });
    try {
      const { singleTrip } = state;
      const { data } = await authFetch.post('/trips/usertrips', {
        singleTrip,
      });

      const { trip } = data;

      dispatch({ type: CREATE_TRIP_SUCCESS, payload: trip });
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

  const checkIfTripSaved = (id) => {
    const isSaved = state.savedTripsID.includes(id);
    if (isSaved) {
      dispatch({
        type: TOGGLE_SAVE_BUTTON,
        payload: { color: 'text-red-700', text: 'Unsave' },
      });
    } else {
      dispatch({
        type: TOGGLE_SAVE_BUTTON,
        payload: { color: '', text: 'Save' },
      });
    }
  };

  const getSingleTrip = async (id) => {
    let url = `/trips/${id}`;
    dispatch({ type: GET_TRIPS_BEGIN });

    try {
      const { data } = await authFetch(url);
      const { trip } = data;

      if (state.itemID !== id) {
        cancelTripEdition();
      }
      dispatch({
        type: GET_SINGLE_TRIP_SUCCESS,
        payload: { trip, id },
      });
      // Check if trip is saved and display data
      checkIfTripSaved(id);
    } catch (error) {
      console.log(error);
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
    dispatch({
      type: EDIT_TRIP_BEGIN,
      payload: { id: id, singleTrip: state.singleTrip },
    });
  };

  const checkForEmptyValues = () => {
    const { singleTrip, fetchedSingleTrip } = state;

    if (!singleTrip.destination) {
      singleTrip.destination = fetchedSingleTrip.destination;
    }
    if (!singleTrip.duration || singleTrip.duration === 0) {
      singleTrip.duration = fetchedSingleTrip.duration;
    }

    if (!singleTrip.cost) {
      singleTrip.cost = fetchedSingleTrip.cost;
    }

    if (!singleTrip.nbTravelers.adults) {
      singleTrip.nbTravelers.adults = fetchedSingleTrip.nbTravelers.adults;
    }

    if (!singleTrip.nbTravelers.adults) {
      singleTrip.nbTravelers.children = fetchedSingleTrip.nbTravelers.children;
    }

    if (!singleTrip.costDetails.travel.travelCost) {
      singleTrip.costDetails.travel.travelCost =
        fetchedSingleTrip.costDetails.travel.travelCost;
    }

    if (!singleTrip.costDetails.leisure.leisureCost) {
      singleTrip.costDetails.leisure.leisureCost =
        fetchedSingleTrip.costDetails.leisure.leisureCost;
    }

    if (!singleTrip.costDetails.accomodation.accomodationCost) {
      singleTrip.costDetails.accomodation.accomodationCost =
        fetchedSingleTrip.costDetails.accomodation.accomodationCost;
    }
  };

  const updateTrip = async () => {
    const { itemID, singleTrip } = state;
    checkForEmptyValues();
    try {
      await authFetch.patch(`/trips/usertrips/${itemID}`, singleTrip);
      dispatch({ type: EDIT_TRIP_SUCCESS, payload: singleTrip });
    } catch (error) {
      console.log(error);
    }
  };

  // const stopEditing = () => {
  //   dispatch({ type: CANCEL_TRIP_EDITION });
  // };

  const cancelTripEdition = (id) => {
    if (id) {
      getSingleTrip(id);
    }
    dispatch({ type: CANCEL_TRIP_EDITION });
  };

  const saveTrip = async (id) => {
    try {
      const { data } = await authFetch.post('/trips/usertrips/saved', { id });
      const { user } = data;
      dispatch({
        type: SAVE_TRIP_SUCCESS,
        payload: { user: user, savedTripsID: user.saved },
      });
      dispatch({
        type: TOGGLE_SAVE_BUTTON,
        payload: { color: 'text-red-700', text: 'Unsave' },
      });
      getAllSavedTrips();
    } catch (error) {
      console.log('error', error);
    }
  };

  const getAllSavedTrips = async () => {
    try {
      const { data } = await authFetch('/trips/usertrips/saved');
      const { trips, user } = data;
      dispatch({
        type: GET_SAVED_TRIP_SUCCESS,
        payload: { trips, savedTripsID: user.saved },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeSavedTrip = async ({ itemID }) => {
    try {
      const { data } = await authFetch.delete(
        `/trips/usertrips/saved/${itemID}`
      );
      const { user } = data;
      console.log('user', user.saved);
      closeModalConfirm();
      getAllSavedTrips();
      dispatch({
        type: SAVE_TRIP_SUCCESS,
        payload: { user: user, savedTripsID: user.saved },
      });
      dispatch({
        type: TOGGLE_SAVE_BUTTON,
        payload: { color: '', text: 'Save' },
      });
    } catch (error) {
      console.log('error', error);
    }
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
        handleTripChange,
        // stopEditing,
        saveTrip,
        removeSavedTrip,
        checkIfTripSaved,
        getAllSavedTrips,
      }}>
      {children}
    </TripContext.Provider>
  );
};

const useTripContext = () => {
  return useContext(TripContext);
};

export { TripProvider, useTripContext, initialTripState };

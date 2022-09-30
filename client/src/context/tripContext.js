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
} from './actions';
import { useAppContext } from './appContext';
import { useUserContext } from './userContext';
import axios from 'axios';

const initialTripState = {
  isEditing: false,
  itemID: null,
  destination: '',
  nbAdults: '',
  nbChildren: '',
  nbTravelers: {
    adults: 1,
    children: 0,
  },
  likes: '',
  duration: 0,
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
  travelCost: '',
  accomodationDetail: '',
  accomodationCost: '',
  leisureDetail: '',
  leisureCost: '',
  allTrips: [],
  userTrips: [],
  savedTrips: [],
  totalUserTrips: null,
  totalTrips: null,
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

      nbTravelers.adults = state.nbAdults || 1;
      nbTravelers.children = state.nbChildren || 0;
      costDetails.travel.travelDetail = state.travelDetail;
      costDetails.travel.travelCost = state.travelCost || 0;
      costDetails.accomodation.accomodationDetail = state.accomodationDetail;
      costDetails.accomodation.accomodationCost = state.accomodationCost || 0;
      costDetails.leisure.leisureDetail = state.leisureDetail;
      costDetails.leisure.leisureCost = state.leisureCost || 0;

      const { data } = await authFetch.post('/trips/usertrips', {
        theme,
        destination,
        nbTravelers,
        duration,
        cost,
        activities,
        advices,
        costDetails,
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

  const getSingleTrip = async (id) => {
    let url = `/trips/${id}`;
    dispatch({ type: GET_TRIPS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { trip } = data;
      dispatch({
        type: GET_SINGLE_TRIP_SUCCESS,
        payload: trip,
      });
    } catch (error) {
      // logoutUser();
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

  // const resetSingleTrip = () => {
  //   dispatch({ type: RESET_SINGLE_TRIP });
  // };

  const editUserTrip = async (id) => {
    if (state.singleTrip._id !== id) {
      await getSingleTrip(id);
    }
    console.log('trip to edit', id);
    dispatch({
      type: EDIT_TRIP_BEGIN,
      payload: { id: id, singleTrip: state.singleTrip },
    });
  };

  const pushToSingleTrip = () => {
    const {
      singleTrip,
      nbAdults,
      nbChildren,
      theme,
      itemID,
      destination,
      nbTravelers,
      duration,
      cost,
      activities,
      advices,
      costDetails,
    } = state;

    if (theme) {
      singleTrip.theme = theme;
    }
    if (duration || duration !== 0) {
      singleTrip.duration = duration;
    }
    if (destination) {
      singleTrip.destination = destination;
    }

    if (cost) {
      singleTrip.cost = cost;
    }
    if (advices) {
      singleTrip.advices = advices;
    }
    if (activities) {
      singleTrip.activities = activities;
    }

    if (nbAdults) {
      singleTrip.nbTravelers.adults = nbAdults;
    }

    if (nbChildren) {
      singleTrip.nbTravelers.children = nbChildren;
    }

    if (costDetails.travel.travelDetail) {
      singleTrip.costDetails.travel.travelDetail =
        costDetails.travel.travelDetail;
    }

    if (costDetails.travel.travelCost) {
      singleTrip.costDetails.travel.travelCost = costDetails.travel.travelCost;
    }

    if (costDetails.leisure.leisureDetail) {
      singleTrip.costDetails.leisure.leisureDetail =
        costDetails.leisure.leisureDetail;
    }

    if (costDetails.leisure.leisureCost) {
      singleTrip.costDetails.leisure.leisureCost =
        costDetails.leisure.leisureCost;
    }

    if (costDetails.accomodation.accomodationDetail) {
      singleTrip.costDetails.accomodation.accomodationDetail =
        costDetails.accomodation.accomodationDetail;
    }

    if (costDetails.accomodation.accomodationCost) {
      singleTrip.costDetails.accomodation.accomodationCost =
        costDetails.accomodation.accomodationCost;
    }
  };

  const updateTrip = async (singleTrip) => {
    const { itemID, nbTravelers, costDetails } = state;

    nbTravelers.adults = state.nbAdults;
    nbTravelers.children = state.nbChildren;
    costDetails.travel.travelDetail = state.travelDetail;
    costDetails.travel.travelCost = state.travelCost;
    costDetails.accomodation.accomodationDetail = state.accomodationDetail;
    costDetails.accomodation.accomodationCost = state.accomodationCost;
    costDetails.leisure.leisureDetail = state.leisureDetail;
    costDetails.leisure.leisureCost = state.leisureCost;

    try {
      pushToSingleTrip();
      await authFetch.patch(`/trips/usertrips/${itemID}`, state.singleTrip);
      dispatch({ type: EDIT_TRIP_SUCCESS, payload: state.singleTrip });
    } catch (error) {
      console.log(error);
    }
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
        resetSingleTrip,
      }}>
      {children}
    </TripContext.Provider>
  );
};

const useTripContext = () => {
  return useContext(TripContext);
};

export { TripProvider, useTripContext, initialTripState };

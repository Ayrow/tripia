import { createContext, useContext, useReducer } from 'react';
import reducer from './tripReducer';
import {
  CREATE_TRIP_BEGIN,
  CREATE_TRIP_SUCCESS,
  CREATE_TRIP_ERROR,
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
  CHANGE_PAGE,
  CLEAR_FILTERS,
} from '../actions';
import { useAppContext } from '../app/appContext';
import { useUserContext } from '../user/userContext';
import axios from 'axios';

const savedTripsID = localStorage.getItem('savedTripsID');
const savedTrips = localStorage.getItem('savedTrips');

const initialTripState = {
  isEditing: false,
  // isLoading: false,
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
  savedTripsID: savedTripsID || [],
  savedTrips: [],
  totalUserTrips: 0,
  totalTrips: 0,
  liked: false,
  textColor: '',
  textContent: '',
  search: '',
  theme: '',
  maxPrice: '',
  page: 1,
  numOfPages: 1,
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'most saved', 'a-z'],
};

const TripContext = createContext();

const TripProvider = ({ children }) => {
  const { displayAlert, clearAlert, closeModalConfirm, setLoading } =
    useAppContext();
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

  const addSavedTripsToLocalStorage = ({ savedTripsID, savedTrips }) => {
    localStorage.setItem('savedTripsID', JSON.stringify(savedTripsID));
    localStorage.setItem('savedTrips', savedTrips);
  };

  const removeSavedTripsFromLocalStorage = () => {
    localStorage.removeItem('savedTripsID');
    localStorage.removeItem('savedTrips');
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const handleTripChange = ({ name, value }) => {
    dispatch({ type: HANDLE_TRIP_CHANGE, payload: { name, value } });
  };

  const createTrip = async () => {
    dispatch({ type: CREATE_TRIP_BEGIN });
    setLoading(true);
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
    setLoading(false);
    clearAlert();
    clearTripForm();
    getUserTrips();
  };

  const clearTripForm = () => {
    dispatch({ type: CLEAR_TRIP_FORM });
  };

  const getAllTrips = async () => {
    setLoading(true);
    const { page, search, sort, theme, maxPrice } = state;
    let url = `/trips?page=${page}&maxPrice=${maxPrice}&theme=${theme}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }

    try {
      const { data } = await authFetch(url);
      const { everyTrips, totalTrips, numOfPages } = data;
      dispatch({
        type: GET_ALL_TRIPS_SUCCESS,
        payload: { everyTrips, totalTrips, numOfPages },
      });
    } catch (error) {
      dispatch({
        type: GET_TRIPS_ERROR,
        payload: { msg: error },
      });
    }
    setLoading(false);
    clearAlert();
  };

  const getUserTrips = async () => {
    let url = `/trips/usertrips`;
    setLoading(true);
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
    setLoading(false);
    clearAlert();
  };

  const checkIfTripSaved = (id) => {
    const isSaved = state.savedTripsID.includes(id);
    console.log('isSaved', isSaved);
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
    setLoading(true);
    let url = `/trips/${id}`;
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
      console.log('savedTripsID', state.savedTripsID);
      checkIfTripSaved(id);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const deleteTrip = async ({ itemID }) => {
    dispatch({ type: DELETE_TRIP_BEGIN });
    setLoading(true);
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
    setLoading(false);
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
    setLoading(true);
    const { itemID, singleTrip } = state;
    checkForEmptyValues();
    try {
      await authFetch.patch(`/trips/usertrips/${itemID}`, singleTrip);
      dispatch({ type: EDIT_TRIP_SUCCESS, payload: singleTrip });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
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
    setLoading(true);
    try {
      const { data } = await authFetch.post('/trips/usertrips/saved', { id });
      const { user } = data;
      user.saved.push(id);
      dispatch({
        type: SAVE_TRIP_SUCCESS,
        payload: { savedTripsID: user.saved },
      });
      dispatch({
        type: TOGGLE_SAVE_BUTTON,
        payload: { color: 'text-red-700', text: 'Unsave' },
      });
      addSavedTripsToLocalStorage({
        savedTripsID: user.saved,
        savedTrips,
      });
    } catch (error) {
      console.log('error', error);
    }
    setLoading(false);
  };

  const getAllSavedTrips = async () => {
    setLoading(true);
    try {
      const { data } = await authFetch('/trips/usertrips/saved');
      const { trips, user } = data;

      dispatch({
        type: GET_SAVED_TRIP_SUCCESS,
        payload: { trips, savedTripsID: user.saved },
      });
      addSavedTripsToLocalStorage({
        savedTripsID: user.saved,
        savedTrips: trips,
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const removeSavedTrip = async ({ itemID }) => {
    setLoading(true);
    console.log('itemID', itemID);
    try {
      const { data } = await authFetch.delete(
        `/trips/usertrips/saved/${itemID}`
      );
      const { user } = data;
      let newList = user.saved.filter((item) => item !== itemID);
      closeModalConfirm();
      dispatch({
        type: SAVE_TRIP_SUCCESS,
        payload: { user: user, savedTripsID: newList },
      });
      addSavedTripsToLocalStorage({
        savedTripsID: newList,
        savedTrips,
      });
      dispatch({
        type: TOGGLE_SAVE_BUTTON,
        payload: { color: '', text: 'Save' },
      });
    } catch (error) {
      console.log('error', error);
    }
    setLoading(false);
  };

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
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
        changePage,
        clearFilters,
      }}>
      {children}
    </TripContext.Provider>
  );
};

const useTripContext = () => {
  return useContext(TripContext);
};

export { TripProvider, useTripContext, initialTripState };

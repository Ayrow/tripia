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
  GET_SINGLE_TRIP_SUCCESS,
  CLEAR_TRIP_FORM,
  DELETE_TRIP_BEGIN,
  CANCEL_TRIP_EDITION,
  HANDLE_CHANGE,
  HANDLE_TRIP_CHANGE,
  GET_SAVED_TRIP_SUCCESS,
  TOGGLE_SAVE_BUTTON,
  SAVE_TRIP_SUCCESS,
  CHANGE_PAGE,
  CLEAR_FILTERS,
} from '../actions';
import { useAppContext, API_URL } from '../app/appContext';
import { useUserContext } from '../user/userContext';
import axios from 'axios';

const savedTripsID = localStorage.getItem('savedTripsID');

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
    images: [],
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
  limit: 10,
};

const TripContext = createContext();

const TripProvider = ({ children }) => {
  const { displayAlert, clearAlert, closeModalConfirm, setLoading } =
    useAppContext();
  const { logoutUser, token } = useUserContext();
  const [state, dispatch] = useReducer(reducer, initialTripState);

  //axios
  // axios.defaults.withCredentials = true;
  const authFetch = axios.create({
    baseURL: `${API_URL}/api/v1`,
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

  const addSavedTripsToLocalStorage = (savedTripsID) => {
    localStorage.setItem('savedTripsID', JSON.stringify(savedTripsID));
  };

  const removeSavedTripsFromLocalStorage = () => {
    localStorage.removeItem('savedTripsID');
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

  const getTripsLandinPage = async () => {
    setLoading(true);
    const sort = 'most saved';
    const limit = '4';
    let url = `/trips?sort=${sort}&limit=${limit}`;

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

  const getAllTrips = async () => {
    setLoading(true);
    const { page, search, theme, maxPrice, sort, limit } = state;
    let url = `/trips?page=${page}&maxPrice=${maxPrice}&theme=${theme}&sort=${sort}&limit=${limit}`;
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
      logoutUser();
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
      });

      getAllSavedTrips();
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
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const removeSavedTrip = async ({ itemID }) => {
    setLoading(true);
    try {
      const { data } = await authFetch.delete(
        `/trips/usertrips/saved/${itemID}`
      );
      const { user } = data;

      closeModalConfirm();

      dispatch({
        type: SAVE_TRIP_SUCCESS,
        payload: { user: user, savedTripsID: user.saved },
      });
      addSavedTripsToLocalStorage({
        savedTripsID: user.saved,
      });
      dispatch({
        type: TOGGLE_SAVE_BUTTON,
        payload: { color: '', text: 'Save' },
      });
      getAllSavedTrips();
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
        removeSavedTripsFromLocalStorage,
        getTripsLandinPage,
      }}>
      {children}
    </TripContext.Provider>
  );
};

const useTripContext = () => {
  return useContext(TripContext);
};

export { TripProvider, useTripContext, initialTripState };

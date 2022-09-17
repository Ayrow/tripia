import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  HANDLE_CHANGE,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  CREATE_TRIP_BEGIN,
  CREATE_TRIP_SUCCESS,
  CREATE_TRIP_ERROR,
  GET_TRIPS_BEGIN,
  GET_TRIPS_SUCCESS,
  GET_TRIPS_ERROR,
} from './actions';

import { initialState } from './appContext';

const reducer = (state, action) => {
  switch (action.type) {
    case DISPLAY_ALERT:
      return {
        ...state,
        showAlert: true,
        alertType: action.payload.type,
        alertText: action.payload.msg,
      };
    case CLEAR_ALERT:
      return {
        ...state,
        showAlert: false,
      };
    case HANDLE_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case SETUP_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case SETUP_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        alertType: action.payload.type,
        alertText: action.payload.msg,
        user: action.payload.user,
        token: action.payload.token,
      };
    case SETUP_USER_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    case LOGOUT_USER:
      return {
        ...initialState,
        isLoading: false,
        token: null,
        user: null,
        userLocation: '',
        jobLocation: '',
      };
    case CREATE_TRIP_BEGIN:
      return {
        ...state,
        isLoading: true,
        showAlert: false,
      };
    case CREATE_TRIP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'success',
        alertText: 'Successfully created!',
      };
    case CREATE_TRIP_ERROR:
      return {
        ...state,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      };
    case GET_TRIPS_BEGIN:
      return {
        ...state,
        isLoading: true,
        showAlert: false,
      };
    case GET_TRIPS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userTrips: action.payload,
      };
    case GET_TRIPS_ERROR:
      return {
        ...state,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      };
    default:
      throw new Error(`There is no action: ${action.type}`);
  }
};

export default reducer;

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
  DELETE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  CREATE_TRIP_BEGIN,
  CREATE_TRIP_SUCCESS,
  CREATE_TRIP_ERROR,
  GET_TRIPS_BEGIN,
  GET_USER_TRIPS_SUCCESS,
  GET_ALL_TRIPS_SUCCESS,
  GET_SINGLE_TRIP_SUCCESS,
  GET_TRIPS_ERROR,
  DELETE_TRIP_BEGIN,
  EDIT_TRIP_BEGIN,
  EDIT_TRIP_SUCCESS,
  EDIT_TRIP_ERROR,
  CLEAR_TRIP_FORM,
  CANCEL_TRIP_EDITION,
  UPDATE_TRIP_BEGIN,
} from './actions';

import { initialState } from './appContext';
import { initialTripState } from './tripContext';

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
    case OPEN_MODAL_CONFIRM:
      return {
        ...state,
        isConfirmationModalOpen: true,
        itemID: action.payload.id,
        modalConfirmText: action.payload.text,
        modalConfirmTitle: action.payload.title,
        modalConfirmType: action.payload.editType,
        needPasswordValidation: action.payload.passwordValidation,
      };
    case CLOSE_MODAL_CONFIRM:
      return {
        ...state,
        isConfirmationModalOpen: false,
        modalConfirmText: '',
        modalConfirmTitle: '',
        modalConfirmType: '',
        needPasswordValidation: '',
        itemID: null,
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
        isEditing: false,
        showAlert: false,
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
        isLoading: false,
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
    case GET_USER_TRIPS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userTrips: action.payload,
      };
    case GET_ALL_TRIPS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allTrips: action.payload,
      };
    case GET_SINGLE_TRIP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        singleTrip: action.payload.trip,
        itemID: action.payload.itemID,
      };
    case GET_TRIPS_ERROR:
      return {
        ...state,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      };
    case DELETE_TRIP_BEGIN:
      return {
        ...state,
        showAlert: true,
        alertType: 'success',
        alertText: 'Trip deleted successfully!',
      };
    case DELETE_USER_BEGIN:
      return {
        ...state,
        // itemID: action.payload,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case CLEAR_TRIP_FORM:
      return {
        ...state,
        destination: '',
        nbAdults: 1,
        nbChildren: 0,
        nbTravelers: {
          adults: 1,
          children: 0,
        },
        duration: 1,
        theme: '',
        cost: 0,
        activities: '',
        advices: '',
      };
    case EDIT_TRIP_BEGIN:
      return {
        ...state,
        isEditing: true,
        itemID: action.payload.id,
        singleTrip: action.payload.singleTrip,
      };
    case EDIT_TRIP_SUCCESS:
      return {
        ...state,
        isEditing: false,
        itemID: null,
      };
    case CANCEL_TRIP_EDITION:
      return {
        ...state,
        isEditing: false,
        itemID: null,
      };
    case UPDATE_TRIP_BEGIN:
      return {
        ...state,
        theme: action.payload.theme,
        destination: action.payload.destination,
        duration: action.payload.duration,
      };
    default:
      throw new Error(`There is no action: ${action.type}`);
  }
};

export default reducer;

import {
  HANDLE_CHANGE,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  DELETE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  GET_SAVED_TRIP_SUCCESS,
  TOGGLE_SAVE_BUTTON,
  SAVE_TRIP_SUCCESS,
  CHANGE_PAGE,
  CLEAR_FILTERS,
} from '../actions';

const reducer = (state, action) => {
  switch (action.type) {
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
        alertType: action.payload.type,
        alertText: action.payload.msg,
        user: action.payload.user,
        token: action.payload.token,
        // initialTripState: {
        //   ...initialTripState,
        //   savedTripsID: action.payload.savedTrips,
        // },
      };
    case SETUP_USER_ERROR:
      return {
        ...state,
      };
    case LOGOUT_USER:
      return {
        ...state,
        token: null,
        user: null,
        isEditing: false,
        showAlert: false,
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

    case GET_SAVED_TRIP_SUCCESS:
      return {
        ...state,
        savedTrips: action.payload.trips,
        savedTripsID: action.payload.savedTripsID,
      };
    case TOGGLE_SAVE_BUTTON:
      return {
        ...state,
        textColor: action.payload.color,
        textContent: action.payload.text,
      };
    case SAVE_TRIP_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        savedTripsID: action.payload.savedTripsID,
      };
    case CHANGE_PAGE:
      return {
        ...state,
        page: action.payload.page,
      };
    case CLEAR_FILTERS:
      return {
        ...state,
        theme: '',
        search: '',
      };

    default:
      throw new Error(`There is no action: ${action.type}`);
  }
};

export default reducer;

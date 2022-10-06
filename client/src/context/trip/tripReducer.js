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
  RESET_SINGLE_TRIP,
  HANDLE_TRIP_CHANGE,
  GET_SAVED_TRIP_SUCCESS,
  TOGGLE_SAVE_BUTTON,
  SAVE_TRIP_SUCCESS,
  CHANGE_PAGE,
  CLEAR_FILTERS,
} from '../actions';

import { initialTripState } from './tripContext';

const reducer = (state, action) => {
  switch (action.type) {
    case HANDLE_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    case HANDLE_TRIP_CHANGE:
      const { singleTrip } = state;

      if (
        action.payload.name.startsWith('nbTravelers') &&
        action.payload.name.split('.').length > 1
      ) {
        let travelerField = action.payload.name.split('.')[1];

        return {
          ...state,
          singleTrip: {
            ...singleTrip,
            nbTravelers: {
              ...singleTrip.nbTravelers,
              [travelerField]: action.payload.value,
            },
          },
        };
      }

      if (
        action.payload.name.startsWith('costDetails') &&
        action.payload.name.split('.').length > 2
      ) {
        let costField = action.payload.name.split('.')[2];
        return {
          ...state,
          singleTrip: {
            ...singleTrip,
            costDetails: {
              ...singleTrip.costDetails,
              travel: {
                ...singleTrip.costDetails.travel,
                [costField]: action.payload.value,
              },
              accomodation: {
                ...singleTrip.costDetails.accomodation,
                [costField]: action.payload.value,
              },

              leisure: {
                ...singleTrip.costDetails.leisure,
                [costField]: action.payload.value,
              },
            },
          },
        };
      }

      return {
        ...state,
        singleTrip: {
          ...singleTrip,
          [action.payload.name]: action.payload.value,
        },
      };

    case CREATE_TRIP_BEGIN:
      return {
        ...state,
        isLoading: true,
        showAlert: false,
        isEditing: false,
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
        isEditing: false,
      };
    case GET_TRIPS_BEGIN:
      return {
        ...state,
        // initialState: {
        //   ...initialState,
        //   isLoading: true,
        // },
        // isLoading: true,
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
        // isLoading: false,
        allTrips: action.payload.everyTrips,
        totalTrips: action.payload.totalTrips,
        numOfPages: action.payload.numOfPages,
      };

    case GET_SINGLE_TRIP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        singleTrip: action.payload.trip,
        fetchedSingleTrip: action.payload.trip,
        itemID: action.payload.id,
      };
    case GET_TRIPS_ERROR:
      return {
        ...state,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
        isEditing: false,
      };
    case DELETE_TRIP_BEGIN:
      return {
        ...state,
        showAlert: true,
        alertType: 'success',
        alertText: 'Trip deleted successfully!',
      };

    case CLEAR_TRIP_FORM:
      return {
        ...state,
        singleTrip: initialTripState.singleTrip,
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
        singleTrip: action.payload,
        fetchedSingleTrip: action.payload,
        isEditing: false,
      };
    case CANCEL_TRIP_EDITION:
      return {
        ...state,
        isEditing: false,
        isLoading: false,
        // itemID: null,
      };
    case UPDATE_TRIP_BEGIN:
      return {
        ...state,
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
    case RESET_SINGLE_TRIP:
      return {
        ...state,
        singleTrip: {
          destination: '',
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
      };
    default:
      throw new Error(`There is no action: ${action.type}`);
  }
};

export default reducer;

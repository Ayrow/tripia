import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
} from './actions';

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
    case SETUP_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case SETUP_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        alertTxt: action.payload.alertTxt,
        user: action.payload.user,
        token: action.payload.token,
      };
    case SETUP_USER_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    default:
      throw new Error(`There is no action: ${action.type}`);
  }
};

export default reducer;

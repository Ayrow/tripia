import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  OPEN_MODAL_CONFIRM,
  CLOSE_MODAL_CONFIRM,
  HANDLE_LOADING,
} from '../actions';

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
    case HANDLE_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    // case HANDLE_CHANGE:
    //   return {
    //     ...state,
    //     [action.payload.name]: action.payload.value,
    //   };

    default:
      throw new Error(`There is no action: ${action.type}`);
  }
};

export default reducer;

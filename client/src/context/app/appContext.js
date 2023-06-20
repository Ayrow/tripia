import { createContext, useContext, useReducer } from 'react';
import reducer from './appReducer';
import axios from 'axios';

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  OPEN_MODAL_CONFIRM,
  CLOSE_MODAL_CONFIRM,
  HANDLE_CHANGE,
  HANDLE_LOADING,
} from '../actions.js';

export const API_URL = 'https://tripia.onrender.com';

const initialState = {
  isLoading: false,
  showAlert: false,
  isConfirmationModalOpen: '',
  modalConfirmText: '',
  modalConfirmTitle: '',
  modalConfirmType: '',
  needPasswordValidation: false,
  alertText: '',
  alertType: '',
  editType: '',
  isEditing: false,
  itemID: null,
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //axios
  axios.defaults.withCredentials = true;
  const authFetch = axios.create({
    baseURL: `${API_URL}/api/v1`,
  });

  // request
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`;
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

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 4000);
  };

  const displayAlert = ({ type, msg }) => {
    dispatch({ type: DISPLAY_ALERT, payload: { type, msg } });
    clearAlert();
  };

  const openModalConfirm = ({
    id,
    text,
    title,
    editType,
    passwordValidation,
  }) => {
    dispatch({
      type: OPEN_MODAL_CONFIRM,
      payload: { id, text, title, editType, passwordValidation },
    });
  };

  const closeModalConfirm = () => {
    dispatch({ type: CLOSE_MODAL_CONFIRM });
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const setLoading = (boolean) => {
    dispatch({ type: HANDLE_LOADING, payload: boolean });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        handleChange,
        openModalConfirm,
        closeModalConfirm,
        clearAlert,
        setLoading,
      }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { useAppContext, AppProvider, initialState };

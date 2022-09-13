import { createContext, useContext, useReducer } from 'react';
import reducer from './reducer';
import axios from 'axios';

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
} from './actions';

const AppContext = createContext();

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: null,
  token: null,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //axios
  const authFetch = axios.create({
    baseURL: 'api/v1',
  });

  const displayAlert = ({ type, msg }) => {
    dispatch({ type: DISPLAY_ALERT, payload: { type, msg } });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const setupUser = async ({ currentUser, endPoint }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await authFetch('/register', currentUser);
      const { user, token } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: {
          user,
          token,
        },
      });
    } catch (error) {
      dispatch({ type: SETUP_USER_ERROR });
    }
    clearAlert();
  };

  return (
    <AppContext.Provider value={{ ...state, setupUser, displayAlert }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { useAppContext, AppProvider };

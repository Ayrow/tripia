import { createContext, useContext, useReducer } from 'react';
import reducer from './reducer';
import axios from 'axios';

import {
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
} from './actions';

const AppContext = createContext();

const initialState = {
  isLoading: false,
  showAlert: false,
  alertMsg: '',
  user: null,
  token: null,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //axios
  const authFetch = axios.create({
    baseURL: 'api/v1',
  });

  const setupUser = async (currentUser) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
    } catch (error) {
      dispatch({ type: SETUP_USER_ERROR });
    }
    console.log('working');
  };

  return (
    <AppContext.Provider value={{ ...state, setupUser }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { useAppContext, AppProvider };

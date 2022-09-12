import { createContext, useContext, useReducer } from 'react';
import reducer from './reducer';

const AppContext = createContext();

const initialState = {
  isLoading: false,
  showAlert: false,
  alertMsg: '',
  user: null,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ ...state }}>{children}</AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { useAppContext, AppProvider };

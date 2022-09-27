import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AppProvider } from './context/appContext';
import { UserProvider } from './context/userContext';
import { TripProvider } from './context/tripContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider>
      <UserProvider>
        <TripProvider>
          <App />
        </TripProvider>
      </UserProvider>
    </AppProvider>
  </React.StrictMode>
);

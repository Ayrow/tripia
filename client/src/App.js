import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import {
  LandingPage,
  RegisterForm,
  Error,
  Explore,
  ProtectedRoute,
} from './pages';

import {
  ManageAccount,
  SharedLayout,
  SavedTrips,
  Trips,
  DashboardMain,
} from './pages/dashboard';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/explore' element={<Explore />} />

        <Route
          path='/dashboard/'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }>
          <Route index element={<DashboardMain />} />
          <Route path='settings' element={<ManageAccount />} />
          <Route path='trips' element={<Trips />} />
          <Route path='saved-trips' element={<SavedTrips />} />
        </Route>

        <Route path='*' element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
export default App;

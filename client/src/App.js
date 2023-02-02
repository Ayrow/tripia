import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import {
  LandingPage,
  RegisterForm,
  Error,
  Explore,
  ProtectedRoute,
  FAQ,
} from './pages';

import {
  ManageAccount,
  SharedLayout,
  SavedTrips,
  UserTrips,
  DashboardMain,
} from './pages/dashboard';
import SingleTrip from './pages/SingleTrip';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='register' element={<RegisterForm />} />
        <Route path='explore' element={<Explore />} />
        <Route path={`explore/:id`} element={<SingleTrip />} />
        <Route path='faq' element={<FAQ />} />

        <Route
          path='/dashboard/'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }>
          <Route index element={<DashboardMain />} />
          <Route path='settings' element={<ManageAccount />} />
          <Route path='my-trips' element={<UserTrips />} />
          <Route path='saved-trips' element={<SavedTrips />} />
        </Route>

        <Route path='*' element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
export default App;

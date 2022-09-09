import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { LandingPage, RegisterForm, Error, Explore } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/landing' element={<LandingPage />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;

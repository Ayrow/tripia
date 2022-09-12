import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { LandingPage, RegisterForm, Error, Explore } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
export default App;

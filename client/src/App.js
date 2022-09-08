import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/landing' element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;

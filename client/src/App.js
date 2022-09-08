import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage, Register } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/landing' element={<LandingPage />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage, Register, Error } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/landing' element={<LandingPage />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;

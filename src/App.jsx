import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import StorePage from './pages/StorePage';

function App() {

//console.log(isAuthenticated)
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<StorePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

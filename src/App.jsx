import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import StorePage from './pages/StorePage';
import StoreLocator from './pages/StoreLocator';

function App() {

//console.log(isAuthenticated)
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<StorePage />} />
       <Route path="/StoreLocator" element={<StoreLocator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

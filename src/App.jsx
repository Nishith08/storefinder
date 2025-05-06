import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import StorePage from './pages/StorePage';
import StoreLocator from './pages/StoreLocator';
import StoreLocatorV1 from './pages/StoreLocatorV1';

function App() {

//console.log(isAuthenticated)
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<StorePage />} />
       <Route path="/StoreLocator" element={<StoreLocator />} />
       <Route path="/StoreLocatorV1" element={<StoreLocatorV1 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

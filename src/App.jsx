import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import StorePage from './pages/StorePage';
import StorePageCityDistrict from './pages/StorePageCity&District';
import StorePageCoordinates from './pages/StorePageCoordinates';
import StoreLocator from './pages/StoreLocator';
import StoreLocatorV1 from './pages/StoreLocatorV1';

function App() {

//console.log(isAuthenticated)
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<StorePage />} />//pincode&district wise Filter
       <Route path="/citydistrict" element={<StorePageCityDistrict />} />//city&district wise Filter
       <Route path="/cordinates" element={<StorePageCoordinates />} />//Cordinates wise Filter, radius base(50km radius from center)
       <Route path="/StoreLocator" element={<StoreLocator />} />
       <Route path="/StoreLocatorV1" element={<StoreLocatorV1 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

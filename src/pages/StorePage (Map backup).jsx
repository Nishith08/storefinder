import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import citiesData from '../data/cities.json'; // Adjust path if needed

import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import icon from 'leaflet/dist/images/marker-icon.png';
import shadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: icon,
  shadowUrl: shadow,
});

const StorePage = () => {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: '', lng: '' });

  const token = localStorage.getItem('token');
  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

  // Extract states from cities.json
  const states = [...new Set(citiesData.map(city => city.state))];

  const filteredCities = selectedState
    ? citiesData.filter(c => c.state === selectedState)
    : [];

  const getCurrentLocationStores = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setCoordinates({ lat, lng });
  
          // Reverse Geocoding using Nominatim API
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
            );
            console.log(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
            const data = await response.json();
            const city = data.address.state_district || data.address.town || data.address.village || '';
            const state = data.address.state || '';
            setSearch(`${city}, ${state}`); // Set value to input field
          } catch (err) {
            console.error('Error in reverse geocoding', err);
          }
  
          fetchStoresNearby(lat, lng);
        },
        (err) => {
          alert("Failed to get location. Please allow location access.");
          console.error(err);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };
    
    

  const fetchStoresNearby = async (lat, lng) => {
    try {
      const res = await axios.post('http://localhost:8000/api/find-stores', {
        latitude: lat,
        longitude: lng,
      }, axiosConfig);
      setStores(res.data);
    } catch (err) {
      console.error('Error fetching nearby stores', err);
    }
  };

  const handleCitySelect = (cityName) => {
    setSelectedCity(cityName);
    const cityObj = citiesData.find(c => c.city === cityName && c.state === selectedState);
    if (cityObj) {
      setCoordinates({ lat: cityObj.latitude, lng: cityObj.longitude });
      fetchStoresNearby(cityObj.latitude, cityObj.longitude);
    }
  };

  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(search.toLowerCase()) ||
      store.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <h3>Find Nearby Stores</h3>

      <div style={{ marginBottom: '20px' }}>
        <select onChange={(e) => setSelectedState(e.target.value)} value={selectedState}>
          <option value="">Select State</option>
          {states.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>

        <select onChange={(e) => handleCitySelect(e.target.value)} value={selectedCity} disabled={!selectedState}>
          <option value="">Select City</option>
          {filteredCities.map(city => (
            <option key={city.city} value={city.city}>{city.city}</option>
          ))}
        </select>
      </div>
<div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
  <input
    type="text"
    placeholder="Search by name or address"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{ flex: 1, padding: '8px' }}
  />
  <button onClick={getCurrentLocationStores} style={{ padding: '8px' }}>
    Use My Location
  </button>
</div>

      <ul>
        {filteredStores.map((store) => (
          <li key={store.id}>
            <strong>{store.name}</strong> - {store.address} ({store.latitude}, {store.longitude})
          </li>
        ))}
      </ul>

      {filteredStores.length > 0 && (
        <>
          <h3>Store Map</h3>
          <MapContainer
            center={[filteredStores[0].latitude, filteredStores[0].longitude]}
            zoom={13}
            style={{ height: '400px', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {filteredStores.map((store) => (
              <Marker key={store.id} position={[store.latitude, store.longitude]}>
                <Popup>
                  <strong>{store.name}</strong><br />
                  {store.address}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </>
      )}
    </div>
  );
};

export default StorePage;

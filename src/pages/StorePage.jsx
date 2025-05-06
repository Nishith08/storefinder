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
            //console.log(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
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
  const fetchStoresbyDistrict = async (district) => {
    //console.log("d123");
    try {
      const res = await axios.get('http://localhost:8000/api/stores', {
      }, axiosConfig);
      
      const allStores = res.data;

      // 2. Get all cities in the given district (case-insensitive match)
      const districtCities = citiesData
        .filter(city => city.district.toLowerCase() === district.toLowerCase())
        .map(city => city.city.toLowerCase());
  
      // 3. Filter stores where store.city is in districtCities
      const filteredStores = allStores.filter(store =>
        districtCities.includes(store.city.toLowerCase())
      );
  
      // 4. Set the filtered store list
      setStores(filteredStores);
      //console.log("hi"+filteredStores+"hello");
      //setStores(res.data);
    } catch (err) {
      console.error('Error fetching nearby stores', err);
    }
  };
  const handleCitySelect = (cityName) => {
    setSelectedCity(cityName);
    const cityObj = citiesData.find(c => c.city === cityName && c.state === selectedState);
    if (cityObj) {
      setCoordinates({ lat: cityObj.latitude, lng: cityObj.longitude });
      fetchStoresbyDistrict(cityName);
    }
  };

  const filteredStores = stores;

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
          <option value="">Select District</option>
          {[...new Set(filteredCities.map(city => city.district))].map(district => (
  <option key={district} value={district}>{district}</option>
))}
        </select>
      </div>
<div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
  <button onClick={getCurrentLocationStores} style={{ padding: '8px' }}>
    {search?search:"Use My Location"}
  </button>
</div>

<ul>
  {filteredStores.map((store) => (
    <li key={store.id} style={{ marginBottom: "1rem" }}>
      <strong>{store.name}</strong> - {store.address} ({store.latitude}, {store.longitude})
      <br />
      <button
        style={{ marginTop: "0.5rem" }}
        onClick={() => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${store.latitude},${store.longitude}&travelmode=driving`;
                window.open(googleMapsUrl, '_blank');
              },
              (error) => {
                alert("Location access denied or unavailable.");
              }
            );
          } else {
            alert("Geolocation is not supported by this browser.");
          }
        }}
      >
        Get Directions
      </button>
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

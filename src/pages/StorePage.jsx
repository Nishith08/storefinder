import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import citiesData from '../data/cities.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './StorePage.css';
import MapUpdater from './MapUpdater';

import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import icon from 'leaflet/dist/images/marker-icon.png';
import shadow from 'leaflet/dist/images/marker-shadow.png';
import Navbar from './Navbar';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: icon,
  shadowUrl: shadow,
});

const StorePage = () => {


  const [zoom, setZoom] = useState(4); // Initial zoom for India
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  //const [coordinates, setCoordinates] = useState({ lat: '', lng: '' });
  const [coordinates, setCoordinates] = useState({ lat: 21.146633, lng: 79.088860 }); // Nagpur, India


  const token = localStorage.getItem('token');
  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

  const states = [...new Set(citiesData.map(city => city.state))];
  const filteredCities = selectedState ? citiesData.filter(c => c.state === selectedState) : [];

  const stateOptions = states.map(state => ({ value: state, label: state }));
  const districtOptions = [...new Set(filteredCities.map(city => city.district))].map(d => ({
    value: d,
    label: d,
  }));

  const getCurrentLocationStores = () => {
    setZoom(8);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setCoordinates({ lat, lng });
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
            );
            const data = await response.json();
            const city = data.address.state_district || data.address.town || data.address.village || '';
            const state = data.address.state || '';
            setSearch(`${city}, ${state}`);
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

  const fetchAllStores = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/stores', axiosConfig);
      setStores(res.data);
    } catch (err) {
      console.error('Error fetching nearby stores', err);
    }
  };

  useEffect(() => {
    fetchAllStores();
  }, []); // Empty array ensures this runs once when component mounts


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
    try {
      const res = await axios.get('http://localhost:8000/api/stores', axiosConfig);
      const allStores = res.data;
      const normalize = str => str.toLowerCase().replace(/\s+/g, '');
      const matchedStores = allStores.filter(store =>
        store.district && (
          normalize(store.district).startsWith(normalize(district)) ||
          normalize(district).startsWith(normalize(store.district))
        )
      );
      setStores(matchedStores);
    } catch (error) {
      console.error('Error fetching stores:', error);
    }
  };

  const handleCitySelect = (cityName) => {
    setZoom(8);
    setSelectedCity(cityName);
    const cityObj = citiesData.find(c => c.district === cityName && c.state === selectedState);
    if (cityObj) {
      setCoordinates({ lat: cityObj.latitude, lng: cityObj.longitude });
      fetchStoresbyDistrict(cityName);
    }
  };
  console.log(zoom);
  return (
    <>
      <Navbar />
      <div className="container my-lg-5 my-sm-2">
        <div className="card">
          <div className="card-header text-center text-uppercase">
            <h1 className='fs-2 my-1'>Store Locator</h1>
          </div>
          {/* User Input and Map Display Starts */}
          <div className="row mx-2 mt-3">
            <div className="col-md-6 d-flex align-items-center">
              <div className="card-body p-0">
                <form className='p-0'>
                  <div className="row">

                    <div className="col-md-6">
                      <Select
                        options={stateOptions}
                        value={stateOptions.find(opt => opt.value === selectedState)}
                        onChange={(opt) => setSelectedState(opt?.value || '')}
                        placeholder="Select State"
                        isClearable
                      />
                    </div>
                    <div className="col-md-6 cust-gap">
                      <Select
                        options={districtOptions}
                        value={districtOptions.find(opt => opt.value === selectedCity)}
                        onChange={(opt) => handleCitySelect(opt?.value || '')}
                        placeholder="Select District"
                        isDisabled={!selectedState}
                        isClearable
                      />
                    </div>
                  </div>

                  <div className="text-center my-lg-4 cust-gap">
                    <span>OR</span>
                  </div>

                  <div className="text-center cust-gap">
                    <button
                      type="button"
                      onClick={getCurrentLocationStores}
                      className="btn btn-primary custom-btn btn1 custom-btn-primary"
                    >
                      <FontAwesomeIcon icon={faLocationDot} /> &nbsp; {search ? search : "Use My Location"}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-md-6 cust-gap">
              {coordinates.lat && coordinates.lng && (
                <MapContainer
                  center={[coordinates.lat, coordinates.lng]}
                  zoom={zoom}
                  style={{
                    height: '400px',
                    width: '100%',
                    border: 1,
                    borderRadius: '15px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  <MapUpdater coordinates={coordinates} zoom={zoom} />

                  {  /* 
                  <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
                  /> */ }
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                  />

                  {stores.map(store => (
                    <Marker key={store.id} position={[store.latitude, store.longitude]}>
                      <Popup>
                        <strong>{store.name}</strong><br />
                        {store.address}<br />
                        <button
                          className="btn btn-outline-secondary btn-sm mt-2"
                          onClick={() => {
                            if (navigator.geolocation) {
                              navigator.geolocation.getCurrentPosition(
                                (position) => {
                                  const userLat = position.coords.latitude;
                                  const userLng = position.coords.longitude;
                                  const url = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${store.latitude},${store.longitude}&travelmode=driving`;
                                  window.open(url, '_blank');
                                },
                                () => alert("Location access denied or unavailable.")
                              );
                            } else {
                              alert("Geolocation is not supported by this browser.");
                            }
                          }}
                        >
                          Get Directions <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              )}
            </div>
          </div>
          {/* User Input and Map Display Ends */}

          <hr />

          {/* Cards Starts */}
          <div className="store-scroll-container"
            style={{ maxHeight: '600px', overflowX: 'hidden', overflowY: 'auto', marginBottom: '1rem' }}>
            <div className="row px-4 pb-1">
              {stores.map(store => (
                <div className="col-md-4 mb-3 mt-1" key={store.id}>
                  <div className="card custom-card h-100">
                    <div className="card-body">
                      <h5 className="card-title fw-bold">{store.name}</h5>
                      <p className="badge text-uppercase fw-light">{store.role || 'Dealer'}</p>
                      <p className="card-text">
                        <FontAwesomeIcon icon={faLocationDot} className="icon-gray" />&nbsp;
                        {store.address}
                      </p>
                      <button
                        className="btn btn-outline-secondary btn-sm get-direction-btn"
                        onClick={() => {
                          if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(
                              (position) => {
                                const userLat = position.coords.latitude;
                                const userLng = position.coords.longitude;
                                const url = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${store.latitude},${store.longitude}&travelmode=driving`;
                                window.open(url, '_blank');
                              },
                              () => alert("Location access denied or unavailable.")
                            );
                          } else {
                            alert("Geolocation is not supported by this browser.");
                          }
                        }}
                      >
                        Get Directions <FontAwesomeIcon icon={faArrowRight} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Cards Starts */}
        </div>
      </div>
    </>
  );
};

export default StorePage;

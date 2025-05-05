import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StorePage = () => {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState('');

  const [form, setForm] = useState({
    name: '',
    address: '',
    latitude: '',
    longitude: '',
  });

  const token = localStorage.getItem('token'); // Make sure user is logged in and token is stored

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchStores = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/stores', axiosConfig);
      setStores(res.data);
    } catch (err) {
      console.error('Error fetching stores', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/stores', form, axiosConfig);
      setForm({ name: '', address: '', latitude: '', longitude: '' });
      fetchStores();
    } catch (err) {
      console.error('Error adding store', err);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Add Store Location</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Store Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        /><br />
        <input
          type="text"
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        /><br />
        <input
          type="text"
          placeholder="Latitude"
          value={form.latitude}
          onChange={(e) => setForm({ ...form, latitude: e.target.value })}
        /><br />
        <input
          type="text"
          placeholder="Longitude"
          value={form.longitude}
          onChange={(e) => setForm({ ...form, longitude: e.target.value })}
        /><br />
        <button type="submit">Add Store</button>
      </form>

     
      <h3>Store List</h3>
<input
  type="text"
  placeholder="Search by name or address"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{ marginBottom: '10px', width: '100%', padding: '8px' }}
/>

      <ul>
      {stores
  .filter((store) =>
    store.name.toLowerCase().includes(search.toLowerCase()) ||
    store.address.toLowerCase().includes(search.toLowerCase())
  )
  .map((store) => (
    <li key={store.id}>
      <strong>{store.name}</strong> - {store.address} ({store.latitude}, {store.longitude})
    </li>
))}

      </ul>
    </div>
  );
};

export default StorePage;

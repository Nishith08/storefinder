import { useMap } from 'react-leaflet';
import { useEffect } from 'react';

const MapUpdater = ({ coordinates, zoom }) => {
  const map = useMap();

  useEffect(() => {
    if (coordinates.lat && coordinates.lng) {
      map.setView([coordinates.lat, coordinates.lng], zoom);
    }
  }, [coordinates, zoom, map]);

  return null;
};

export default MapUpdater;

import { env } from '@env';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import React, { memo, useState } from 'react';
import { IMap, mapStyles } from './map.config';

export const Map = memo(function Map({
  markers,
  defaultCenter,
  defaultZoom = 15,
  height = '500px',
  width = '100%',
}: IMap) {
  const [map, setMap] = useState({});
  const [centerChanged, setCenterChanged] = useState(false);

  return (
    <LoadScript googleMapsApiKey={env.GOOGLE_MAP_KEY}>
      <GoogleMap
        mapContainerStyle={{ height, width }}
        center={defaultCenter}
        onCenterChanged={() => setCenterChanged(true)}
        zoom={defaultZoom}
        onLoad={(map) => setMap(map)}
        options={{ styles: mapStyles }}
      >
        {markers.map((marker, index) => (
          <Marker key={index} {...marker} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
});

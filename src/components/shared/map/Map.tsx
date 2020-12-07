import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import React, { memo, useState } from 'react';
import { IMap, mapStyles } from './map-context';

export const Map = memo(({ defaultZoom = 15, defaultCenter, height = '500px', width = '100%', markers = [] }: IMap) => {
  const [map, setMap] = useState({});
  const [centerChanged, setCenterChanged] = useState(false);

  return (
    <LoadScript googleMapsApiKey="AIzaSyCvXa4VevmTmTayzh4EB4n22Hs769ffr_U">
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

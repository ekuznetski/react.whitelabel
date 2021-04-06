import { env } from '@env';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import React, { memo, useState } from 'react';
import { Placeholder } from '../placeholder/Placeholder';
import { IMap, mapStyles } from './map.config';

export const Map = memo(function Map({
  markers,
  defaultCenter,
  defaultZoom = 17,
  height = '500px',
  width = '100%',
  embed,
}: IMap) {
  const [map, setMap] = useState({});
  const [centerChanged, setCenterChanged] = useState(false);
  const [loading, setLoading] = useState(true);

  if (embed) {
    return (
      <>
        {loading && <Placeholder text="Loading Map.." />}
        <iframe
          width={width}
          height={height}
          frameBorder="0"
          style={{ border: 0 }}
          src={`https://www.google.com/maps/embed/v1/view?key=${env.GOOGLE_MAP_KEY}&center=${defaultCenter.lat},${defaultCenter.lng}&zoom=${defaultZoom}`}
          allowFullScreen
          onLoad={() => setLoading(false)}
        ></iframe>
      </>
    );
  } else
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

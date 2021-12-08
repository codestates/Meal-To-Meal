import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';

const Map = () => {
  return <GoogleMap defaultZoom={13} defaultCenter={{ lat: 37.51249519205713, lng: 126.99480974427608 }} />;
};

const WrappedMap = withScriptjs(withGoogleMap(Map));

const Google = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&
        libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
      />
    </div>
  );
};
const Maps = () => {
  return (
    <div className="google-maps">
      <Google />
    </div>
  );
};

export default Maps;

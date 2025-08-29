// External Imports
import {useState, useEffect, useRef} from 'react';
import {Wrapper, Status} from '@googlemaps/react-wrapper';
import GoogleMap from './GoogleWrapper';
// import Marker from "./Marker";

const render = (status) => {
  switch (status) {
    case Status.LOADING:
      return null;

    case Status.FAILURE:
      return null;

    default:
      return null; // on success, map is rendered
  }
};

const newOrleans = {lat: 29.9511, lng: -90.0715};

export const Map = () => {
  const [mapCenter, setMapCenter] = useState(newOrleans);
  const [mapZoom, setMapZoom] = useState(12);
  const [map, setMap] = useState(null);

  return (
    <>
      <Wrapper
        render={render}
        apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      >
        <GoogleMap
          map={map}
          setMap={setMap}
          zoom={mapZoom}
          center={mapCenter}
          styles={mapStyles}
          zoomControl={false}
          rotateControl={true}
          mapTypeControl={false}
          setMapZoom={setMapZoom}
          fullscreenControl={false}
          streetViewControl={false}
          setMapCenter={setMapCenter}
          style={{flexGrow: '1', height: '100%', width: '100%'}}
        ></GoogleMap>
      </Wrapper>
    </>
  );
};

const mapStyles = [
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{visibility: 'off'}],
  },
  {
    featureType: 'transit',
    elementType: 'labels.icon',
    stylers: [{visibility: 'off'}],
  },
];

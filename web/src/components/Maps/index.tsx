import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import { Container } from './styles';

const state = {
  lat: -32.0407782,
  lng: -52.1016753,
  zoom: 13,
}

const Maps: React.FC = () => {
  return (
    <Container>
      <Map center={[state.lat, state.lng]} zoom={state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[state.lat, state.lng]} />
      </Map>
    </Container>
  );
}

export default Maps;

import React from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';

import { Container } from './styles';

interface MapProps {
  center: [number, number],
  zoom: number,
  markings?: [[number, number]],
  onClick?: any
}

const Maps: React.FC<MapProps> = (props) => {
  return (
    <Container>
      <Map
        center={props.center}
        zoom={props.zoom}
        onClick={props.onClick}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {props.markings ?
          props.markings
            .map((marker, index) =>
              (
                <Marker key={index} position={marker} />
              )
            ) : undefined
        }

      </Map>
    </Container>
  );
}

export default Maps;

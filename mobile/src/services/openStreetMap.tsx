import axios from 'axios';

const openStreetMap = axios.create({
  baseURL: 'https://nominatim.openstreetmap.org'
});

export interface Address {
  address: {
    city: string,
    state: string
  }
}

export default openStreetMap;

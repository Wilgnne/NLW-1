import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export interface ApiItem {
  id: number,
  title: string,
  image_url: string
}

export default api;

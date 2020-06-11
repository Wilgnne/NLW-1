import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:3333'
});

export interface ApiItem {
  id: number,
  title: string,
  image_url: string
}

export default api;

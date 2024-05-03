import axios from 'axios';
import {APP_API_URL} from '@env';

const baseURL = APP_API_URL;

const apiClient = axios.create({
  baseURL,
});

export default apiClient;
export {baseURL};

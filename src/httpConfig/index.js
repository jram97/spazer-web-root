import axios from 'axios';
import config from 'config/dbConfig.json';

const axiosInstance = axios.create({ baseURL: config.BASE_URL });

export default axiosInstance;

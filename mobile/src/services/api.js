import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.0.75.1:3333'
});

export default api;
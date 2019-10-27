import axios from 'axios';

const api = axios.create({
    baseURL: "https://aircnc-api.azurewebsites.net"
});

export default api;
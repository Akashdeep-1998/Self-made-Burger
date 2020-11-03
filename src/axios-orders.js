import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-burger-3d2e7.firebaseio.com/'
});

export default instance;
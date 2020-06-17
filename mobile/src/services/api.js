import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const api = axios.create({
    baseURL: 'http://192.168.0.25:3000',
})

api.interceptors.request.use(async function(config) {
    const token = await AsyncStorage.getItem('@access_token');
  
    if ( token != null ) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  
    return config;
  }, function(err) {
    return Promise.reject(err);
  });

export default api;
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.thecatapi.com/v1',
  headers: {
    'x-api-key': import.meta.env.VITE_API_KEY
  }
});



instance.interceptors.response.use(
  (response) => {
    return response;
  },
  handleApiError
);

export function handleApiError(error: any) {
    if (error.response) {       
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {        
      console.log(error.request);
    } else {        
      console.log('Error', error.message);
    }
    return Promise.reject(error);
  }

export default instance;
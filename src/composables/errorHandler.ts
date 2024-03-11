import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.thecatapi.com/v1",
  headers: {
    "x-api-key": import.meta.env.VITE_API_KEY,
  },
});

instance.interceptors.response.use((response) => {
  return response;
}, handleApiError);

interface ApiError {
  response?: {
    data: any;
    status: number;
    headers: any;
  };
  request?: any;
  message?: string;
}

export function handleApiError(error: ApiError) {
  if (error.response) {
    console.error(error.response.data);
    console.error(error.response.status);
    console.error(error.response.headers);
  } else if (error.request) {
    console.error(error.request);
  } else {
    console.error("Error", error.message);
  }
  return Promise.reject(error);
}

export default instance;

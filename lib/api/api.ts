import axios, { AxiosError } from 'axios';

export type ApiError = AxiosError<{
  error?: string;
  response?: {
    message?: string;
  };
}>;

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

const notehubApi = axios.create({
  baseURL,
  withCredentials: true,
});

export default notehubApi;

import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.HOST_API,
});

export const defaultReturn = (res: any) => {
  let response = {
    data: null,
    error_message: 'Something Wrong !!',
    status: res.response.status,
  };
  return response;
};

export default instance;

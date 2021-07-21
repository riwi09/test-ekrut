import axiosInstance, { defaultReturn } from './config';

export const postNewUser = async (param: any) => {
  try {
    const response = await axiosInstance.post(`/items/users`, param);
    let result = {
      data: response.data.data,
      error_message: response.statusText,
      status: response.status,
    };
    return result;
  } catch (error) {
    return defaultReturn(error);
  }
};

export const postNewEducation = async (param: any) => {
  try {
    const response = await axiosInstance.post(`/items/education`, param);
    let result = {
      data: response.data.data,
      error_message: response.statusText,
      status: response.status,
    };
    return result;
  } catch (error) {
    return defaultReturn(error);
  }
};

export const postNewExperience = async (param: any) => {
  try {
    const response = await axiosInstance.post(`/items/experience`, param);
    let result = {
      data: response.data.data,
      error_message: response.statusText,
      status: response.status,
    };
    return result;
  } catch (error) {
    return defaultReturn(error);
  }
};

import * as types from '@/redux/types';

export const setBasicInformation = (data: any) => async (dispatch: (arg0: { type: string; payload: any }) => void) => {
  dispatch({
    type: types.SET_INFORMATION_BASIC,
    payload: data,
  });
};

export const setEducationInformation =
  (data: any) => async (dispatch: (arg0: { type: string; payload: any }) => void) => {
    dispatch({
      type: types.SET_INFORMATION_EDUCATION,
      payload: data,
    });
  };

export const setExperienceInformation =
  (data: any) => async (dispatch: (arg0: { type: string; payload: any }) => void) => {
    dispatch({
      type: types.SET_INFORMATION_EXPERIENCE,
      payload: data,
    });
  };

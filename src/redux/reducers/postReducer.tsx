import * as types from '@/redux/types';

const initialState = {
  global_information_basic: {
    fullName: '',
    phoneNumber: '',
    email: '',
  },
  global_information_education: {
    data: [
      {
        id: 1,
        school: { label: 'School', name: 'school', type: 'text', value: '', require: true, error: '' },
        major: { label: 'Major', name: 'major', type: 'text', value: '', require: true, error: '' },
        start_date: { label: 'Start Date', name: 'start_date', type: 'date', value: '', require: true, error: '' },
        end_date: { label: 'End Date', name: 'end_date', type: 'date', value: '', require: true, error: '' },
      },
    ],
    status: false,
  },
  global_information_experience: {
    data: [
      {
        id: 1,
        company: { label: 'Company', name: 'company', type: 'text', value: '', require: true, error: '' },
        title: { label: 'Title', name: 'title', type: 'text', value: '', require: true, error: '' },
        start_date: { label: 'Start Date', name: 'start_date', type: 'date', value: '', require: true, error: '' },
        end_date: { label: 'End Date', name: 'end_date', type: 'date', value: '', require: true, error: '' },
      },
    ],
    status: false,
  },
};

export const postReducer = (state = initialState, action: { type: any; payload: any }) => {
  switch (action.type) {
    case types.SET_INFORMATION_BASIC: {
      return {
        ...state,
        global_information_basic: action.payload,
      };
    }

    case types.SET_INFORMATION_EDUCATION: {
      return {
        ...state,
        global_information_eductaion: action.payload,
      };
    }
    case types.SET_INFORMATION_EXPERIENCE: {
      return {
        ...state,
        global_information_experience: action.payload,
      };
    }

    default:
      return state;
  }
};

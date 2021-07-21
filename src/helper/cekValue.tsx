import { setEducationInformation, setExperienceInformation } from '@/redux/actions/postActions';

export const cekRequiredEducation = async (data: any, dispatch: any) => {
  const list = data.data;
  let isAvailable = true;
  await list.map((d: any, i: number) => {
    const jsData = Object.assign({}, list[i]);

    if (d.school.value === '') {
      jsData.school.error = 'error';
      isAvailable = false;
    } else {
      jsData.school.error = '';
    }

    if (d.major.value === '') {
      jsData.major.error = 'error';
      isAvailable = false;
    } else {
      jsData.major.error = '';
    }

    if (d.start_date.value === '') {
      jsData.start_date.error = 'error';
      isAvailable = false;
    } else {
      jsData.start_date.error = '';
    }

    if (d.end_date.value === '') {
      jsData.end_date.error = 'error';
      isAvailable = false;
    } else {
      jsData.end_date.error = '';
    }

    const dJson = Object.assign([], list);
    dJson[i] = jsData;
    dispatch(setEducationInformation({ data: dJson, status: false }));
  });

  return isAvailable;
};

export const cekRequiredExperience = async (data: any, dispatch: any) => {
  const list = data.data;
  let isAvailable = true;
  await list.map((d: any, i: number) => {
    const jsData = Object.assign({}, list[i]);

    if (d.company.value === '') {
      jsData.company.error = 'error';
      isAvailable = false;
    } else {
      jsData.company.error = '';
    }

    if (d.title.value === '') {
      jsData.title.error = 'error';
      isAvailable = false;
    } else {
      jsData.title.error = '';
    }

    if (d.start_date.value === '') {
      jsData.start_date.error = 'error';
      isAvailable = false;
    } else {
      jsData.start_date.error = '';
    }

    if (d.end_date.value === '') {
      jsData.end_date.error = 'error';
      isAvailable = false;
    } else {
      jsData.end_date.error = '';
    }

    const dJson = Object.assign([], list);
    dJson[i] = jsData;
    dispatch(setExperienceInformation({ data: dJson, status: false }));
  });

  return isAvailable;
};

export const cekRequired = (val: string) => {
  if (val === '') return false;
  return true;
};

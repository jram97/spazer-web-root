import axios from 'httpConfig';

export const createBann = bannInfo => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await axios.post('/bann/create', bannInfo, {
        headers: { 'access-token': localStorage.getItem('spazer_token') }
      });
      console.log('resultado', result.data);
      resolve({ data: result.data.bookings });
    } catch (error) {
      console.log('error', error);
      reject({ error });
    }
  });
};

export const getBannedUsersByBranchId = branchId => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await axios.get(`/bann/byBranchOffice/${branchId}`, {
        headers: { 'access-token': localStorage.getItem('spazer_token') }
      });
      console.log('resultado', result.data);
      resolve({ data: result.data.banns });
    } catch (error) {
      console.log('error', error);
      reject({ error });
    }
  });
};

export const removeBannByUserId = bannId => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await axios.delete(`/bann/delete/${bannId}`, {
        headers: { 'access-token': localStorage.getItem('spazer_token') }
      });
      console.log('resultado', result.data);
      resolve({ data: result.data.banns });
    } catch (error) {
      console.log('error', error);
      reject({ error });
    }
  });
};

import axios from 'httpConfig';

export const getSlotsByBranchId = branchId => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await axios.get(`/slot/byBranchOffice/${branchId}`, {
        headers: { 'access-token': localStorage.getItem('spazer_token') }
      });
      console.log('result', result);
      resolve({ data: result.data.slots });
    } catch (error) {
      reject({ error });
    }
  });
};

export const updateBranch = branchToUpdate => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await axios.put(`/branchOffice/update`, branchToUpdate, {
        headers: { 'access-token': localStorage.getItem('spazer_token') }
      });
      console.log('result', result);
      resolve({ data: result.data.slots });
    } catch (error) {
      reject({ error });
    }
  });
};

export const updateSlots = slotToUpdate => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await axios.put(`/slot/update`, slotToUpdate, {
        headers: { 'access-token': localStorage.getItem('spazer_token') }
      });
      console.log('result', result);
      resolve({ data: result.data.slots });
    } catch (error) {
      reject({ error });
    }
  });
};

export const getServicesByBranchId = branchId => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await axios.get(`/service/getByBranchOffice/${branchId}`, {
        headers: { 'access-token': localStorage.getItem('spazer_token') }
      });
      console.log('result', result);
      resolve({ data: result.data.services });
    } catch (error) {
      reject({ error });
    }
  });
};

export const getBranchById = branchId => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await axios.get(`/branchOffice/${branchId}`, {
        headers: { 'access-token': localStorage.getItem('spazer_token') }
      });
      console.log('result', result);
      resolve({ data: result.data.branchOffice });
    } catch (error) {
      reject({ error });
    }
  });
};

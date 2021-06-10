import axios from 'httpConfig';

export const requestRegisterCompany = data => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await axios.post('/request/create', data);
      console.log(result);

      resolve(result.data);
    } catch (error) {
      console.log('error ', error.response);
      reject({ errorMessage: error.response.data.msg });
    }
  });
};

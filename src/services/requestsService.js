import axios from 'httpConfig';

export const getAllRequests = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await axios.get('/request/getAll', {
        headers: {
          'access-token': localStorage.getItem('spazer_token')
        }
      });
      console.log(result);
      resolve({ data: result.data.requests });
    } catch (error) {
      console.log('error', error);
      reject({ error });
    }
  });
};

export const acceptRequest = requestId => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await axios.post(
        '/request/accept',
        { id: requestId },
        {
          headers: {
            'access-token': localStorage.getItem('spazer_token')
          }
        }
      );
      console.log(result);
      resolve({ data: result.data });
    } catch (error) {
      console.log('error', error);
      reject({ error: error.response.data });
    }
  });
};

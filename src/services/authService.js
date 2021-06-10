import axios from 'httpConfig';

export const login = data => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await axios.post('/auth/login', data, null);
      if (!result.data.status) {
        reject({ error: result.data.mensaje });
      }
      localStorage.setItem('spazer_user', JSON.stringify(result.data.usuario));
      localStorage.setItem('spazer_token', result.data.token);
      resolve({ data: result.data });
    } catch (error) {
      reject({ error: error.response.data });
    }
  });
};

export const emailValidator = text => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await axios.get('/user/verifyEmail/' + text);
      console.log('este es un resultado', result);
      resolve({ data: result.data });
    } catch (error) {
      console.log('error', error);
      reject({ error });
    }
  });
};

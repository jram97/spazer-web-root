import axios from 'httpConfig';

export const changePicture = data => {
  console.log('img data', data.id);
  return new Promise(async (resolve, reject) => {
    try {
      let result = await axios.post('/user/changePicture', data, {
        headers: {
          'access-token': localStorage.getItem('spazer_token')
        }
      });
      console.log(result.data);
      resolve(result.data);
    } catch (err) {
      reject(err);
    }
  });
};

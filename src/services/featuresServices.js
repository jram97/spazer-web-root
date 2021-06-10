import axios from 'httpConfig';

export const getFeatures = categoryId => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await axios.get(`/feature/getByCategory/${categoryId}`);
      console.log('resultado', result.data);

      resolve(result.data);
    } catch (error) {
      reject({ error: error });
      console.log(error);
    }
  });
};

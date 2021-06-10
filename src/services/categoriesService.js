import axios from 'httpConfig';
// import axios from 'axios';

export const getCategories = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const categories = await axios.get('/businesscategory/getAllActive');
      console.log('categorias', categories);

      resolve(categories.data);
    } catch (error) {
      console.log(error);
      reject({ error: error });
    }
  });
};

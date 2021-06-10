import axios from 'httpConfig';

export const getBookingsByMonth = data => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await axios.get(
        `/booking/getByMonth?year=${data.year}&idSucursal=${data.branchId}&month=${data.month}`,
        { headers: { 'access-token': localStorage.getItem('spazer_token') } }
      );
      console.log('resultado', result.data);
      resolve({ data: result.data.bookings });
    } catch (error) {
      console.log('error', error);
      reject({ error });
    }
  });
};

export const makeBooking = bookingData => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await axios.post('/booking/create', bookingData, {
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

export const getBookingsByBranch = branchId => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await axios.get(`/booking/getByBOHistory/${branchId}`, {
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

export const getAllBookings = branchId => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await axios.get(
        `/booking/getAllByBranchOffice/${branchId}`,
        {
          headers: { 'access-token': localStorage.getItem('spazer_token') }
        }
      );
      console.log('resultado', result.data);
      resolve({ data: result.data.reserves });
    } catch (error) {
      console.log('error', error);
      reject({ error });
    }
  });
};

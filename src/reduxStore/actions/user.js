import Constants, {
  ADD_RESERVE_DATA,
  REMOVE_RESERVE_DATA
} from 'common/constants';

export const addRegisterData = payload => ({
  type: Constants.ADD_DATA_REGISTER,
  payload
});

export const removeRegisterData = payload => ({
  type: Constants.REMOVE_DATA_REGISTER,
  payload
});

export const addReserveData = payload => ({
  type: ADD_RESERVE_DATA,
  payload
});

export const removeReserveData = payload => ({
  type: REMOVE_RESERVE_DATA,
  payload
});

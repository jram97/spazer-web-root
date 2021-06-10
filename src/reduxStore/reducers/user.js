import Constants, {
  ADD_RESERVE_DATA,
  REMOVE_RESERVE_DATA
} from 'common/constants';

const initialState = {
  registerData: {},
  reserveData: {}
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case Constants.ADD_DATA_REGISTER:
      return {
        ...state,
        registerData: { ...state.registerData, ...action.payload }
      };

    case Constants.REMOVE_DATA_REGISTER:
      return {
        ...state,
        registerData: {}
      };
    case ADD_RESERVE_DATA:
      console.log('valor redux', action.payload);
      return {
        ...state,
        reserveData: { ...state.reserveData, ...action.payload }
      };

    case REMOVE_RESERVE_DATA:
      return {
        ...state,
        reserveData: {}
      };
    default:
      return { ...state };
  }
}

export default userReducer;

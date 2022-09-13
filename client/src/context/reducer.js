import {
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
} from './actions';

const reducer = (state, action) => {
  switch (action.type) {
    default:
      throw new Error(`There is no action: ${action.type}`);
  }
};

export default reducer;

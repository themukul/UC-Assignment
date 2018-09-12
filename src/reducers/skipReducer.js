import * as Constants from '../actions/actionConstants';

export const skipReducer = (state = { count: 0 }, action) => {
  switch(action.type) {
    case Constants.INCREMENT_SKIP_ACTION:
      let newCount = state.count + 1;
      return ({
        count: newCount
      });    
    default:
      return state;
  }
}
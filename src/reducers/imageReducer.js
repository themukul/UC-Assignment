import * as Constants from '../actions/actionConstants';

export const imageReducer = (state = [], action) => {
  switch(action.type) {
    case Constants.GET_FETCHED_IMAGES:
      return ([
        ...state,
        ...action.payload
      ]);
    default:
      return state;    
  }
}
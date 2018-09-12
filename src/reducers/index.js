import { combineReducers } from "redux";
import { imageReducer } from './imageReducer';
import { skipReducer } from './skipReducer';

export const allReducers = combineReducers({
  imageReducer,
  skipReducer
});
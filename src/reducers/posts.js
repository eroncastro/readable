import { RECEIVE_DATA } from '../actions/shared';

export default function(state = [], action) {
  switch(action.type) {
    case RECEIVE_DATA:
      return [...state, ...action.posts];
    default:
      return state;
  }
};

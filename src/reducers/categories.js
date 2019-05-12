import { RECEIVE_DATA } from '../actions/shared';

export default function(state = [], action) {
  switch(action.type) {
    case RECEIVE_DATA:
      return [...state, ...Object.values(action.categories)];
    default:
      return state;
  }
};

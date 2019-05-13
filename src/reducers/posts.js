import { RECEIVE_DATA } from '../actions/shared';
import { ADD_POST } from '../actions/posts';

export default function(state = [], action) {
  switch(action.type) {
    case ADD_POST:
      return [...state, action.post];
    case RECEIVE_DATA:
      return [...state, ...action.posts];
    default:
      return state;
  }
};

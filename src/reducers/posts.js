import { RECEIVE_DATA } from '../actions/posts';

export default function(state = [], action) {
  switch(action.type) {
    case RECEIVE_DATA:
      return Object.assign({}, state, action.posts);
    default:
      return state;
  }
};

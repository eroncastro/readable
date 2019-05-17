import { RECEIVE_DATA } from '../actions/shared';
import {
  ADD_POST,
  DELETE_POST,
  EDIT_POST,
  DOWNVOTE_POST,
  UPVOTE_POST
} from '../actions/posts';

export default function(state = [], action) {
  switch(action.type) {
    case ADD_POST:
      return [...state, action.post];
    case DELETE_POST:
      return state.filter(post => post.id !== action.postId);
    case EDIT_POST:
      return state.reduce((prev, cur) => {
        const post = cur.id === action.post.id ? action.post : cur;
        return [...prev, post];
      }, []);
    case DOWNVOTE_POST:
      return state.reduce((prev, cur) => {
        const elem = cur.id === action.postId
          ? Object.assign({}, cur, { voteScore: cur.voteScore - 1 })
          : cur;
        return [...prev, elem];
      }, []);
    case UPVOTE_POST:
      return state.reduce((prev, cur) => {
        const elem = cur.id === action.postId
          ? Object.assign({}, cur, { voteScore: cur.voteScore + 1 })
          : cur;
        return [...prev, elem];
      }, []);
    case RECEIVE_DATA:
      return [...state, ...action.posts];
    default:
      return state;
  }
};

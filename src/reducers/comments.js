import { RECEIVE_DATA } from '../actions/shared';
import {
  ADD_COMMENT,
  DELETE_COMMENT,
  DELETE_POST_COMMENTS,
  UPDATE_COMMENT,
  DOWNVOTE_COMMENT,
  UPVOTE_COMMENT
} from '../actions/comments';

export default function(state = [], action) {
  switch(action.type) {
    case ADD_COMMENT:
      return [...state, action.comment];
    case DELETE_COMMENT:
      return state.filter(comment => comment.id !== action.commentId);
    case DELETE_POST_COMMENTS:
      return state.filter(comment => comment.parentId !== action.postId);
    case UPDATE_COMMENT:
      return state.reduce((prev, cur) => {
        const comment = cur.id === action.comment.id ? action.comment: cur;
        return [...prev, comment];
      }, []);
    case DOWNVOTE_COMMENT:
      return state.reduce((prev, cur) => {
        const elem = cur.id === action.commentId
          ? Object.assign({}, cur, { voteScore: cur.voteScore - 1 })
          : cur;
        return [...prev, elem];
      }, []);
    case UPVOTE_COMMENT:
      return state.reduce((prev, cur) => {
        const elem = cur.id === action.commentId
          ? Object.assign({}, cur, { voteScore: cur.voteScore + 1 })
          : cur;
        return [...prev, elem];
      }, []);
    case RECEIVE_DATA:
      return [...state, ...action.comments];
    default:
      return state;
  };
}

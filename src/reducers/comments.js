import { RECEIVE_DATA } from '../actions/shared';
import { DOWNVOTE_COMMENT, UPVOTE_COMMENT } from '../actions/comments';

export default function(state = [], action) {
  switch(action.type) {
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
};

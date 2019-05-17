import {
  handleVote,
  DOWNVOTE_OPTION,
  UPVOTE_OPTION
} from './shared';

export const ADD_COMMENT = 'ADD_COMMENT';
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT';
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT';

function addComment(comment) {
  return { type: ADD_COMMENT, comment };
}

function upvoteComment(commentId) {
  return { type: UPVOTE_COMMENT, commentId };
}

function downvoteComment(commentId) {
  return { type: DOWNVOTE_COMMENT, commentId };
}

function handleVoteComment(commentId, option, action, fallbackAction) {
  return handleVote(`comments/${commentId}`, option, action, fallbackAction)
}

export function handleAddComment(comment) {
  return dispatch => {
    return fetch('http://localhost:3001/comments', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment)
    })
    .then(response => response.json())
    .then(comment => dispatch(addComment(comment)))
    .catch(error => {
      console.log(error);
      alert('Failed to add new comment. Please, try again.');
    })
  };
};

export function handleUpvoteComment(commentId) {
  return handleVoteComment(
    commentId,
    UPVOTE_OPTION,
    upvoteComment(commentId),
    downvoteComment(commentId)
  );
};

export function handleDownvoteComment(commentId) {
  return handleVoteComment(
    commentId,
    DOWNVOTE_OPTION,
    downvoteComment(commentId),
    upvoteComment(commentId)
  );
};

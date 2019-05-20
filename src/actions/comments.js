import {
  createComment,
  updateComment,
  deleteComment
} from '../utils/api';
import {
  handleVote,
  DOWNVOTE_OPTION,
  UPVOTE_OPTION
} from './shared';

export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const DELETE_POST_COMMENTS = 'DELETE_POST_COMMENTS';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT';
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT';

function addComment(comment) {
  return { type: ADD_COMMENT, comment };
}

function removeComment(commentId) {
  return { type: DELETE_COMMENT, commentId };
}

export function removePostComments(postId) {
  return { type: DELETE_POST_COMMENTS, postId };
}

function editComment(comment) {
  return { type: UPDATE_COMMENT, comment };
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
    return createComment(comment)
      .then(comment => dispatch(addComment(comment)))
      .catch(error => {
        console.log(error);
        alert('Failed to add new comment. Please, try again.');
      })
  };
}

export function handleDeleteComment(comment) {
  return dispatch => {
    dispatch(removeComment(comment.id));

    return deleteComment(comment.id)
      .catch(error => {
        console.log(error);
        dispatch(addComment(comment));
        alert('Failed to delete comment. Please, try again.');
      })
  };
}

export function handleUpdateComment(comment) {
  return dispatch => {
    return updateComment(comment)
      .then(response => response.json())
      .then(comment => dispatch(editComment(comment)))
      .catch(error => {
        console.log(error);
        alert('Failed to update comment. Please, try again.')
      });
  };
}

export function handleUpvoteComment(commentId) {
  return handleVoteComment(
    commentId,
    UPVOTE_OPTION,
    upvoteComment(commentId),
    downvoteComment(commentId)
  );
}

export function handleDownvoteComment(commentId) {
  return handleVoteComment(
    commentId,
    DOWNVOTE_OPTION,
    downvoteComment(commentId),
    upvoteComment(commentId)
  );
}

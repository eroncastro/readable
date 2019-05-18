import {
  handleVote,
  DOWNVOTE_OPTION,
  UPVOTE_OPTION
} from './shared';
import {
  createPost,
  deletePost,
  updatePost
} from '../utils/api';

export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const EDIT_POST = 'EDIT_POST';
export const DOWNVOTE_POST = 'DOWNVOTE_POST';
export const UPVOTE_POST = 'UPVOTE_POST';

function addPost(post) {
  return { type: ADD_POST, post };
}

function removePost(post) {
  return { type: DELETE_POST, post };
}

function editPost(post) {
  return { type: EDIT_POST, post };
}

function upvotePost(postId) {
  return { type: UPVOTE_POST, postId };
}

function downvotePost(postId) {
  return { type: DOWNVOTE_POST, postId };
}

export function handleAddPost(post) {
  return dispatch => {
    return createPost(post)
      .then(response => response.json())
      .then(post => dispatch(addPost(post)))
      .catch(error => {
        console.log(error);
        alert('Failed to add new post. Please, try again.');
      });
  };
}

export function handleDeletePost(post) {
  return dispatch => {
    dispatch(removePost(post.id));

    return deletePost(post)
      .catch(error => {
        console.log(error);
        dispatch(addPost(post));
        alert('Failed to delete post. Please, try again.');
      });
  };
}

export function handleUpdatePost(post) {
  return dispatch => {
    return updatePost(post)
      .then(response => response.json())
      .then(post => dispatch(editPost(post)))
      .catch(error => {
        console.log(error);
        alert('Failed to delete post. Please, try again.');
      });
  };
}

function handleVotePost(postId, option, action, fallbackAction) {
  return handleVote(`posts/${postId}`, option, action, fallbackAction)
}

export function handleUpvotePost(postId) {
  return handleVotePost(
    postId,
    UPVOTE_OPTION,
    upvotePost(postId),
    downvotePost(postId)
  );
}

export function handleDownvotePost(postId) {
  return handleVotePost(
    postId,
    DOWNVOTE_OPTION,
    downvotePost(postId),
    upvotePost(postId)
  );
}

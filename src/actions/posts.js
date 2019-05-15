import {
  handleVote,
  DOWNVOTE_OPTION,
  UPVOTE_OPTION
} from './shared';

export const ADD_POST = 'ADD_POST';
export const DOWNVOTE_POST = 'DOWNVOTE_POST';
export const UPVOTE_POST = 'UPVOTE_POST';

function addPost(post) {
  return { type: ADD_POST, post };
};

function upvotePost(postId) {
  return { type: UPVOTE_POST, postId };
};

function downvotePost(postId) {
  return { type: DOWNVOTE_POST, postId };
};

export function handleAddPost(post) {
  return dispatch => {
    return fetch('http://localhost:3001/posts', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post)
    })
    .then(response => response.json())
    .then(post => dispatch(addPost(post)))
    .catch(error => {
      console.log(error);
      alert('Failed to add new post. Please, try again.');
    })
  };
};

function handleVotePost(postId, option, action, fallbackAction) {
  return handleVote(`posts/${postId}`, option, action, fallbackAction)
};

export function handleUpvotePost(postId) {
  return handleVotePost(
    postId,
    UPVOTE_OPTION,
    upvotePost(postId),
    downvotePost(postId)
  );
};

export function handleDownvotePost(postId) {
  return handleVotePost(
    postId,
    DOWNVOTE_OPTION,
    downvotePost(postId),
    upvotePost(postId)
  );
};

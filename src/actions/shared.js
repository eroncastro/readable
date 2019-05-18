import {
  getCategories,
  getPosts,
  getComments,
  updateVote
} from '../utils/api';

export const RECEIVE_DATA = 'RECEIVE_DATA';
export const DOWNVOTE_OPTION = 'downVote';
export const UPVOTE_OPTION = 'upVote';

function receiveData(categories, posts, comments) {
  return { type: RECEIVE_DATA, categories, posts, comments };
}

export function handleInitialData() {
  const getPostsAndComments = async () => {
    const posts = await getPosts();
    const comments = await getComments(posts);

    return [posts, comments];
  }

  return dispatch => {
    return Promise
      .all([
        getCategories(),
        getPostsAndComments()
      ])
      .then(([categories, [posts, comments]]) => {
        return dispatch(receiveData(categories, posts, comments));
      });
  };
}

export function handleVote(path, option, action, fallbackAction) {
  return dispatch => {
    dispatch(action);

    return updateVote(path, { option })
      .catch(error => {
        dispatch(fallbackAction);
        console.log(error);
        alert('Failed to vote. Please, try again.');
      });
  };
}

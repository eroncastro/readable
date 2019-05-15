export const RECEIVE_DATA = 'RECEIVE_DATA';
export const DOWNVOTE_OPTION = 'downVote';
export const UPVOTE_OPTION = 'upVote';

function receiveData(categories, posts, comments) {
  return { type: RECEIVE_DATA, categories, posts, comments };
}

export function handleInitialData() {
  const getCategories = () => {
    return fetch('http://localhost:3001/categories')
      .then(response => response.json())
      .then(({ categories }) => categories);
  };

  const getPostsAndComments = async () => {
    const posts = await fetch('http://localhost:3001/posts')
      .then(response => response.json());

    const comments = await Promise.all(
      posts
        .map(post => {
          return fetch(`http://localhost:3001/posts/${post.id}/comments`)
            .then(response => response.json());
        })
    )
    .then(comments => {
      return comments.reduce((prev, cur) => {
        return [...prev, ...cur]
      }, [])
    });

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
};

export function handleVote(path, option, action, fallbackAction) {
  return dispatch => {
    dispatch(action);

    return fetch(`http://localhost:3001/${path}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ option })
    })
    .catch(error => {
      dispatch(fallbackAction);
      console.log(error);
      alert('Failed to vote. Please, try again.');
    })
  };
};

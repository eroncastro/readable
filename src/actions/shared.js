export const RECEIVE_DATA = 'RECEIVE_DATA';

function receiveData(categories, posts, comments) {
  return { type: RECEIVE_DATA, categories, posts, comments };
}

export function handleInitialData() {
  const getCategories = () => {
    return fetch('http://localhost:3001/categories')
      .then(response => response.json())
      .then(({ categories }) => categories)
  }

  const getPosts = () => {
    return fetch('http://localhost:3001/posts')
      .then(response => response.json());
  }

  return dispatch => {
    return Promise
      .all([
        getCategories(),
        getPosts()
      ])
      .then(([categories, posts]) => {
        return dispatch(receiveData(categories, posts));
      });
  };
};
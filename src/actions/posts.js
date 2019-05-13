export const ADD_POST = 'ADD_POST';

export function addPost(post) {
  return { type: ADD_POST, post };
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

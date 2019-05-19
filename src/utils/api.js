const BASE_URL = 'http://localhost:3001';
const AUTH_TOKEN = 'yay-a-token!';

// Posts section
export function createPost(post) {
  return fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: AUTH_TOKEN
    },
    body: JSON.stringify(post)
  });
}

export function deletePost(postId) {
  return fetch(`http://localhost:3001/posts/${postId}`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      Authorization: AUTH_TOKEN
    }
  });
}

export function updatePost(post) {
  return fetch(`${BASE_URL}/posts/${post.id}`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: AUTH_TOKEN
    },
    body: JSON.stringify(post)
  });
}

// Comments section
export function createComment(comment) {
  return fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: AUTH_TOKEN
    },
    body: JSON.stringify(comment)
  })
  .then(response => response.json());
}

export function deleteComment(commentId) {
  return fetch(`${BASE_URL}/comments/${commentId}`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      Authorization: AUTH_TOKEN
    }
  });
}

export function updateComment(comment) {
  return fetch(`${BASE_URL}/comments/${comment.id}`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: AUTH_TOKEN
    },
    body: JSON.stringify(comment)
  });
}

// Shared section
export function getCategories() {
  return fetch(`${BASE_URL}/categories`, {
    headers: {
      Authorization: AUTH_TOKEN
    }
  })
  .then(response => response.json())
  .then(({ categories }) => categories);
}

export function getPosts() {
  return fetch(`${BASE_URL}/posts`, {
    headers: {
      Authorization: AUTH_TOKEN
    }
  })
  .then(response => response.json());
}

function getPostComments(postId) {
  return fetch(`${BASE_URL}/posts/${postId}/comments`, {
    headers: {
      Authorization: AUTH_TOKEN
    }
  })
  .then(response => response.json());
}

export function getComments(posts) {
  return Promise
    .all(posts.map(post => getPostComments(post.id)))
    .then(comments => {
      return comments.reduce((prev, cur) => {
        return [...prev, ...cur]
      }, [])
    });
}

export function updateVote(path, option) {
  return fetch(`http://localhost:3001/${path}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: AUTH_TOKEN
    },
    body: JSON.stringify(option)
  });
}

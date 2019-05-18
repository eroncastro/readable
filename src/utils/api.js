const BASE_URL = 'http://localhost:3001';

// Posts section
export function createPost(post) {
  return fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post)
  });
}

export function deletePost(postId) {
  return fetch(`http://localhost:3001/posts/${postId}`, {
    method: 'DELETE',
    mode: 'cors'
  });
}

export function updatePost(post) {
  return fetch(`${BASE_URL}/posts/${post.id}`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
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
    },
    body: JSON.stringify(comment)
  })
  .then(response => response.json());
}

export function deleteComment(commentId) {
  return fetch(`${BASE_URL}/comments/${commentId}`, {
    method: 'DELETE',
    mode: 'cors'
  });
}

export function updateComment() {}

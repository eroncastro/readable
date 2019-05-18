const BASE_URL = 'http://localhost:3001';

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

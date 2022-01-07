import http from "k6/http"

export const createPost = (title: string, body: string, userId: string) => {
  return http.post('https://jsonplaceholder.typicode.com/posts', JSON.stringify({
    title,
    body,
    userId,
  }), {
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
  })
}

export const getPost = (postId: string) => {
  return http.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
}

export const deletePost = (postId: string) => {
  return http.del(`https://jsonplaceholder.typicode.com/posts/${postId}`)
}
import http from 'k6/http'

export const getPostComments = (postId: string) => {
  return http.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
}
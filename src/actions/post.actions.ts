import http from 'k6/http'
import config from '../utils/config'

export const createPost = (title: string, body: string, userId: string) => {
  return http.post(`${config.jsonPlaceholderUrl}/posts`, JSON.stringify({
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
  return http.get(`${config.jsonPlaceholderUrl}/posts/${postId}`)
}

export const deletePost = (postId: string) => {
  return http.del(`${config.jsonPlaceholderUrl}/posts/${postId}`)
}
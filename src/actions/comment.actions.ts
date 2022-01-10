import http from 'k6/http'
import config from '../utils/config'

export const getPostComments = (postId: string) => {
  return http.get(`${config.jsonPlaceholderUrl}/posts/${postId}/comments`)
}
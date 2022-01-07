// A place to define the Setup and Teardown methods
import { check } from "k6";
import { createPost, deletePost } from "../actions/post.actions";

export const getPostId = (): { postId: string } => {
  // Create a new post
  const createPostResp = createPost('foo title', 'bar body', '1')

  // Assert the response
  check(createPostResp, {
    'createPostResp status is 201': () => createPostResp.status == 201,
  });

  // Extract value from response
  const postId = createPostResp.json('id') as string

  // Note that we are returning a data object since only this can be passed from a setup function to the default and the teardown function
  return { postId }
}

export const cleanupPost = (postId: string) => {
  // Delete the post
  const deletePostResp = deletePost(postId)

  // Assert the response
  check(deletePostResp, {
    'deletePostResp status is 200': () => deletePostResp.status == 200
  })
}
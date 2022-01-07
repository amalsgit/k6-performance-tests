import { check } from "k6";
import { Rate } from "k6/metrics";
import { Options } from "k6/options";
import { createPost, deletePost } from "../actions/post.actions";

// Custom metric keeping track of the percentage of failure of assertions
export const errorRate = new Rate('errors')

export let options: Options = {
  vus: 1,
  duration: '1s',
  thresholds: {
    // Custom error metric
    errors: [
      // There should be no check/assertion failure
      { threshold: 'rate==0.0' },
    ],
    // http_req_duration: ['p(95)<2000'], // 95% of the requests should be done within 2 seconds
    http_req_failed: ['rate==0.0'], // There should be no http request failures
  },
};

export default () => {
  // Create a new post
  const createPostResp = createPost('foo title', 'bar body', '1')

  // Assert the response
  const createPostRespCheck = check(createPostResp, {
    'createPostResp status is 201': () => createPostResp.status == 201,
  });

  // Add assertion failure for error rate calculation
  errorRate.add(!createPostRespCheck)

  // Extract value from response
  const postId = createPostResp.json('id') as string

  // Delete the post
  const deletePostResp = deletePost(postId)

  // Assert the response
  const deletePostRespCheck = check(deletePostResp, {
    'deletePostResp status is 200': () => deletePostResp.status == 200
  })

  // Add assertion failure for error rate calculation
  errorRate.add(!deletePostRespCheck)
};
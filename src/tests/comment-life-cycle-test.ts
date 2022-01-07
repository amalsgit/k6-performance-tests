import { check } from "k6";
import { Rate } from "k6/metrics";
import { Options } from "k6/options";
import { getPostComments } from "../actions/comment.actions";
import { cleanupPost, getPostId } from "../fixtures/post.fixture";

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

// Before all setup
export const setup = (): { postId: string } => {
  return getPostId()
}

// After all teardown. Note that variables from setup stage is passed via a data object
export const teardown = (data: {
  postId: string
}) => {
  cleanupPost(data.postId)
}

// Note that variables from setup stage is passed via a data object
export default (data: { postId: string }) => {
  // Get post comments
  const getCommentsResp = getPostComments(data.postId)

  // Assert the response
  const getCommentsRespCheck = check(getCommentsResp, {
    'createPostResp status is 200': () => getCommentsResp.status == 200,
  });

  // Add assertion failure for error rate calculation
  errorRate.add(!getCommentsRespCheck)
}
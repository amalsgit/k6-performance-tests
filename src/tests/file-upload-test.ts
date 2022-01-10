import { sleep, check } from 'k6'
import { Options } from 'k6/options'
import http, { StructuredRequestBody } from 'k6/http'

// Reading png file as a binary data
const binFile = open('test.png', 'b')

export const options: Options = {
  vus: 1,
  duration: '1s'
}

// Sample test showcasing file upload
export default (): void => {
  const postData: StructuredRequestBody = { file: http.file(binFile) }
  const response = http.post('https://httpbin.org/post', postData)

  check(response, {
    'status is 200': r => r.status === 200,
  })

  sleep(1)
}
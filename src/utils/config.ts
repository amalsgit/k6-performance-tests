// Place to manage application environments and urls
const config = {
  development: {
    jsonPlaceholderUrl: 'https://jsonplaceholder.typicode.com',
    httpBinUrl: 'https://httpbin.org',
  },
  production: {
    jsonPlaceholderUrl: 'https://jsonplaceholder.typicode.com',
    httpBinUrl: 'https://httpbin.org',
  },
}

// Resolve the test environment. Note that environment variables are read by k6 using the '__ENV' notation
const testEnv = __ENV.TEST_ENV || ('development' as keyof typeof config)

console.log(`Test will be run against ${testEnv} environment`)

export default config[testEnv]

# k6-performance-tests

A sample repo showcasing k6's capabilities for performance testing

## Prerequisites

- [k6](https://k6.io/docs/getting-started/installation)
- [NodeJS](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/getting-started/install)

## Installation

Clone the generated repository on your local machine, move to the project root folder and install the dependencies defined in [`package.json`](./package.json)

```bash
$ yarn
```

## Running the test

To run a test written in TypeScript, we first have to transpile the TypeScript code into JavaScript and bundle the project

```bash
$ yarn build
```

This command creates the final test files to the `./dist` folder.

Once that is done, we can run our script by running

```bash
$ k6 run dist/post-life-cycle-test.js
```

## Writing own tests

House rules for writing tests:

- The tests are located in `src/tests` folder
- The `fixtures` folder consist of methods to create and manage test data. These can be potentially use in `setup` and `teardown` methods.
- The `actions` folder consists of individual api calls that are composed together to create a user scenario in tests. Always define individual api calls here
- The entry points for the tests need to have "_test_" word in the name to distinguish them from auxiliary files. You can change the entry [here](./webpack.config.js#L8).
- If static files are required then add them to `./assets` folder. Its content gets copied to the destination folder (`dist`) along with compiled scripts.
- `utils/config.ts` file is the place to manage application environments and urls

### Transpiling and Bundling

By default, k6 can only run ES5.1 JavaScript code. To use TypeScript, we have to set up a bundler that converts TypeScript to JavaScript code.

This project uses `Babel` and `Webpack` to bundle the different files - using the configuration of the [`webpack.config.js`](./webpack.config.js) file.

If you want to learn more, check out [Bundling node modules in k6](https://k6.io/docs/using-k6/modules#bundling-node-modules).

## Grafana Setup

This setup is required only if you want to run k6 tests locally with result visualization in Grafana & InfluxDb.

You can use the docker-compose.yml file to bring up Grafana and InfluxDb before the performance tests to store the test results and for visualization.

Bring up influx and grafana:

```
yarn monitors:up
```

To bring down run:

```
yarn monitors:down
```

Go to http://localhost:3000 to access Grafana. A k6 dashboard will be automatically setup by default in Grafana. User will have to edit the panels once and update the data source to make sure that the correct database is selected for the dashboards to populate data.

## Advanced Execution Options

With k6 there are a variety of command line parameters that could be passed to run the tests with more flexibility

```bash
$ k6 run dist/post-life-cycle-test.js -i 1
```

The `-i 1` at the end of the above script defines the number of iterations and sets it to 1.

If you want to run the tests over a period of time for example `120 seconds` and for `5` concurrent virtual users, instead of `-1 1` add `-s 120s:5`. All these values can be set inside the `options` method of individual tests and then overridden during execution from the command line.

To run the performance tests along with result visualization bring up Grafana and InfluxDb first as described above and then add the below mentioned flag to the execution script.

```
--out influxdb=http://localhost:8086/k6
```

For example

```
k6 run dist/post-life-cycle-test.js --out influxdb=http://localhost:8086/k6
```

Add `--http-debug=full` flag to see the complete request response details to debug issues

## Pushing results to k6 cloud

If you have a cloud k6 account and would like to push your results there you need to get the `K6_CLOUD_TOKEN` value from your account and add the flag `--out cloud` to the execution command.

For example:

```
K6_CLOUD_TOKEN={TOKEN} k6 run dist/post-life-cycle-test.js --out cloud"

```

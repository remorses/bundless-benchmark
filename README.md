Comparisons of using webpack (via react-scripts) and [bundless](https://github.com/remorses/bundless) for a simple react application

Server ready and web page loaded (dev commands in package.json)

- Webpack: 18 seconds
- Bundless: 2.1 seconds

Production build (build commands in package.json)

- Webpack: 25 seconds
- Bundless: 0.9 seconds

Benchmarks in `benchmark.test.ts`

```
▇▇▇▇▇▇▇▇▇▇    [7.751 secs] - yarn vite --force
▇▇▇           [2.197 secs] - yarn bundless dev --force


▇▇▇▇▇▇▇▇▇▇    [0.624 secs] - yarn bundless dev
▇▇▇▇▇▇▇▇      [0.491 secs] - yarn vite


▇▇▇▇▇▇▇▇▇▇    [14.604 secs] - yarn vite build
▇             [1.140 secs] - yarn bundless build


▇▇▇▇▇▇▇▇▇▇    [1.545 secs] - yarn bundless dev --port 9070
▇▇▇▇▇▇▇▇      [1.252 secs] - yarn vite --port 9070
```
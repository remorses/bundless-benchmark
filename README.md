Comparisons of using webpack (via react-scripts) and [bundless](https://github.com/remorses/bundless) for a simple react application

Server ready and web page loaded (dev commands in package.json)

- Webpack: 18 seconds
- Bundless: 2.1 seconds

Production build (build commands in package.json)

- Webpack: 25 seconds
- Bundless: 0.9 seconds

Benchmarks in `benchmark.test.ts`

```
server ready (without any cache)

  ▇▇▇▇▇▇▇▇▇▇    [6.661 secs] - yarn vite --force
  ▇▇▇▇▇▇▇       [4.888 secs] - yarn cross-env BROWSER=none craco start
  ▇▇            [1.096 secs] - yarn bundless dev --force

server ready (with cache)

  ▇▇▇▇▇▇▇▇▇▇    [0.788 secs] - yarn bundless dev
  ▇▇▇▇▇         [0.362 secs] - yarn vite

static build

  ▇▇▇▇▇▇▇▇▇▇    [12.346 secs] - yarn vite build
  ▇▇▇▇▇▇▇       [8.701 secs] - yarn craco build
  ▇             [1.030 secs] - yarn bundless build

browser refresh

  ▇▇▇▇▇▇▇▇▇▇    [1.393 secs] - yarn bundless dev --port 9070
  ▇▇▇▇▇▇▇▇▇     [1.220 secs] - yarn vite --port 9070
  ▇▇▇▇▇▇▇▇      [1.142 secs] - yarn cross-env BROWSER=none PORT=9070 craco start
```
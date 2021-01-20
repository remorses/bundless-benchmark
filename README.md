Tools in benchmarks are

- [Bundless](https://github.com/remorses/bundless)
- [Vite](https://github.com/vitejs/vite)
- [Snowpack](https://github.com/snowpackjs/snowpack)
- [Craco (webpack)](https://github.com/webpack/webpack)


Benchmarks are in `benchmark.test.ts`

```
server ready (without any cache), less is better

  ▇▇▇▇▇▇▇▇▇▇              [15.030 secs] - yarn snowpack dev --reload
  ▇▇▇▇                    [6.446 secs] - yarn vite --force
  ▇▇▇                     [4.554 secs] - yarn cross-env BROWSER=none craco start
  ▇                       [1.419 secs] - yarn bundless dev --force

server ready (with cache), less is better

  ▇                       [0.447 secs] - yarn snowpack dev
  ▇                       [0.443 secs] - yarn bundless dev
  ▇                       [0.312 secs] - yarn vite

static build, less is better

  ▇▇▇▇▇▇▇▇▇               [14.037 secs] - yarn snowpack build
  ▇▇▇▇▇▇▇▇                [11.508 secs] - yarn vite build
  ▇▇▇▇▇▇                  [8.743 secs] - yarn craco build
  ▇                       [0.859 secs] - yarn bundless build

browser page refresh, less is better

  ▇                       [1.540 secs] - yarn vite --port 9070
  ▇                       [1.501 secs] - yarn bundless dev --port 9070
  ▇                       [1.354 secs] - yarn snowpack dev --port 9070
  ▇                       [1.130 secs] - yarn cross-env BROWSER=none PORT=9070 craco start

```

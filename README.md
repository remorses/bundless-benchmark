Tools in benchmarks are

- [Bundless](https://github.com/remorses/bundless)
- [Vite](https://github.com/vitejs/vite)
- [Snowpack](https://github.com/snowpackjs/snowpack)
- [Craco (webpack)](https://github.com/webpack/webpack)


Benchmarks are in `benchmark.test.ts`

```
server ready (without any cache)

  ▇▇▇▇▇▇▇▇▇▇    [14.650 secs] - yarn snowpack dev --reload
  ▇▇▇▇          [5.942 secs] - yarn vite --force
  ▇▇▇           [3.900 secs] - yarn cross-env BROWSER=none craco start
  ▇             [1.213 secs] - yarn bundless dev --force

server ready (with cache)

  ▇▇▇▇▇▇▇▇▇▇    [0.535 secs] - yarn bundless dev
  ▇▇▇▇▇▇▇▇▇     [0.482 secs] - yarn snowpack dev
  ▇▇▇▇▇▇        [0.333 secs] - yarn vite

static build

  ▇▇▇▇▇▇▇▇▇▇    [13.693 secs] - yarn snowpack build
  ▇▇▇▇▇▇▇▇▇     [12.109 secs] - yarn vite build
  ▇▇▇▇▇▇        [7.633 secs] - yarn craco build
  ▇             [0.878 secs] - yarn bundless build

browser page refresh

  ▇▇▇▇▇▇▇▇▇▇    [1.379 secs] - yarn bundless dev --port 9070
  ▇▇▇▇▇▇▇▇▇     [1.308 secs] - yarn vite --port 9070
  ▇▇▇▇▇▇▇▇▇     [1.233 secs] - yarn cross-env BROWSER=none PORT=9070 craco start
  ▇▇▇▇▇▇▇       [1.014 secs] - yarn snowpack dev --port 9070

```

Comparisons of using webpack (via react-scripts) and [bundless](https://github.com/remorses/bundless) for a simple react application

Server ready and web page loaded (dev commands in package.json)

- Webpack: 18 seconds
- Bundless: 2.1 seconds

Production build (build commands in package.json)

- Webpack: 25 seconds
- Bundless: 0.9 seconds

Benchmarks in `benchmark.test.ts`

'yarn bundless dev --force' completed in 1.30 seconds
'yarn vite --force' completed in 5.83 seconds

'yarn bundless dev' completed in 0.50 seconds
'yarn vite' completed in 0.34 seconds

'yarn bundless build' completed in 0.91 seconds
'yarn vite build' completed in 11.40 seconds

'yarn bundless dev --port 9070' page ready in 1.37 seconds
'yarn vite --port 9070' page ready in 1.20 seconds

import { execSync, exec, spawn } from "child_process"
import puppeteer from "puppeteer"
import { Browser } from "puppeteer/lib/cjs/puppeteer/common/Browser"
import { ansiChart } from "./utils"

jest.setTimeout(1000 * 100)

const SHOW_LOGS = process.env.SHOW_LOGS || false

describe("first run server ready", () => {
  const cases = [
    { command: `yarn bundless dev --force`, readyMessage: /Listening on/ },
    { command: `yarn vite --force`, readyMessage: /ready in \d+/ },
    { command: `yarn snowpack dev --reload`, readyMessage: /Server started/ },
    { command: `yarn cross-env BROWSER=none craco start`, readyMessage: /To create a production build/ },
  ]

  const results: Record<string, number> = {}
  afterAll(() => {
    log(`server ready (without any cache), less is better`)
    log(ansiChart(results))
  })

  for (let testCase of cases) {
    test(testCase.command, async () => {
      const completed = new Awaitable()
      const startTime = Date.now()
      const p = spawn(testCase.command, { stdio: "pipe", shell: true })
      function onData(data) {
        if (SHOW_LOGS) {
          log(data)
        }
        if (testCase.readyMessage.test(data)) {
          p.kill()
          const delta = Date.now() - startTime
          results[testCase.command] = delta
          completed.resolve()
        }
      }
      p.on("error", (e) => {
        completed.reject(e)
      })
      p.stdout.on("data", onData)
      p.stderr.on("data", onData)
      await completed.wait()
    })
  }
})

describe("second run server ready", () => {
  const cases = [
    { command: `yarn bundless dev`, readyMessage: /Listening on/ },
    { command: `yarn vite`, readyMessage: /ready in \d+/ },
    { command: `yarn snowpack dev`, readyMessage: /Server started/ },
  ]
  const results: Record<string, number> = {}
  afterAll(() => {
    log(`server ready (with cache), less is better`)
    log(ansiChart(results))
  })

  for (let testCase of cases) {
    test(testCase.command, async () => {
      const completed = new Awaitable()
      const startTime = Date.now()
      const p = spawn(testCase.command, { stdio: "pipe", shell: true })
      function onData(data) {
        if (SHOW_LOGS) {
          log(data)
        }
        if (testCase.readyMessage.test(data)) {
          p.kill()
          const delta = Date.now() - startTime
          results[testCase.command] = delta
          completed.resolve()
        }
      }
      p.on("error", (e) => {
        completed.reject(e)
      })
      p.stdout.on("data", onData)
      p.stderr.on("data", onData)
      await completed.wait()
    })
  }
})

describe("static build", () => {
  const cases = [
    { command: `yarn bundless build` },
    { command: `yarn vite build` },
    { command: `yarn craco build` },
    { command: `yarn snowpack build` },
  ]

  const results: Record<string, number> = {}
  afterAll(() => {
    log(`static build, less is better`)
    log(ansiChart(results))
  })

  for (let testCase of cases) {
    test(testCase.command, () => {
      const startTime = Date.now()
      execSync(testCase.command, { stdio: SHOW_LOGS ? "inherit" : "pipe" })
      const delta = Date.now() - startTime
      results[testCase.command] = delta
    })
  }
})

describe("page ready", () => {
  const PORT = 9070
  const cases = [
    { command: `yarn bundless dev --port ${PORT}`, readyMessage: /Listening on/ },
    { command: `yarn vite --port ${PORT}`, readyMessage: /ready in \d+/ },
    { command: `yarn snowpack dev --port ${PORT}`, readyMessage: /Server started/, path: "/snowpack" },
    { command: `yarn cross-env BROWSER=none PORT=${PORT} craco start`, readyMessage: /To create a production build/ },
  ]

  let browser: Browser
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false }) // TODO test does not work when headlesss is false, may be related to WebGl
  })

  afterAll(async () => {
    await browser.close()
  })

  const results: Record<string, number> = {}
  afterAll(() => {
    log(`browser page refresh, less is better`)
    log(ansiChart(results))
  })

  for (let testCase of cases) {
    test(testCase.command + " page ready", async () => {
      const p = spawn(testCase.command, { stdio: "pipe", shell: true })
      p.stdout.on("data", onData)
      p.stderr.on("data", onData)
      const ready = new Awaitable()
      function onData(data) {
        if (SHOW_LOGS) {
          log(data)
        }
        if (testCase.readyMessage.test(data)) {
          ready.resolve()
        }
      }
      p.on("error", (e) => {
        ready.reject(e)
        throw e
      })
      await ready.wait()
      const startTime = Date.now()

      const page = await browser.newPage()
      await page.goto(`http://localhost:${PORT}${testCase.path || "/"}`, { waitUntil: "networkidle2", timeout: 1000 * 10 }) // networkidle2 because websocket will alway be open
      const delta = Date.now() - startTime
      results[testCase.command] = delta
      await page.close()
      await p.kill()
    })
  }
})

class Awaitable {
  resolve: () => void
  reject: (e: Error) => void
  private promise: Promise<void>
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
  }
  async wait(): Promise<void> {
    await this.promise
    await new Promise((r) => setTimeout(r, 200))
  }
}

function log(m = "") {
  // jest will print log location otherwise
  process.stdout.write(m + "\n")
}

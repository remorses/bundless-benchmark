import { execSync, exec, spawn } from "child_process"

jest.setTimeout(1000 * 100)

const SHOW_LOGS = false

const messages: string[] = []

afterAll(() => {
  log()
  messages.forEach((m) => {
    log(m)
  })
  log()
})

describe("first run server ready", () => {
  const cases = [
    { command: `yarn bundless dev --force`, readyMessage: /listening on/ },
    { command: `yarn vite --force`, readyMessage: /ready in \d+/ },
    // { command: `yarn snowpack dev --reload`, readyMessage: /Vite dev server running at/ },
  ]

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
          messages.push(`'${testCase.command}' completed in  ${formatTime(delta)}`)
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
    { command: `yarn bundless dev`, readyMessage: /listening on/ },
    { command: `yarn vite`, readyMessage: /ready in \d+/ },
    // { command: `yarn snowpack dev --reload`, readyMessage: /Vite dev server running at/ },
  ]

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
          messages.push(`'${testCase.command}' completed in  ${formatTime(delta)}`)
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
    // { command: `yarn snowpack dev --reload`, readyMessage: /Vite dev server running at/ },
  ]

  for (let testCase of cases) {
    test(testCase.command, () => {
      const startTime = Date.now()
      execSync(testCase.command, { stdio: SHOW_LOGS ? "inherit" : "pipe" })
      const delta = Date.now() - startTime
      messages.push(`'${testCase.command}' completed in  ${formatTime(delta)}`)
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
  wait(): Promise<void> {
    return this.promise
  }
}

function formatTime(t: number) {
  return `${(t / 1000).toFixed(2)} seconds`
}

function log(m = "") {
  // jest will print log location otherwise
  process.stdout.write(m + "\n")
}

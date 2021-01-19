import { execSync, exec, spawn } from "child_process"

jest.setTimeout(1000 * 100)

const showLogs = false

describe("first time server ready", () => {
  const cases = [
    { command: `yarn bundless dev --force`, readyMessage: /listening on/ },
    { command: `yarn vite --force`, readyMessage: /ready in \d+/ },
    // { command: `yarn snowpack dev --reload`, readyMessage: /Vite dev server running at/ },
  ]

  const messages: string[] = []
  afterAll(() => {
    log()
    log(`RESULTS:`)
    messages.forEach((m) => {
      log(m)
    })
    log()
  })
  for (let testCase of cases) {
    test(testCase.command, async () => {
      const completed = new Awaitable()
      const startTime = Date.now()
      const p = spawn(testCase.command, { stdio: "pipe", shell: true })
      function onData(data) {
        if (showLogs) {
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

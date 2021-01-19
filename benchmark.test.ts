import { execSync, exec, spawn } from "child_process"

describe("server start", () => {
  test("bundless", async () => {
    const completed = new Awaitable()
    const startTime = Date.now()
    const p = spawn(`yarn bundless dev`, { stdio: "pipe", shell: true })
    function onData(data) {
      process.stdout.write(data + "\n")
      if (/listening on/.test(data)) {
        p.kill()
        const delta = Date.now() - startTime
        console.log(formatTime(delta))
        completed.resolve()
      }
    }
    p.stdout.on("data", onData)
    p.stderr.on("data", onData)
    await completed.wait()
  })
})

class Awaitable {
  resolve: () => void
  private promise: Promise<void>
  constructor() {
    this.promise = new Promise((resolve) => {
      this.resolve = resolve
    })
  }
  wait(): Promise<void> {
    return this.promise
  }
}

function formatTime(t: number) {
  return `Completed in ${(t / 1000).toFixed(2)} seconds`
}

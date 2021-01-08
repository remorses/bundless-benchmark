import React, { useState } from "react"
import ReactDOM from "react-dom"
import "./styles.css"
import App from "./App"

function Overlay() {
  const [ready, set] = useState(false)
  return (
    <>
      <App />
      {!ready && (
        <div className="overlay">
          <div>
            ← Click the dot to start
            <br />
            <span style={{ marginLeft: 18 }}>Needs fullscreen to work!</span>
          </div>
        </div>
      )}
      <div className="dot" style={{ pointerEvents: ready ? "none" : "all" }} onClick={() => set(true)} />
    </>
  )
}

// throw new Error('ei')

ReactDOM.render(<Overlay />, document.getElementById("root"))

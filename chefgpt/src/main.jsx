import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import "./UI/index.css"
import "./UI/App.css"

const root = createRoot(document.getElementById("root"))

root.render(
  <main className="app">
    <App />
  </main>
)
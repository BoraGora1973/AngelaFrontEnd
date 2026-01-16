import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [msg, setMsg] = useState("Loading...");

  useEffect(() => {
    const API_BASE = process.env.REACT_APP_API_BASE;

    fetch(`${API_BASE}/api/hello`)
      .then((r) => r.json())
      .then((d) => setMsg(d.message))
      .catch(() => setMsg("Error contacting server"));
  }, []);

  return (
    <div className="App">
      <h1>Angela Frontend</h1>
      <p>
        Backend says: <b>{msg}</b>
      </p>
    </div>
  );
}

export default App;

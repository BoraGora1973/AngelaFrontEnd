import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";


function App() {

  const API_BASE = process.env.REACT_APP_API_BASE;  
  const [msg, setMsg] = useState("טוען...");

  useEffect(() => {
    //fetch("/api/hello")
    fetch(`${API_BASE}/api/hello`)
      .then((r) => r.json())
      .then((d) => setMsg(d.message))   
      .catch(() => setMsg("שגיאה"));
  }, []);

  return (
    <div style={{ fontFamily: "system-ui", padding: 24 }}>
      <h1>CRA Frontend</h1>
      <p>השרת אומר: {msg}</p>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [msg, setMsg] = useState("Loading...");
  const [images, setImages] = useState([]);
  const [busy, setBusy] = useState(false);

  const uploadImage = async (file) => 
  {
    const form = new FormData();

    form.append("image", file);

    setBusy(true);

    try {
      const res = await fetch(`${API_BASE}/api/upload`, {
        method: "POST",
        body: form
      });

      const data = await res.json();
      if (!res.ok) 
      {
          throw new Error(data.error || "Upload failed");
      }

      setImages((prev) => [data, ...prev]);
    } 
    finally 
    {
      setBusy(false);
    }
  };

  useEffect(() => {
    const API_BASE = process.env.REACT_APP_API_BASE;

    if (!API_BASE) {
        setMsg("Missing REACT_APP_API_BASE in Vercel env");
        return;
    }
    
    fetch(`${API_BASE}/api/hello`)
      .then((r) => r.json())
      .then((d) => setMsg(d.message))
      .catch(() => setMsg("Error contacting server"));
  }, []);

  return (
    <div className="App">
      <div>
        <h1>Angela Moldova Shop ...</h1>
        <p>Message From Boris: <b>{msg}</b></p>
      </div>
      
     <div style={{ padding: 24, fontFamily: "Arial" }}>
      <h1>Angela Gallery</h1>

      <input
        type="file"
        accept="image/*"
        disabled={busy}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) uploadImage(f);
          e.target.value = "";
        }}
      />

      {busy && <p>Uploading...</p>}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: 12,
        marginTop: 20
      }}>
        {images.map((img) => (
          <div key={img.id} style={{ border: "1px solid #ddd", padding: 10 }}>
            <img src={img.url} alt="" style={{ width: "100%", height: 160, objectFit: "cover" }} />
            <a href={img.url} download style={{ display: "inline-block", marginTop: 8 }}>
              Download ...
            </a>
          </div>
        ))}
      </div>        
      </div>
      
    </div>
  );
}

export default App;

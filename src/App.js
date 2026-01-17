import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  // הגדרה נכונה של API_BASE
  const API_BASE = process.env.REACT_APP_API_BASE;
    
  const loadImages = async () => {
    setStatus("Loading gallery...");

    if (!API_BASE) return <div style={{ padding: 24 }}>Missing REACT_APP_API_BASE in Vercel</div>;

    try {
      const res = await fetch(`${API_BASE}/api/images`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load images");
      setImages(data.images || []);
      setStatus("");
    } catch (e) {
      setStatus("Failed to load gallery");
    }
  };

  useEffect(() => {
    loadImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!API_BASE) return <div style={{ padding: 24 }}>Missing REACT_APP_API_BASE in Vercel</div>;

  const uploadImage = async (file) => {
    const form = new FormData();
    form.append("image", file);

    setBusy(true);
    setStatus("Uploading...");
    try {
      const res = await fetch(`${API_BASE}/api/upload`, {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setImages((prev) => [data, ...prev]);
      setStatus("Uploaded ✅");
      setTimeout(() => setStatus(""), 1200);
    } catch (e) {
      setStatus("Upload failed");
    } finally {
      setBusy(false);
    }
  };

  return (
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

      <button style={{ marginLeft: 10 }} onClick={loadImages} disabled={busy}>
        Refresh
      </button>

      {status && <p>{status}</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 12,
          marginTop: 20,
        }}
      >
        {images.map((img) => (
          <div key={img.id} style={{ border: "1px solid #ddd", padding: 10 }}>
            <img
              src={img.url}
              alt=""
              style={{ width: "100%", height: 180, objectFit: "cover" }}
            />
            <div style={{ marginTop: 8 }}>
              <a href={img.url} download>
                Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

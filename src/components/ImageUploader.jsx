import { useState } from "react";

export default function ImageUploader() {
  const [src, setSrc] = useState(null);
  const [error, setError] = useState("");

  function onChange(e) {
    const file = e.target.files?.[0];
    setError("");
    setSrc(null);
    if (!file) return;

    // Validar tipo
    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError("El archivo debe ser una imagen (png, jpg, jpeg, gif, webp).");
      return;
    }

    // Validar tamaño 
    if (file.size > 5 * 1024 * 1024) {
      setError("La imagen no puede superar 5 MB.");
      return;
    }

    // Mostrar vista previa con File API
    const reader = new FileReader();
    reader.onload = () => setSrc(reader.result);
    reader.onerror = () => setError("No se pudo leer el archivo.");
    reader.readAsDataURL(file);
  }

  return (
    <div style={{ maxWidth: 420 }}>
      <label htmlFor="file">Subí una imagen:</label>
      <input id="file" type="file" accept="image/*" onChange={onChange} />
      {error && <p style={{ color: "crimson" }}>{error}</p>}
      {src && (
        <div style={{ marginTop: 12 }}>
          <img
            src={src}
            alt="preview"
            style={{ width: "100%", height: "auto", borderRadius: 12 }}
          />
        </div>
      )}
    </div>
  );
}

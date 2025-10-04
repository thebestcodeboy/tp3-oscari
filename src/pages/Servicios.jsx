const base = import.meta.env.BASE_URL;

const habitaciones = [
  { id: 1, nombre: "Suite Deluxe", precio: 120, descripcion: "Vista al cerro. Desayuno incluido.", imagen: base + "img/suite.jpg" },
  { id: 2, nombre: "Doble",        precio: 80,  descripcion: "Dos camas. Baño privado.",         imagen: base + "img/doble.jpg" },
  { id: 3, nombre: "Simple",       precio: 50,  descripcion: "Ideal 1 persona.",                  imagen: base + "img/simple.jpg" },
];

export default function Servicios() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Servicios</h1>
      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))" }}>
        {habitaciones.map(h => (
          <article key={h.id} style={{ border: "1px solid #ddd", borderRadius: 10, overflow: "hidden" }}>
            <img src={h.imagen} alt={h.nombre} style={{ width: "100%", height: 140, objectFit: "cover" }} />
            <div style={{ padding: 12 }}>
              <h2 style={{ margin: "0 0 6px" }}>{h.nombre}</h2>
              <p style={{ margin: "0 0 8px" }}>{h.descripcion}</p>
              <strong>${h.precio} / noche</strong>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

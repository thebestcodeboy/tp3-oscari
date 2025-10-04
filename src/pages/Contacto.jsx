import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contacto() {
  const formRef = useRef(null);
  const [status, setStatus] = useState({ loading: false, ok: null, msg: "" });

  const validate = (d) => {
    const e = {};
    if (!d.nombre || d.nombre.trim().length < 3) e.nombre = "Mínimo 3 caracteres.";
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(d.email || "")) e.email = "Correo inválido.";
    if (!d.mensaje || d.mensaje.trim().length < 10) e.mensaje = "Mínimo 10 caracteres.";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const fd = new FormData(formRef.current);
    const data = Object.fromEntries(fd.entries());
    const errs = validate(data);
    if (Object.keys(errs).length) {
      setStatus({ loading: false, ok: false, msg: Object.values(errs).join(" ") });
      return;
    }
    try {
      setStatus({ loading: true, ok: null, msg: "" });
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { from_name: data.nombre, reply_to: data.email, message: data.mensaje },
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      );
      setStatus({ loading: false, ok: true, msg: "Correo enviado" });
      formRef.current.reset();
      document.getElementById("ok-dialog")?.showModal();
    } catch {
      setStatus({ loading: false, ok: false, msg: "Error al enviar. Revisá configuración." });
    }
  };

  return (
    <main style={{ padding: 24 }}>
      <h1>Contacto</h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "start" }}>
        {/* Formulario */}
        <form ref={formRef} onSubmit={handleSubmit} noValidate>
          <label>Nombre</label>
          <input name="nombre" type="text" required minLength={3} style={{ width: "100%", marginBottom: 8 }} />
          <label>Dirección de Correo</label>
          <input name="email" type="email" required style={{ width: "100%", marginBottom: 8 }} />
          <label>Mensaje</label>
          <textarea name="mensaje" required rows={6} style={{ width: "100%", marginBottom: 12 }} />
          <button type="submit" disabled={status.loading}>{status.loading ? "Enviando..." : "Enviar"}</button>
          {status.msg && <p style={{ color: status.ok ? "green" : "crimson", marginTop: 8 }}>{status.msg}</p>}
        </form>

        {/* Mapa */}
        <iframe
          title="Ubicación"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3622.288765602676!2d-65.40095692541944!3d-24.78556370770454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225db05f7d7105%3A0xa470ec2a8d16b0cd!2sSheraton%20Salta%20Hotel!5e0!3m2!1ses!2sar!4v1759538937399!5m2!1ses!2sar"
          width="100%"
          height="420"
          style={{ border: 0, borderRadius: 8 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>

      <dialog id="ok-dialog">
        <p>Correo enviado correctamente.</p>
        <form method="dialog"><button>Aceptar</button></form>
      </dialog>
    </main>
  );
}

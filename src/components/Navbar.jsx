import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }) => ({
  padding: "8px 12px",
  textDecoration: "none",
  fontWeight: isActive ? 700 : 500,
});

export default function Navbar() {
  return (
    <nav style={{ display: "flex", gap: 12, padding: 16, borderBottom: "1px solid #ddd" }}>
      <NavLink to="/" style={linkStyle}>Inicio</NavLink>
      <NavLink to="/contacto" style={linkStyle}>Contacto</NavLink>
    </nav>
  );
}

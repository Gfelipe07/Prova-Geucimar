import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Pacientes</NavLink>
        </li>
        <li>
          <NavLink to="/medicamentos">Medicamentos</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;

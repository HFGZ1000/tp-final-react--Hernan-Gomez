import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <h1>Pokédex App</h1>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/pokemon">Pokémon</Link>
      </nav>
    </header>
  );
};

export default Header;

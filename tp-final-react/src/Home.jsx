import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <h2>Bienvenido a la PokéDex </h2>
        <p>Una aplicación minimalista para explorar el mundo Pokémon</p>
        <p>Descubre información básica de tus Pokémon favoritos</p>
        <img
          className="hero-image"
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
          alt="Pikachu"
        />
        <Link to="/pokemon" className="btn">
          Comenzar Exploración
        </Link>
      </section>
      <section className="features">
        <div className="feature">
          <h3>📋 Lista Completa</h3>
          <p>Ve todos los Pokémon disponibles</p>
        </div>
        <div className="feature">
          <h3>🔍 Detalles</h3>
          <p>Información específica de cada Pokémon</p>
        </div>
        <div className="feature">
          <h3>📱 Responsive</h3>
          <p>Funciona en cualquier dispositivo</p>
        </div>
      </section>
    </div>
  );
};

export default Home;

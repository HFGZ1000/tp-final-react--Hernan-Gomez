import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <h2>¡Bienvenido Entrenador!</h2>
      <p>Esta es tu Pokédex personal</p>

      <Link to="/pokemon" className="btn">
        Empezar a Explorar
      </Link>
    </div>
  );
};

export default Home;

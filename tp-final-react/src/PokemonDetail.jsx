import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const PokemonDetail = () => {
  const { id } = useParams();

  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

        if (!response.ok) {
          throw new Error("Pokémon no encontrado");
        }

        const data = await response.json();
        setPokemon(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  if (loading) {
    return (
      <div className="pokemon-detail">
        <h2>Cargando Pokémon #{id}...</h2>
        <p>🔄 Obteniendo información detallada</p>
        <Link to="/pokemon" className="btn">
          Volver a la Lista
        </Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pokemon-detail">
        <h2>Error</h2>
        <p>❌ {error}</p>
        <Link to="/pokemon" className="btn">
          Volver a la Lista
        </Link>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="pokemon-detail">
        <h2>Pokémon no encontrado</h2>
        <Link to="/pokemon" className="btn">
          Volver a la Lista
        </Link>
      </div>
    );
  }

  return (
    <div className="pokemon-detail">
      <Link to="/pokemon" className="btn back-btn">
        ← Volver a la Lista
      </Link>

      <div className="detail-header">
        <div className="detail-header-content">
          <h1>{pokemon.name}</h1>
          <span className="pokemon-number">
            #{pokemon.id.toString().padStart(3, "0")}
          </span>
        </div>

        <img src="/public/Pokeball2.png" alt="Pokeball" />
      </div>

      <div className="detail-content">
        <div className="image-section">
          <img
            src={
              pokemon.sprites.other["official-artwork"].front_default ||
              pokemon.sprites.front_default
            }
            alt={pokemon.name}
          />
        </div>

        <div className="info-section">
          <div className="types">
            <h3>Tipos:</h3>
            <div className="types-container">
              {pokemon.types.map((typeInfo, index) => (
                <span key={index} className={`type type-${typeInfo.type.name}`}>
                  {typeInfo.type.name}
                </span>
              ))}
            </div>
          </div>

          <div className="stats">
            <h3>Estadísticas:</h3>
            <div className="stats-grid">
              {pokemon.stats.map((stat, index) => (
                <div key={index} className="stat">
                  <span className="stat-name">{stat.stat.name}:</span>
                  <span className="stat-value">{stat.base_stat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="characteristics">
            <h3>Características:</h3>
            <p>
              <strong>Altura:</strong> {(pokemon.height / 10).toFixed(1)} m
            </p>
            <p>
              <strong>Peso:</strong> {(pokemon.weight / 10).toFixed(1)} kg
            </p>
            <p>
              <strong>Experiencia Base:</strong>{" "}
              {pokemon.base_experience || "N/A"}
            </p>
          </div>

          <div className="abilities">
            <h3>Habilidades:</h3>
            <div className="abilities-container">
              {pokemon.abilities.map((ability, index) => (
                <span key={index} className="ability">
                  {ability.ability.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;

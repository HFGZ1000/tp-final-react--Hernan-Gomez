import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);

  const getPokemonIdFromUrl = (url) => {
    const urlParts = url.split("/");

    return urlParts[6];
  };

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=20"
        );

        if (!response.ok) throw new Error("Error al cargar los Pokémon");

        const data = await response.json();
        setPokemons(data.results);
        setNextUrl(data.next);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  const loadMorePokemons = async () => {
    if (!nextUrl) return;

    try {
      setLoadingMore(true);

      const response = await fetch(nextUrl);
      if (!response.ok) throw new Error("Error al cargar más Pokémon");

      const data = await response.json();

      setPokemons((prevPokemons) => [...prevPokemons, ...data.results]);
      setNextUrl(data.next);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingMore(false);
    }
  };

  if (loading) {
    return (
      <div className="pokemon-list">
        <h2>Cargando Pokémon...</h2>
        <p>🔄 Obteniendo datos de la PokéAPI</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pokemon-list">
        <h2>Error</h2>
        <p>❌ {error}</p>
        <Link to="/" className="btn">
          Volver al Inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="pokemon-list">
      <h2>Lista de Pokémon</h2>
      <p className="pokemon-count">Mostrando {pokemons.length} Pokémon</p>

      <div className="pokemon-grid">
        {pokemons.map((pokemon) => {
          const pokemonId = getPokemonIdFromUrl(pokemon.url);

          return (
            <Link
              key={pokemon.name}
              to={`/pokemon/${pokemonId}`}
              className="pokemon-card"
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
                alt={pokemon.name}
                onError={(e) => {
                  e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
                }}
              />
              <h3>{pokemon.name}</h3>
              <span>#{pokemonId.toString().padStart(3, "0")}</span>
            </Link>
          );
        })}
      </div>

      {nextUrl && (
        <div className="load-more-container">
          <button
            onClick={loadMorePokemons}
            className="load-more-btn"
            disabled={loadingMore}
          >
            {loadingMore ? "🔄 Cargando..." : "⬇️ Cargar más Pokémon"}
          </button>
        </div>
      )}

      {!nextUrl && pokemons.length > 0 && (
        <div className="no-more-pokemon">
          <p>🎉 ¡Has visto todos los Pokémon disponibles!</p>
        </div>
      )}

      <Link to="/" className="btn">
        Volver al Inicio
      </Link>
    </div>
  );
};

export default PokemonList;

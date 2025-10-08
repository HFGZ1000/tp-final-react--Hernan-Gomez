import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Header />
        <div className="app">
          {/* Las rutas definen qué se muestra según la URL */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokemon" element={<PokemonList />} />
            <Route path="/pokemon/:id" element={<PokemonDetail />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;

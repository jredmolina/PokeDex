import { useEffect, useState } from "react";
import "./App.css";
import PokemonGraph from "./Components/pokemonGraph";
import PokemonInfo from "./Components/pokemonInfo";

function App() {
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [weightFilter, setWeightFilter] = useState("");

  useEffect(() => {
    const fetchAllPokemonData = async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=150&offset=0"
      );
      const json = await response.json();
      setList(json);
    };
    fetchAllPokemonData().catch(console.error);
  }, []);

  const handleTypeSelectChange = (event) => {
    setTypeFilter(event.target.value);
  };

  const handleWeightSelectChange = (event) => {
    setWeightFilter(event.target.value);
  };

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    let filteredData = list.results;
    if (searchValue !== "") {
      filteredData = filteredData.filter((item) =>
        Object.values(item.name)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
    }

    setFilteredResults(filteredData);
  };

  // useEffect(()=>{
  //   (if typeFilter != ""{

  //   })
  // },[typeFilter])

  return (
    <div className="whole-page">
      <h1>My Poke-Dex</h1>
      <PokemonGraph />
      <div className="page-list">
        <input
          type="text"
          placeholder="Search..."
          onChange={(inputString) => searchItems(inputString.target.value)}
        />
        <select
          id="typeOptions"
          value={typeFilter}
          onChange={handleTypeSelectChange}
        >
          <option value="">Select a type</option>
          <option value="bug">Bug</option>
          <option value="dragon">Dragon</option>
          <option value="electric">Electric</option>
          <option value="fighting">Fighting</option>
          <option value="fire">Fire</option>
          <option value="flying">Flying</option>
          <option value="ghost">Ghost</option>
          <option value="grass">Grass</option>
          <option value="ground">Ground</option>
          <option value="ice">Ice</option>
          <option value="normal">Normal</option>
          <option value="poison">Poison</option>
          <option value="psychic">Psychic</option>
          <option value="rock">Rock</option>
          <option value="water">Water</option>
        </select>
        <select
          id="weightOptions"
          value={weightFilter}
          onChange={handleWeightSelectChange}
        >
          <option value="">Select a Weight Class </option>
          <option value="light">Light</option>
          <option value="medium">Medium</option>
          <option value="heavy">Heavy</option>
        </select>
        <ul>
          {searchInput.length > 0
            ? filteredResults.map((pokemon) => (
                <PokemonInfo name={pokemon.name} url={pokemon.url} />
              ))
            : list &&
              list.results.map((pokemon) => (
                <PokemonInfo name={pokemon.name} url={pokemon.url} />
              ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

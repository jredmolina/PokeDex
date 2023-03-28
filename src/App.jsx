import { useEffect, useState } from "react";
import "./App.css";
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

  const handleWeightClassChange = (event) => {
    setWeightFilter(event.target.value);
    filterPokemon();
  };

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);

    if (searchValue !== "") {
      const filteredData = list.results.filter((item) =>
        Object.values(item.name)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(list.results);
    }
  };

  const filterPokemon = () => {
    if (weightFilter !== "") {
      const filteredData = list.results.filter((item) => {
        let weight = 55;

        // Fetch weight from the Pokemon API
        fetch(item.url)
          .then((response) => response.json())
          .then((json) => {
            weight = json.weight;
          })
          .catch((error) => console.error(error));

        switch (weightFilter) {
          case "light":
            console.log(weight);
            return weight < 100;
          case "medium":
            return weight >= 100 && weight <= 500;
          case "heavy":
            return weight > 500;
          default:
            return true;
        }
      });
      setFilteredResults(filteredData);
    } else {
    }
  };

  useEffect(() => {
    filterPokemon();
  }, [typeFilter, weightFilter, list]);

  return (
    <div className="whole-page">
      <h1>My Poke-Dex</h1>
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
        onChange={handleWeightClassChange}
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
  );
}

export default App;

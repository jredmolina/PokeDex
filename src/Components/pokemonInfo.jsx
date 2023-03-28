import { useState } from "react";
import { useEffect } from "react";

const PokemonInfo = ({ name, url }) => {
  const [pokemon, setPokemon] = useState(null);
  const [types, setTypes] = useState(null);
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [weightClass, setWeightClass] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      const response = await fetch(url);
      const json = await response.json();
      setPokemon(json);
      const typesArray = json.types.map((typeData) => typeData.type.name + " ");
      setTypes(typesArray);
      setHeight(json.height);
      setWeight(json.weight);
    };
    fetchPokemonData().catch(console.error);
  }, [url]);

  //   useEffect(() => {
  //     setWeightClass((weight) => {
  //       if (weight <= 0 && weight >= 99) {
  //         return "light";
  //       } else if (weight > 99 && weight <= 507) {
  //         return "medium";
  //       } else if (weight > 507 && weight <= 2204) {
  //         return "heavy";
  //       }
  //     });
  //   }, [weight]);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div>
      {pokemon ? (
        <div>
          <li className="main-list" key={name}>
            <img
              className="icons"
              src={pokemon.sprites.front_default}
              alt={`Small icon for ${name} pokemon`}
            />
            <h2 className="pokemon-name">{capitalizeFirstLetter(name)}</h2>
            <div className="pokemon-text">
              <div className="type-box">
                <h4>Type(s):</h4>
                {types.map((type) => (
                  <p> {capitalizeFirstLetter(type)} </p>
                ))}
              </div>
              <div className="height-box">
                <h4> Height (m):</h4>
                <p>{height} </p>
              </div>
              <div>
                <h4> Weight (kg):</h4>
                <p>{weight} </p>
              </div>
            </div>
          </li>
          <hr></hr>
        </div>
      ) : null}
    </div>
  );
};

export default PokemonInfo;

import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const PokemonDetail = () => {
  let params = useParams();
  const [fullDetails, setFullDetails] = useState(null);

  useEffect(() => {
    const getPokemonDetail = async () => {
      const details = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${params.name}`
      );
      const detailsJson = await details.json();

      setFullDetails(detailsJson);
    };
    getPokemonDetail().catch(console.error);
  }, []);

  return (
    <div>
      {fullDetails ? (
        <div className="details-page">
          <h1>{capitalizeFirstLetter(fullDetails.name)}</h1>
          <img
            className="large-icon"
            src={fullDetails?.sprites.front_default}
            alt={`Small icon for ${name} pokemon`}
          />

          <table>
            <tbody>
              <tr>
                <th>Name </th>
                <td>{capitalizeFirstLetter(fullDetails.name)} </td>
              </tr>
              <tr>
                <th>Weight </th>
                <td>{fullDetails.weight} </td>
              </tr>
              <tr>
                <th>Height </th>
                <td>{fullDetails.height} </td>
              </tr>
              <tr>
                <th>Abilities </th>
                <td>
                  {" "}
                  {fullDetails.abilities
                    .map((ability) => ability.ability.name)
                    .join(", ")}
                </td>
              </tr>
              <tr>
                <th>Types </th>
                <td>
                  {" "}
                  {fullDetails.types
                    .map((type) => type.type.name)
                    .join(", ")}{" "}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default PokemonDetail;

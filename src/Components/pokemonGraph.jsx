import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useState } from "react";
import { useEffect } from "react";
const PokemonGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const limit = 150;
      const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;
      const response = await fetch(url);
      const json = await response.json();
      const types = await Promise.all(
        json.results.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          const json = await response.json();
          const array = json.types.map((type) => type.type.name);
          return array.flat();
        })
      );

      const typesCount = types.flat().reduce((count, type) => {
        count[type] = (count[type] || 0) + 1;
        return count;
      }, {});

      const chartData = Object.entries(typesCount).map(([type, Count]) => ({
        type,
        Count,
      }));
      setData(chartData);
    };
    fetchData();
  }, []);

  return (
    <div>
      <BarChart width={1200} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="type" />
        <YAxis></YAxis>
        <Tooltip></Tooltip>
        <Legend />
        <Bar dataKey="Count" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default PokemonGraph;

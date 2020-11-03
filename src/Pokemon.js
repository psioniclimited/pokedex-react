import React, { useState } from "react";
import mockData from "./mockData";
import { Typography } from "@material-ui/core";
import { toFirstCharUpperCase } from "./constants";
import { Link } from "react-router-dom";

export const Pokemon = (props) => {
  const { match } = props;
  const { params } = match;
  const { pokemonId } = params;
  console.log(props);

  const [pokemon, setPokemon] = useState(mockData[`${pokemonId}`]);
  const generatePokemon = () => {
    const { name, id, species, height, weight, types, sprites } = pokemon;
    const imageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;

    return (
      <>
        <Typography variant="h1">
          {`${id}.`} {`${toFirstCharUpperCase(name)}`}
          <img src={front_default} />
        </Typography>
        <img style={{ width: "300px", height: "300px" }} src={imageUrl} />
        <Typography variant="h3"> Pokemon Info</Typography>
        <Typography>
          {"Species: "}
          <Link href={species.url}>{species.name}</Link>
        </Typography>
        <Typography>Height: {height}</Typography>
        <Typography>Weight: {weight}</Typography>
        <Typography variant="h6">Types</Typography>
        {types.map((typeInfo) => {
          const { type } = typeInfo;
          const { name } = type;
          return <Typography key={name}>{`${name}`}</Typography>;
        })}
      </>
    );
  };
  return <div>{generatePokemon()}</div>;
};

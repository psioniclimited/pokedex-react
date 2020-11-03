import React, { useEffect, useState } from "react";
import mockData from "./mockData";
import { Button, CircularProgress, Typography } from "@material-ui/core";
import { toFirstCharUpperCase } from "./constants";
import { Link } from "react-router-dom";
import axios from 'axios';

export const Pokemon = (props) => {
  const { history, match } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(undefined);

  // useEffect
  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
    .then(function (response) {
      const {data} = response;
      setPokemon(data);
    })
    .catch(function (error){
      setPokemon(false);
    })
  }, [pokemonId]);

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
  return (
    <>
    {pokemon === undefined && <CircularProgress />}
    {pokemon !== undefined && pokemon && generatePokemon() }
    {pokemon === false && <Typography>Pokemon Not Found</Typography>}
    {pokemon !== undefined && (
      <Button variant="contained" color="secondary" onClick={()=>history.push('/')}>
        Back to Pokedex
      </Button>
    )}
    </>
  );
};

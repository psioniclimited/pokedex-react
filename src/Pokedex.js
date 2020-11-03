import React, { useState, useEffect } from "react";
import {
  AppBar,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { fade, makeStyles } from "@material-ui/core/styles";
import { toFirstCharUpperCase } from "./constants";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  pokedexCOntainer: {
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "50px",
  },
  cardMedia: {
    margin: "auto",
  },
  searchContainer: {
    display: "flex",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    paddingLeft: "20px",
    paddingRight: "20px",
    marginTop: "5px",
    marginBottom: "5px",
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "5px",
  },
  searchInput: {
    width: "200px",
    margin: "5px",
  },
}));

export const Pokedex = (props) => {
  const { history } = props;
  const classes = useStyles();
  const [pokemonData, setPokemonData] = useState();
  const [filter, setFilter] = useState("");

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=807`)
      .then(function (response) {
        const { data } = response;
        const { results } = data;
        const newPokemonData = {};
        results.forEach((pokemon, index) => {
          newPokemonData[index + 1] = {
            id: index + 1,
            name: pokemon.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              index + 1
            }.png`,
          };
        });
        setPokemonData(newPokemonData);
      });
  }, []);

  // Get Pokemon Card
  const getPokemonCard = (pokemonId) => {
    console.log(pokemonData[`${pokemonId}`]);
    const { id, name, sprite } = pokemonData[pokemonId];

    return (
      <Grid item xs={12} sm={4} key={pokemonId}>
        <Card onClick={() => history.push(`/${pokemonId}`)}>
          <CardMedia
            className={classes.cardMedia}
            image={sprite}
            style={{ width: "130px", height: "130px" }}
          />
          <CardContent>
            <Typography> {`${id}. ${toFirstCharUpperCase(name)}`} </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.searchContainer}>
            <SearchIcon className={classes.searchIcon} />
            <TextField
              onChange={handleSearchChange}
              className={classes.searchInput}
              variant="standard"
              label="Pokemon"
            />
          </div>
        </Toolbar>
      </AppBar>
      {pokemonData ? (
        <Grid container spacing={2} className={classes.pokedexCOntainer}>
          {Object.keys(pokemonData).map(
            (pokemonId) =>
              pokemonData[pokemonId].name.includes(filter) &&
              getPokemonCard(pokemonId)
          )}
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

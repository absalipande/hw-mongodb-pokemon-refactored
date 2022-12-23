import mongoose from 'mongoose';
import express from 'express';
import errors from './middleware/genErrors.js';
import pokemonModelSchema from './model/Pokemon.js';

mongoose.connect('mongodb://localhost:27017/pokemon');

const app = express();
const port = 3070;
app.use(express.json());

app.get('/pokemon', async (req, res) => {
  const { limit, offset } = req.query;

  const pageLimit = limit || 20;
  const pageOffset = offset || 0;

  const results = await pokemonModelSchema.aggregate([
    { $skip: pageOffset },
    { $limit: pageLimit },
  ]);
  return res.json(results);
});

app.get('/pokemon/search', async (req, res) => {
  const { name, type } = req.query;

  if (name) {
    const pokemonName =
      name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
    const resPokemonName = await pokemonModelSchema.find({ name: pokemonName });
    return res.json(resPokemonName);
  }

  if (type) {
    const pokemonType =
      type.charAt(0).toUpperCase() + type.substring(1).toLowerCase();
    const resPokemonType = await pokemonModelSchema.find({ type: pokemonType });
    return res.json(resPokemonType);
  }
});

app.get('/pokemon/:name', async (req, res) => {
  const { name } = req.params;

  const pokemonName =
    name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
  const resPokemonName = await pokemonModelSchema.find({ name: pokemonName });
  return res.json(resPokemonName);
});

app.use(errors, (req, res) => {
  return res.status(404).json({
    error: 'We cannot find the page you are looking for',
  });
});

app.listen(port, () => {
  console.log(`Server is up and running on Port: ${port}`);
});

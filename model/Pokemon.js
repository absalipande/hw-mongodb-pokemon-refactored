import mongoose from 'mongoose';

const Pokemon = new mongoose.Schema({
  name: {
    type: String,
  },
  type: {
    type: Array,
  },
});

const pokemonModelSchema = mongoose.model('pokemon_data', Pokemon);
export default pokemonModelSchema;

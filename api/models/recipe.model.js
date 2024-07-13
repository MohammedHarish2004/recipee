import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    ingredients: {
      type: String,
      required: true
    },
    instructions: {
      type: String,
      required: true
    },
    cooking_time: {
      type: Number,
      required: true
    },
    preparation_time: {
      type: Number,
      required: true
    },
    total_time: {
      type: Number,
      required: true
    },
    servings: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    cuisine: {
      type: String,
      required: true
    },
    level: {
      type: String,
      required: true
    },
    tags: {
      type: Array,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  },{timestamps:true});
  
const Recipe = mongoose.model('Recipe', recipeSchema);
export default Recipe;
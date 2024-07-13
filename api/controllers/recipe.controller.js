import Recipe from "../models/recipe.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  try {
      let imagePath = null;
      if (req.file) {
          imagePath = `uploads/${req.file.filename}`;
      }

      const recipeData = {
          ...req.body,
          image: imagePath
      };

      const newRecipe = new Recipe(recipeData);
      await newRecipe.save();

      res.status(200).json({
          msg: 'File uploaded and data saved',
          file: imagePath
      });
  } catch (error) {
      next(error);
  }
};

export const getRecipe = async (req,res,next)=>{
    
    try {
        const getRecipes = await Recipe.find()
        res.status(200).json(getRecipes)
    } 
    
    catch (error) {
        next(error)
    }
}

export const editRecipe = async (req, res, next) => {
    try {
      const cuisine = await Cuisine.findById(req.params.id);
      if (!cuisine) return next(errorHandler(404, 'Cuisine not found!'));
      
      const { name } = req.body;
      let imagePath = cuisine.image;

      if (req.file) {
        imagePath = `uploads/${req.file.filename}`;
    }

      const updatedCuisine = await Cuisine.findByIdAndUpdate(
        req.params.id,
        {
            $set:{
                name:name,
                image: imagePath
            }
        },
        { new: true,runValidators:true} 
      );

      await updatedCuisine.save()
  
      res.status(200).json(updatedCuisine);

    } catch (error) {
      next(error); 
    }
  };

export const deleteRecipe = async (req, res, next) => {
    try {
      const cuisine = await Cuisine.findById(req.params.id);
      if (!cuisine) return next(errorHandler(404, 'Cuisine not found!'));
      
      await Cuisine.findByIdAndDelete(req.params.id);

      res.status(200).json("Cuisine deleted successfully");

    } catch (error) {
      next(error); 
    }
  };
  
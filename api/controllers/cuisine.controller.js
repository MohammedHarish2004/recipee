import Cuisine from "../models/cuisine.model.js"
import { errorHandler } from "../utils/error.js";

export const create = async(req,res,next)=>{

    const { name } = req.body;
    const imagePath = `uploads/${req.file.filename}`;

    try {
        const newCuisine = new Cuisine({name,image:imagePath})
        await newCuisine.save()
        res.status(200).json({
            msg: 'File uploaded and data saved',
            file: imagePath
          });
    } 
    catch (error) {
            next(error)    
    }
}

export const getCuisine = async (req,res,next)=>{
    
    try {
        const getCuisines = await Cuisine.find()
        res.status(200).json(getCuisines)
    } 
    
    catch (error) {
        next(error)
    }
}

export const editCuisine = async (req, res, next) => {
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

export const deleteCuisine = async (req, res, next) => {
    try {
      const cuisine = await Cuisine.findById(req.params.id);
      if (!cuisine) return next(errorHandler(404, 'Cuisine not found!'));
      
      await Cuisine.findByIdAndDelete(req.params.id);

      res.status(200).json("Cuisine deleted successfully");

    } catch (error) {
      next(error); 
    }
  };
  
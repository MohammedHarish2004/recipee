import Cuisine from "../models/cuisine.model.js"

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
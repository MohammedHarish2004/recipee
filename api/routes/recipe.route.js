import express from 'express';
import { create, editRecipe, getRecipe,deleteRecipe } from '../controllers/recipe.controller.js';
import upload  from '../utils/uploadMiddlewares.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/create', upload.single('image'),verifyToken, create);
router.get('/get', getRecipe);
router.post('/edit/:id',upload.single('image'),verifyToken,editRecipe);
router.delete('/delete/:id',verifyToken,deleteRecipe);

export default router;

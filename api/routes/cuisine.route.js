import express from 'express';
import { create, editCuisine, getCuisine,deleteCuisine } from '../controllers/cuisine.controller.js';
import upload  from '../utils/uploadMiddlewares.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/create', upload.single('image'),verifyToken, create);
router.get('/get', getCuisine);
router.post('/edit/:id',upload.single('image'),verifyToken,editCuisine);
router.delete('/delete/:id',verifyToken,deleteCuisine);
export default router;

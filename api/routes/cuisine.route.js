import express from 'express';
import { create, getCuisine } from '../controllers/cuisine.controller.js';
import upload  from '../utils/uploadMiddlewares.js';

const router = express.Router();

router.post('/create', upload.single('image'), create);
router.get('/get', getCuisine);

export default router;

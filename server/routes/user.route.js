import express from 'express';
import userModel from '../models/user.model.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const list = await userModel.find({});
    return res.json(list);
})

export default router;
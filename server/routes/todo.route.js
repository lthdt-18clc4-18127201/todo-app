import express from 'express';
import todoModel from '../models/todo.model.js';

const router = express.Router();


router.get('/', async (req, res) => {
    const list = await todoModel.find({});
    res.json(list);
});

router.post('/', async(req, res) => {
    try {   
        const newTodo = new todoModel({
            title: req.body.title
        });

        await newTodo.save();
        res.status(201).json({message: 'new todo created!'});
    } catch (error) {
        res.status(404).json({message: 'Error to create todo'});
        throw error;
    }
});

router.put('/:id', async(req, res) => {
    try {
        const newTodo = req.body;
        await todoModel.updateOne({
            _id: req.params.id,
        }, {
            $set: newTodo
        });
        res.status(200).json({message: 'Data updated successfully'})
    } catch (error) {
        res.status(404).json({message: 'Some error occured'});
        throw error;
    }
});

router.delete('/:id', async(req, res) => {
    try {
        await todoModel.deleteOne({ _id: req.params.id })
        res.status(202).json({message: 'Delete successful'});
    } catch (error) {
        res.status(404).json({message: 'Some error occured'});
        throw error;
    }
});

export default router;
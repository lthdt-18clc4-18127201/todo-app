import express from 'express';
import userModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const router = express.Router()

const refreshTokens = [];

router.post('/register', async(req, res) => {
    try {
        const user = new userModel(req.body);
        await user.save();
        return res.status(201).json({message: 'Registered successfully!'});
    } catch (error) {
        return res.status(404).json({message: 'Some error occured'});
    }
});

router.post('/login', async(req, res) => {
    const { username, password } = req.body;

    const user = await userModel.findOne({username, password});

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign({user: user}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '3m'
    });
    const refreshToken = jwt.sign({user: user}, process.env.REFRESH_TOKEN_SECRET);

    refreshTokens.push(refreshToken);

    return res.json({accessToken: accessToken, refreshToken: refreshToken});
});

router.post('/token', (req, res) => {
    const refreshToken = req.body.token;
    if(!refreshToken)
        return res.sendStatus(401).json({message: 'Invalid token'});

    if(!refreshTokens.includes(refreshToken))
        return res.sendStatus(403).json({message: 'Token is not exist'});

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403).json({message: 'Token is not exist'});

        const accessToken = jwt.sign({user: user}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '3m'
        })
        return res.json({accessToken: accessToken})
    })
});

export default router;
import dotenv from 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connect from './utils/db.js';

import SiteRouter from './routes/site.route.js';
import TodoRouter from './routes/todo.route.js';
import UserRouter from './routes/user.route.js';
import AuthRouter from './routes/auth.route.js';

import authToken from './middlewares/auth.mdw.js';

const app = express();
const PORT = process.env.PORT || 4000;

connect();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))
app.use('/', SiteRouter);
app.use('/api/auth', AuthRouter);
app.use('/api/todos', authToken, TodoRouter);
app.use('/api/users', authToken, UserRouter);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})
import dotenv from 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connect from './utils/db.js';

import SiteRouter from './routes/site.route.js';
import TodoRouter from './routes/todo.route.js';

const app = express();
const PORT = process.env.PORT || 4000;

connect();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))
app.use('/', SiteRouter);
app.use('/api/todos', TodoRouter);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})
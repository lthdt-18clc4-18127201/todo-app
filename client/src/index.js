import React from 'react';
import ReactDOM from 'react-dom/client';
import { TodoProvider } from "./context/TodoContext";
import { BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <TodoProvider>
        <Router>
            <App />
        </Router>
    </TodoProvider>
);


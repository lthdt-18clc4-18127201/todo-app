import { useEffect } from 'react'
import { useStore, actions } from './store';
import Header from './components/Header';
import Form from './components/Form';
import TodoList from './components/TodoList';
import './App.css'

function App() {
    // const initialState = JSON.parse(localStorage.getItem("todos")) || [];
    const [ state, dispatch ] = useStore();
    const { todos } = state;

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos])
    return (
        <div className='container'>
            <div className="app-wrapper">
                <div>
                    <Header />
                </div>
                <div>
                    <Form />
                </div>
                <div>
                    <TodoList />
                </div>
            </div>
        </div>
    )
}

export default App;

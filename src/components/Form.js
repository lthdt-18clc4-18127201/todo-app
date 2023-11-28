import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AddForm = ({
    input, 
    setInput, 
    todos, 
    setTodos, 
    editTodo, 
    setEditTodo,
    filter,
    setFilter
}) => {

    const onInputChange = (e) => {
        setInput(e.target.value);
    };

    const updateTodo = (title, id, completed) => {
        const newTodo = todos.map((todo) =>
            todo.id === id ? { title, id, completed } : todo
        );
        setTodos(newTodo);
        setEditTodo("");
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        if(!editTodo) {
            setTodos([...todos, {id: uuidv4(), title: input, completed: false}]);
            setInput('');
        } else {
            updateTodo(input, editTodo.id, editTodo.completed);
        }
    };
    
    useEffect(() => {
        if(editTodo) {
            setInput(editTodo.title);
        } else {
            setInput("");
        }
    }, [setInput, editTodo]);

    return (
        <>
            <form onSubmit={onFormSubmit}>
                <input 
                    type='text' 
                    placeholder='Enter a todo...' 
                    className='input-field'
                    value={input}
                    required
                    onChange={onInputChange}
                    />
                <button className='button-add' type='submit'>
                    {editTodo ? "OK" : "Add"}
                </button>
            </form>
            <form>
                <input 
                    type='text' 
                    placeholder='Enter keyword...' 
                    className='input-field filter'
                    value={filter}
                    required
                    onChange={(e) => setFilter(e.target.value)}
                />
            </form>
        </>
    )
}

export default AddForm;
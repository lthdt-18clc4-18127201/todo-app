import React, { useEffect, useRef } from 'react';
import { useStore, actions } from '../store';
import { v4 as uuidv4 } from 'uuid';

const Form = () => {

    const inputRef = useRef()

    const [ state, dispatch ] = useStore();
    const { todos, todoInput, editTodo } = state;

    const onInputChange = (e) => {
        dispatch(actions.setTodoInput(e.target.value));
    };

    const updatedTodo = (title, id, completed) => {
        const newTodo = todos.map((todo) =>
            todo.id === id ? { title, id, completed } : todo
        );
        console.log(newTodo);
        dispatch(actions.updateTodo(newTodo));
        dispatch(actions.setTodoInput(''));
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        if(!editTodo) {
            dispatch(actions.addTodo({id: uuidv4(), title: todoInput, completed: false}));
            dispatch(actions.setTodoInput(""));
            inputRef.current.focus();
        } else {
            updatedTodo(todoInput, editTodo.id, editTodo.completed);
        }
    };
    
    useEffect(() => {
        if(editTodo) {
            dispatch(actions.setTodoInput(editTodo.title));
            dispatch(actions.updateTodo(editTodo.title));
        } else {
            dispatch(actions.setTodoInput(""));
        }
    }, [dispatch, editTodo]);

    return (
        <>
            <form onSubmit={onFormSubmit}>
                <input 
                    ref={inputRef}
                    type='text' 
                    placeholder='Enter a todo...' 
                    className='input-field'
                    value={todoInput}
                    required
                    onChange={onInputChange}
                    />
                <button className='button-add' type='submit'>
                    {editTodo ? "OK" : "Add"}
                </button>
            </form>
            {/* <form>
                <input 
                    type='text' 
                    placeholder='Enter keyword...' 
                    className='input-field filter'
                    value={filter}
                    required
                    onChange={(e) => setFilter(e.target.value)}
                />
            </form> */}
        </>
    )
}

export default Form;
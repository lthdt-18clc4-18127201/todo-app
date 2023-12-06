/* eslint-disable no-unreachable */
import {
    SET_TODO_INPUT,
    ADD_TODO,
    SET_TODO_COMPLETED,
    SET_EDIT_TODO,
    UPDATE_TODO,
    DELETE_TODO
} from '../constants/constants';

const initialState = {
    todos: [],
    todoInput: '',
    filterInput: '',
    editTodo: null
}

export {initialState}
export default function reducer(state, action) {

    switch(action.type) {
        case SET_TODO_INPUT:
            return {
                ...state,
                todoInput: action.payload
            }
        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, action.payload]
            }
        case SET_TODO_COMPLETED:
            return {
                ...state,
                todos: [...state.todos]
            }
        case SET_EDIT_TODO:
            return  {
                ...state,
                editTodo: [...state.editTodo, action.payload]
            }
        case UPDATE_TODO:
            return {
                ...state,
                todos: [...state.todos, action.payload]
            }
        case DELETE_TODO:
            const newTodos = [...state.todos];
            return {
                ...state,
                todos: newTodos
            }
        default:
            return state;
    }
}
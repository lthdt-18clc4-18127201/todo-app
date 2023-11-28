import {
    SET_TODO_INPUT,
    ADD_TODO,
    SET_TODO_COMPLETED,
    SET_EDIT_TODO,
    UPDATE_TODO,
    DELETE_TODO
} from '../constants/constants';

export const setTodoInput = payload => ({
    type: SET_TODO_INPUT,
    payload
});

export const addTodo = payload => ({
    type: ADD_TODO,
    payload
});

export const setTodoCompleted = payload => ({
    type: SET_TODO_COMPLETED,
    payload
});

export const setEditTodo = payload => ({
    type: SET_EDIT_TODO,
    payload
});

export const updateTodo = payload => ({
    type: UPDATE_TODO,
    payload
});

export const deleteTodo = payload => ({
    type: DELETE_TODO,
    payload
});
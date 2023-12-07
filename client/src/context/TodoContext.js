import React, { createContext, useReducer } from "react";
import instance from "../instance/axios";

export const TodoContext = createContext();

const initialState = {
  todos: [],
  filter: "",
  editTodo: null,
  loading: false
};

const todoReducer = (state, action) => {
    switch (action.type) {
        case "IS_LOADING":
            return {
                ...state,
                loading: action.payload
            };
        case "LOAD_TODO":
            return {
                ...state,
                todos: action.payload,
            }
        case "ADD_TODO":
        return { 
            ...state, 
            todos: [...state.todos, action.payload ] 
        };
        case "MARK_AS_COMPLETED":
        return {
            ...state,
            todos: state.todos.map((todo) =>
                todo._id === action.payload
                    ? instance.put(`/api/todos/${action.payload}`, { completed: true})
                    : todo
                ),
        };
        case "MARK_AS_UNCOMPLETED":
        return {
            ...state,
            todos: state.todos.map((todo) =>
                todo._id === action.payload
                    ? instance.put(`/api/todos/${action.payload}`, { completed: false})
                    : todo
            ),
        };
        case "DELETE_TODO":
        return {
            ...state,
            todos: state.todos.filter((todo) => 
                    todo._id === action.payload
                        ? instance.delete(`/api/todos/${action.payload}`)
                        : todo
                    ),
        };
        case "SET_EDIT_TODO":
        return {
            ...state,
            editTodo: action.payload,
        };

        case "UPDATE_TODO":
        return {
            ...state,
            todos: state.todos.map((todo) =>
                todo._id === action.payload.id 
                    ? instance.put(`/api/todos/${action.payload.id}`, {
                        title: action.payload.title,
                    }) 
                    : todo
            ),
        };
        case "SET_INPUT_FILTER":
            return {
                ...state,
                filter: action.payload
            };
        default:
        return state;
    };
};

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

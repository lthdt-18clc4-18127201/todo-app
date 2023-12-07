import React, { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import CustomButton from "../components/CustomButton";
// import instance from './instance/axios.js';

const TodoList = () => {
    const { state, dispatch } = useContext(TodoContext);
    const { todos, filter } = state;

    const handleComplete = (todo) => {
        dispatch({ type: "MARK_AS_COMPLETED", payload: todo.id });
    };

    const handleEdit = (todo) => {
        dispatch({ type: "SET_EDIT_TODO", payload: todo });
    };

    const handleDelete = (id) => {
        dispatch({ type: "DELETE_TODO", payload: id });
    };

    return (
        <div>
        {todos
            .filter((item) => {
            return filter.toLowerCase() === ""
                ? item
                : item.title.toLowerCase().includes(filter);
            })
            .map((todo) => (
            <li
                className={`list-item ${todo.completed ? "complete" : ""}`}
                key={todo.id}
            >
                <input
                type="text"
                value={todo.title}
                className={`list ${todo.completed ? "complete" : ""}`}
                onChange={(e) => e.preventDefault()}
                />
                <div className="button-container">
                <CustomButton
                    onClick={() => handleComplete(todo)}
                    className="button-complete"
                    popupText="Done"
                >
                    <i
                    className={`fa fa-check-circle ${
                        todo.completed ? "complete" : ""
                    }`}
                    ></i>
                </CustomButton>
                <CustomButton
                    onClick={() => handleEdit(todo)}
                    className={`button-edit ${todo.completed ? "complete" : ""}`}
                    popupText="Edit"
                >
                    <i className="fa fa-edit"></i>
                </CustomButton>
                <CustomButton
                    onClick={() => handleDelete(todo.id)}
                    className="button-delete"
                    popupText="Delete"
                >
                    <i className="fa fa-trash"></i>
                </CustomButton>
                </div>
            </li>
            ))}
        </div>
    );
};

export default TodoList;

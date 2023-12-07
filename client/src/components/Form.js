import React, { useContext, useState, useEffect } from "react";
import { TodoContext } from "../context/TodoContext";
import instance from "../instance/axios";

const AddForm = () => {
    const { state, dispatch } = useContext(TodoContext);
    const { editTodo, filter } = state;
    const [input, setInput] = useState("");

    const onInputChange = (e) => {
        setInput(e.target.value);
    };

    const updateTodo = (id, title) => {
        dispatch({ type: "UPDATE_TODO", payload: {id, title} });
        dispatch({ type: "SET_EDIT_TODO", payload: null });
    };

    const addTodo = async (title) => {
        dispatch({type: "IS_LOADING", payload: true});
        try {
            await instance.post('/api/todos', {
                title: title
            });
        } catch (error) {
            throw error;
        }
        dispatch({type: "IS_LOADING", payload: false});
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        if (!editTodo) {
            addTodo(input)
            setInput("");
        } else {
            updateTodo(editTodo._id, input);
        }
    };

    useEffect(() => {
        if (editTodo) {
            setInput(editTodo.title);
        } else {
            setInput("");
        }
    }, [editTodo]);

    return (
        <>
            <form onSubmit={onFormSubmit}>
                <input
                    type="text"
                    placeholder="Enter a todo..."
                    className="input-field"
                    value={input}
                    required
                    onChange={onInputChange}
                />
                <button className="button-add" type="submit">
                    {editTodo ? "OK" : "Add"}
                </button>
            </form>
            <form>
                <input
                    type="text"
                    placeholder="Enter keyword..."
                    className="input-field filter"
                    value={filter}
                    required
                    onChange={(e) => 
                        dispatch({type: "SET_INPUT_FILTER", payload: e.target.value}
                    )}
                />
            </form>
        </>
    );
};

export default AddForm;

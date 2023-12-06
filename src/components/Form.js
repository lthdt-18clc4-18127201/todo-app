import React, { useContext, useState, useEffect } from "react";
import { TodoContext } from "../context/TodoContext";
import { v4 as uuidv4 } from "uuid";

const AddForm = () => {
  const { state, dispatch } = useContext(TodoContext);
  const { editTodo } = state;
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("");

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  const updateTodo = (title, id, completed) => {
    dispatch({ type: "UPDATE_TODO", payload: { title, id, completed } });
    dispatch({ type: "SET_EDIT_TODO", payload: null });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!editTodo) {
      dispatch({
        type: "ADD_TODO",
        payload: { id: uuidv4(), title: input, completed: false },
      });
      setInput("");
    } else {
      updateTodo(input, editTodo.id, editTodo.completed);
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
          onChange={(e) => setFilter(e.target.value)}
        />
      </form>
    </>
  );
};

export default AddForm;

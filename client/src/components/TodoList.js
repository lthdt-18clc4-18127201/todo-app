import React, { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import CustomButton from "../components/CustomButton";
import ClipLoader from "react-spinners/ClipLoader";
import instance from '../instance/axios';


const TodoList = () => {
    const { state, dispatch } = useContext(TodoContext);
    const { todos, loading, filter } = state;

    const handleComplete = (todo) => {
        if(!todo.completed){
            dispatch({ type: "MARK_AS_COMPLETED", payload: todo._id });
        } else {
            dispatch({ type: "MARK_AS_UNCOMPLETED", payload: todo._id });
        }
    };

    const handleEdit = (todo) => {
        dispatch({ type: "SET_EDIT_TODO", payload: todo });
    };

    const handleDelete = (id) => {
        dispatch({ type: "DELETE_TODO", payload: id });
    };

    const getData = async () => {
        const { data } = await instance.get('/api/todos');
        dispatch({type: "LOAD_TODO", payload: data});
    };
    getData();

    return (
        <div>
            {
                loading 
                ?
                <ClipLoader
                    size={30}
                    loading={loading}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
                :
                todos
                    .filter((item) => {
                    return filter.toLowerCase() === ""
                        ? item
                        : item.title.toLowerCase().includes(filter);
                    })
                    .map((todo) => (
                    <li
                        className={`list-item ${todo.completed ? "complete" : ""}`}
                        key={todo._id}
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
                            onClick={() => handleDelete(todo._id)}
                            className="button-delete"
                            popupText="Delete"
                        >
                            <i className="fa fa-trash"></i>
                        </CustomButton>
                        </div>
                    </li>
                ))
            }
        </div>
    );
};

export default TodoList;

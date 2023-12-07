import React, { useContext, useEffect } from 'react';
import Header from "../components/Header";
import Form from "../components/Form";
import TodoList from "../components/TodoList";
import ClipLoader from "react-spinners/ClipLoader";
import { TodoContext } from "../context/TodoContext";


const Home = () => {
    const { state, dispatch } = useContext(TodoContext);
    const { loading } = state;

    useEffect(() => {
        dispatch({type: "IS_LOADING", payload: true});
        setTimeout(() => {
            dispatch({type: "IS_LOADING", payload: false});
        }, 2000);
    }, [dispatch])

    return (
        <div className="container">
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
            }
        </div>
    )
}

export default Home
import React from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
    return (
        <div className="container">
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
        </div>
    );
}

export default App;

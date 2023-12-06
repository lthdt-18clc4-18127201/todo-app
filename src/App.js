import React from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import TodoList from "./components/TodoList";
import { TodoProvider } from "./context/TodoContext";
import "./App.css";

function App() {
  return (
    <TodoProvider>
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
    </TodoProvider>
  );
}

export default App;

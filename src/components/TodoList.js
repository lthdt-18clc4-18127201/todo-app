import React from 'react'
import CustomButton from '../components/CustomButton';

const TodoList = ({
    todos, 
    setTodos, 
    setEditTodo,
    filter,
    setFilter
}) => {

    const handleComplete = (todo) => {
        setTodos(
            todos.map((item) => {
                if(item.id === todo.id) return {...item, completed: !item.completed}
                return item;
            })
        )
    }

    const handleEdit = ({id}) => {
        const findTodo = todos.find((todo) => todo.id === id);
        setEditTodo(findTodo);
    }

    const handleDelete = ({id}) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    };


    return (
        <div>
            {todos.filter((item) => {
                return filter.toLowerCase() === '' 
                    ? item
                    : item.title.toLowerCase().includes(filter)
            }).map((todo) => (
                <li className={`list-item ${todo.completed ? "complete" : ""}`} key={todo.id}>
                    <input 
                        type='text' 
                        value={todo.title} 
                        className={`list ${todo.completed ? "complete" : ""}`}
                        onChange={(e) => e.preventDefault()}
                    />
                    <div className='button-container'>
                        <CustomButton 
                            onClick={() => handleComplete(todo)}
                            className='button-complete'
                            popupText='Done'
                        >
                            <i className={`fa fa-check-circle ${todo.completed 
                                                            ? "complete" : ""}`}></i>
                        </CustomButton>
                        <CustomButton 
                            onClick={() => handleEdit(todo)}
                            className={`button-edit ${todo.completed 
                                                        ? "complete" : ""}`}
                            popupText='Edit'
                        >
                            <i className='fa fa-edit'></i>
                        </CustomButton>
                        <CustomButton
                            onClick={() => handleDelete(todo)}
                            className='button-delete'
                            popupText='Delete'
                        >
                            <i className='fa fa-trash'></i>
                        </CustomButton>
                    </div>
                </li>
            ))}
        </div>
    )
}

export default TodoList;
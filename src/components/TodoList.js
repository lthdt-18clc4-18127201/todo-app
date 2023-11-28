import React from 'react'
import CustomButton from '../components/CustomButton';
import { useStore, actions } from '../store';

const TodoList = () => {

    const [ state, dispatch ] = useStore();
    const { todos, filterInput, editTodo } = state;

    const handleComplete = (todo) => {
        dispatch(actions.setTodoCompleted(
            todos.map((item) => {
                if(item.id === todo.id) return item.completed = !item.completed
                return item;
            })
        ))
    }

    const handleEdit = ({id}) => {
        const findTodo = todos.find((todo) => todo.id === id);
        // setEditTodo(findTodo);
        if(editTodo !== '') {
            dispatch(actions.setEditTodo(findTodo))
        }
        dispatch(actions.setTodoInput(findTodo.title));
    }

    const handleDelete = ({id}) => {
        dispatch(actions.deleteTodo(todos.filter((todo) => todo.id !== id)));
    };


    return (
        <div>
            {todos.filter((item) => {
                return filterInput.toLowerCase() === '' 
                    ? item
                    : item.title.toLowerCase().includes(filterInput)
            }).map((todo) => (
                <li 
                    className={`list-item ${todo.completed ? "complete" : ""}`} 
                    key={todo.id}
                >
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
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, removeTodo, toggleImportant, startEditing, saveEdit, cancelEdit } from '../features/todos/todoSlice';

const TodoList = () => {
  const [inputValue, setInputValue] = useState('');
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  const handleAddClick = () => {
    if (inputValue.trim()) {
      dispatch(addTodo(inputValue));
      setInputValue('');
    }
  };

  const handleEditClick = (id) => {
    dispatch(startEditing(id));
  };

  const handleSaveClick = (id, newText) => {
    dispatch(saveEdit({ id, newText }));
  };

  const handleCancelClick = (id) => {
    dispatch(cancelEdit(id));
  };

  return (
    <div className="todo-list">
      <h1 className='h1'>Список задач</h1>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleAddClick}>Добавить</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} style={{ color: todo.important ? '#dc3545' : '#333' }}>
            {todo.isEditing ? (
              <div>
                <input
                  type="text"
                  defaultValue={todo.text}
                  className="edit"
                  onBlur={(e) => handleSaveClick(todo.id, e.target.value)}
                />
                <button onClick={() => handleSaveClick(todo.id, todo.text)}>Сохранить</button>
                <button onClick={() => handleCancelClick(todo.id)}>Отмена</button>
              </div>
            ) : (
              <span>{todo.text}</span>
            )}
            <div>
              <button
                onClick={() => dispatch(toggleImportant(todo.id))}
                className={todo.important ? 'important' : ''}
              >
                {todo.important ? 'Убрать важность' : 'Сделать важным'}
              </button>
              <button onClick={() => dispatch(removeTodo(todo.id))}>Удалить</button>
              {!todo.isEditing && <button onClick={() => handleEditClick(todo.id)}>Изменить</button>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

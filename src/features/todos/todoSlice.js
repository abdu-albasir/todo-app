import { createSlice, nanoid } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(text) {
        return {
          payload: {
            id: nanoid(),
            text,
            important: false,
            isEditing: false
          }
        };
      }
    },
    removeTodo: (state, action) => state.filter(todo => todo.id !== action.payload),
    toggleImportant: (state, action) => {
      const todo = state.find(todo => todo.id === action.payload);
      if (todo) {
        todo.important = !todo.important;
      }
    },
    startEditing: (state, action) => {
      const todo = state.find(todo => todo.id === action.payload);
      if (todo) {
        todo.isEditing = true;
      }
    },
    saveEdit: (state, action) => {
      const { id, newText } = action.payload;
      const todo = state.find(todo => todo.id === id);
      if (todo) {
        todo.text = newText;
        todo.isEditing = false;
      }
    },
    cancelEdit: (state, action) => {
      const todo = state.find(todo => todo.id === action.payload);
      if (todo) {
        todo.isEditing = false;
      }
    }
  }
});

export const { addTodo, removeTodo, toggleImportant, startEditing, saveEdit, cancelEdit } = todoSlice.actions;
export default todoSlice.reducer;

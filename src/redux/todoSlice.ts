import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Todo } from "../types/todo";

interface TodoState {
  items: Todo[];
}

const initialState: TodoState = {
  items: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.items = action.payload;
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.items.push(action.payload);
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.items.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (todo) => todo.id !== action.payload
      );
    },
  },
});

export const { setTodos, addTodo, updateTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;

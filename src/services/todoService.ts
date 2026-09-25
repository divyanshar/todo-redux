import axios from "axios";
import type { Todo, TodoInput } from "../types/todo";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

export const getTodos = async (): Promise<Todo[]> => {
  try {
    const response = await axios.get<Todo[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw new Error("Failed to fetch todos");
  }
};

export const getTodoById = async (id: number): Promise<Todo> => {
  try {
    const response = await axios.get<Todo>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching todo with id ${id}:`, error);
    throw new Error("Failed to fetch todo");
  }
};

export const createTodo = async (todo: TodoInput): Promise<Todo> => {
  try {
    const response = await axios.post<Todo>(API_URL, todo);
    return response.data;
  } catch (error) {
    console.error("Error creating todo:", error);
    throw new Error("Failed to create todo");
  }
};

export const updateTodo = async (id: number, todo: TodoInput): Promise<Todo> => {
  try {
    const response = await axios.put<Todo>(`${API_URL}/${id}`, todo);
    return response.data;
  } catch (error) {
    console.error(`Error updating todo with id ${id}:`, error);
    throw new Error("Failed to update todo");
  }
};

export const deleteTodo = async (id: number): Promise<number> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  } catch (error) {
    console.error(`Error deleting todo with id ${id}:`, error);
    throw new Error("Failed to delete todo");
  }
};

import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

export async function fetchTodos() {
  try {
    const response = await axios.get(API_URL + "?_limit=10");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch todos");
  }
}

export async function createTodo(title) {
  try {
    const response = await axios.post(API_URL, {
      title: title,
      completed: false,
      userId: 1,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to add todo");
  }
}

export async function deleteTodo(id) {
  try {
    await axios.delete(API_URL + "/" + id);
  } catch (error) {
    throw new Error("Failed to delete todo");
  }
}

export async function updateTodo(id, completed) {
  try {
    const response = await axios.patch(API_URL + "/" + id, {
      completed: completed,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to update todo");
  }
}
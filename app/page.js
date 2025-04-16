"use client";

import { useState, useEffect } from "react";
import { fetchTodos, createTodo, deleteTodo, updateTodo } from "@/lib/api";
import TodoList from "@/components/TodoList";
import TodoForm from "@/components/TodoForm";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadTodos() {
      try {
        const data = await fetchTodos();
        setTodos(data);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    }
    loadTodos();
  }, []);

  async function handleAdd(title) {
    const tempId = -Math.floor(Math.random() * 1000000);
    const optimisticTodo = { id: tempId, title, completed: false };
    setTodos([optimisticTodo, ...todos]);

    try {
      const newTodo = await createTodo(title);
      setTodos((prev) => {
        let newId = newTodo.id;
        while (prev.some((todo) => todo.id === newId && todo.id !== tempId)) {
          newId += 1;
        }
        const updatedTodo = { ...newTodo, id: newId };
        return [updatedTodo, ...prev.filter((todo) => todo.id !== tempId)];
      });
    } catch (error) {
      setError(error.message);
      setTodos((prev) => prev.filter((todo) => todo.id !== tempId));
    }
  }

  async function handleDelete(id) {
    const previousTodos = todos;
    setTodos(todos.filter((todo) => todo.id !== id));

    try {
      await deleteTodo(id);
    } catch (error) {
      setError(error.message);
      setTodos(previousTodos);
    }
  }

  async function handleToggle(id, completed) {
    const previousTodos = todos;
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !completed } : todo
      )
    );

    try {
      await updateTodo(id, !completed);
    } catch (error) {
      setError(error.message);
      setTodos(previousTodos);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Todo App</h1>
      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg mb-6 shadow-md">
          {error}
        </div>
      )}
      <TodoForm onAdd={handleAdd} />
      <TodoList todos={todos} onDelete={handleDelete} onToggle={handleToggle} />
    </div>
  );
}
import { useState } from "react";

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (title.trim()) {
      onAdd(title);
      setTitle("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mb-6">
      <div className="flex gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new todo"
          className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-5 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
        >
          Add
        </button>
      </div>
    </form>
  );
}
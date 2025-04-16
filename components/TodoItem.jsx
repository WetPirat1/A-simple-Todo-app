export default function TodoItem({ todo, onDelete, onToggle }) {
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-md mb-3 hover:shadow-lg transition duration-200">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id, todo.completed)}
        className="h-5 w-5 text-blue-500 rounded focus:ring-blue-400 cursor-pointer"
      />
      <span
        className={`flex-1 ml-3 text-gray-700 ${
          todo.completed ? "line-through text-gray-400" : ""
        }`}
      >
        {todo.title}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-red-500 hover:text-red-700 font-medium transition duration-200"
      >
        Delete
      </button>
    </div>
  );
}
import TodoItem from "./TodoItem";

export default function TodoList({ todos, onDelete, onToggle }) {
  return (
    <div className="w-full max-w-md">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}
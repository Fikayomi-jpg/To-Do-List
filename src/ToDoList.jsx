import { useState } from "react";
import "./ToDoList.css";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const addTodo = () => {
    if (input.trim() === "") return;

    if (editIndex !== null) {
      const updated = [...todos];
      updated[editIndex] = input;
      setTodos(updated);
      setEditIndex(null);
    } else {
      setTodos([...todos, input]);
    }

    setInput("");
  };

  const deleteTodo = (index) => {
    const updated = todos.filter((_, i) => i !== index);
    setTodos(updated);
  };

  const startEdit = (index) => {
    setInput(todos[index]);
    setEditIndex(index);
  };

  return (
    <div className="todo-container">
      <h1>My To-Do List</h1>

      <div className="todo-input-group">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a task..."
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
        />

        <button onClick={addTodo} className="add-btn">
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      <ul className="todo-list">
        {todos.length === 0 ? (
          <li className="empty-message">No tasks yet. Add one above!</li>
        ) : (
          todos.map((todo, index) => (
            <li key={index} className="todo-item">
              <span>{todo}</span>
              <div className="todo-actions">
                <button onClick={() => startEdit(index)} className="edit-btn">
                  Edit
                </button>
                <button onClick={() => deleteTodo(index)} className="delete-btn">
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default TodoApp;
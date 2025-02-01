import React, { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      const newTask = {
        text: newTodo,
        date: new Date().toLocaleString(),
        completed: false,
      };
      setTodos([...todos, newTask]);
      setNewTodo("");
    }
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleEditTodo = (index) => {
    setEditingIndex(index);
    setEditingText(todos[index].text);
  };

  const handleUpdateTodo = () => {
    const updatedTodos = [...todos];
    updatedTodos[editingIndex].text = editingText;
    setTodos(updatedTodos);
    setEditingIndex(null);
    setEditingText("");
  };

  const handleToggleCompletion = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div className="todo-container">
        <input
          type="text"
          value={newTodo}
          onChange={handleInputChange}
          placeholder="Add a new task"
        />
        <button className="add-button" onClick={handleAddTodo}>Add</button>
      </div>

      {/* Edit Task Section */}
      {editingIndex !== null && (
        <div className="edit-container">
          <input
            type="text"
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
          />
          <button onClick={handleUpdateTodo}>Update</button>
          <button onClick={() => setEditingIndex(null)}>Cancel</button>
        </div>
      )}

      <ul>
        {todos.map((todo, index) => (
          <li key={index} className={todo.completed ? "completed" : ""}>
            <span>{todo.text}</span>
            <span className="date">{todo.date}</span>
            <button
              className="done-button"
              onClick={() => handleToggleCompletion(index)}
            >
              {todo.completed ? "Undo" : "Done"}
            </button>
            <button
              className="edit-button"
              onClick={() => handleEditTodo(index)}
            >
              Edit
            </button>
            <button
              className="delete-button"
              onClick={() => handleDeleteTodo(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

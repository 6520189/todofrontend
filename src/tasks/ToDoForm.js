import React, { useState, useEffect } from "react";
import axios from "axios";

const ToDoForm = ({ task, onUpdated, onCancel }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (task) {
      setName(task.name); // Pre-fill the form when editing
    } else {
      setName(""); // Clear the form when adding a new task
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task) {
      // Edit existing task
      await axios.put(`http://localhost:8080/user/${task.id}`, { name });
    } else {
      // Add new task
      await axios.post("http://localhost:8080/user", { name });
    }
    onUpdated(); // Notify parent to refresh tasks
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="form-group">
        <label htmlFor="name">Task</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {task ? "Update Task" : "Add Task"}
      </button>
      {task && (
        <button
          type="button"
          className="btn btn-secondary ml-2"
          onClick={onCancel}
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default ToDoForm;

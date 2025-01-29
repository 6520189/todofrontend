import React, { useEffect, useState } from "react";
import axios from "axios";
import ToDoForm from "../tasks/ToDoForm";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null); // Track the task being edited

  useEffect(() => {
    loadUsers();
  }, []);





  // const loadUsers = async () => {
  //   const result = await axios.get("http://localhost:8080/users");
  //   setTasks(result.data);
  // };

  const loadUsers = async () => {
    try {
      const baseUrl = process.env.REACT_APP_API_BASE_URL;

      const result = await axios.get(`${baseUrl}/users`); // Use backticks for template string
      setTasks(result.data);
    } catch (error) {
      console.error("Error loading users:", error.response || error.message);
    }
  };


  const startEditing = (task) => {
    setEditingTask(task); // Set the task to be edited
  };

  const stopEditing = () => {
    setEditingTask(null); // Exit edit mode
  };

  const onTaskUpdated = async () => {
    await loadUsers(); // Reload tasks after update
    stopEditing(); // Exit edit mode
  };

  // const deleteUser = async (id) => {
  //   await axios.delete(`http://localhost:8080/user/${id}`)
  //   loadUsers();
  // };

  const deleteUser = async (id) => {
    try {
      const baseUrl = process.env.REACT_APP_API_BASE_URL;
      await axios.delete(`${baseUrl}/user/${id}`);
      loadUsers(); // Refresh the list after deletion
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error(`Error ${error.response.status}: ${error.response.data}`);
      } else if (error.request) {
        // No response received from server
        console.error("No response received:", error.request);
      } else {
        // Other errors
        console.error("Error:", error.message);
      }
    }
  };
  

  return (
    <div className="container">
      <div className="py-4">
        <h1>Productivity King 👑</h1>
        <ToDoForm
          task={editingTask} // Pass the task to edit
          onUpdated={onTaskUpdated} // Callback when task is updated
          onCancel={stopEditing} // Cancel editing
        />
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">to-dos</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
            <tbody>
                {tasks.map((user, index) => (
                    <tr key={user.id}>
                    <td>{index + 1}</td> {/* Row number */}
                    <td>{user.name}</td> {/* Or whatever property */}
                    <td>
                        <button onClick={() => startEditing(user)}>Edit</button> {/* Start editing */}
                        <button onClick={() => deleteUser(user.id)}>Delete</button>
                    </td>
                    </tr>
                ))}
            </tbody>

        </table>
      </div>
    </div>
  );
}

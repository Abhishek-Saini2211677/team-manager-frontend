import { useEffect, useState } from "react";

const BASE_URL = "https://team-manager-backend-production-1391.up.railway.app";

export default function Tasks({ token }) {
  const [tasks, setTasks] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    assignedTo: "",
    projectId: "",
    dueDate: ""
  });

  // ✅ FIXED useEffect (no warning)
  useEffect(() => {
    const loadTasks = async () => {
      const res = await fetch(`${BASE_URL}/api/tasks`, {
        headers: { Authorization: token }
      });

      const data = await res.json();
      setTasks(data);
    };

    loadTasks();
  }, [token]);

  // 🔹 Create task
  const createTask = async () => {
    await fetch(`${BASE_URL}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(form)
    });

    setForm({
      title: "",
      description: "",
      priority: "Medium",
      assignedTo: "",
      projectId: "",
      dueDate: ""
    });
  };

  // 🔹 FIXED (missing earlier)
  const updateStatus = async (id, status) => {
    await fetch(`${BASE_URL}/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ status })
    });
  };

  return (
    <div>
      <div className="card">
        <h2>Create Task</h2>

        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          placeholder="Assigned User ID"
          value={form.assignedTo}
          onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
        />

        <input
          placeholder="Project ID"
          value={form.projectId}
          onChange={(e) => setForm({ ...form, projectId: e.target.value })}
        />

        <input
          type="date"
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
        />

        <select
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <button className="primary" onClick={createTask}>
          Create Task
        </button>
      </div>

      {tasks.map((task) => (
        <div className="card task" key={task._id}>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <p>Due: {task.dueDate?.slice(0, 10)}</p>

          <button onClick={() => updateStatus(task._id, "To Do")}>
            To Do
          </button>
          <button onClick={() => updateStatus(task._id, "In Progress")}>
            In Progress
          </button>
          <button onClick={() => updateStatus(task._id, "Done")}>
            Done
          </button>
        </div>
      ))}
    </div>
  );
}
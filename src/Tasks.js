import { useEffect, useState } from "react";

export default function Tasks({ token }) {
  const [tasks, setTasks] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    assignedTo: "",
    projectId: "",
    dueDate: ""   // ✅ ADD
  });

  // 🔹 Load tasks
  const loadTasks = async () => {
    const res = await fetch("https://team-manager-backend-production-1391.up.railway.app", {
      headers: { Authorization: token }
    });
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, [token]);

  // 🔹 Create task
  const createTask = async () => {
    await fetch("/api/tasks", {
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

    loadTasks();
  };

  // 🔹 Update status
  const updateStatus = async (id, status) => {
    await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ status })
    });

    loadTasks();
  };

  return (
    <div>
      <h2>Tasks</h2>

      {/* Create Task */}
      <input placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <br />

      <input placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <br />

      <input placeholder="Assigned User ID"
        value={form.assignedTo}
        onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
      />
      <br />

      <input placeholder="Project ID"
        value={form.projectId}
        onChange={(e) => setForm({ ...form, projectId: e.target.value })}
      />
      <br />

      <input type="date"
        value={form.dueDate}
        onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
      />
      <br />

      <select
        value={form.priority}
        onChange={(e) => setForm({ ...form, priority: e.target.value })}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <br />
      <button onClick={createTask}>Create Task</button>

      <hr />

      {/* Task List */}
      {tasks.map((task) => (
        <div key={task._id}>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <p>Due: {task.dueDate?.slice(0,10)}</p>

          <button onClick={() => updateStatus(task._id, "To Do")}>To Do</button>
          <button onClick={() => updateStatus(task._id, "In Progress")}>In Progress</button>
          <button onClick={() => updateStatus(task._id, "Done")}>Done</button>

          <hr />
        </div>
      ))}
    </div>
  );
}
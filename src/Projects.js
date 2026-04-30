import { useEffect, useState } from "react";

export default function Projects({ token }) {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");

  const [projectId, setProjectId] = useState("");
  const [userId, setUserId] = useState("");

  const loadProjects = async () => {
    const res = await fetch(`${BASE_URL}/api/projects`, {
      headers: { Authorization: token }
    });
    const data = await res.json();
    setProjects(data);
  };

  useEffect(() => {
    loadProjects();
  }, [token]);

  // ✅ Create
  const createProject = async () => {
    await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ name })
    });

    setName("");
    loadProjects();
  };

  // ✅ Add member
  const addMember = async () => {
    await fetch("/api/projects/add-member", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ projectId, userId })
    });

    loadProjects();
  };

  // ✅ Remove member
  const removeMember = async () => {
    await fetch("/api/projects/remove-member", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ projectId, userId })
    });

    loadProjects();
  };

  return (
    <div>
      <h2>Projects</h2>

      {/* Create Project */}
      <input
        placeholder="Project name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={createProject}>Create</button>

      <hr />

      {/* Add / Remove member */}
      <input
        placeholder="Project ID"
        onChange={(e) => setProjectId(e.target.value)}
      />
      <input
        placeholder="User ID"
        onChange={(e) => setUserId(e.target.value)}
      />

      <button onClick={addMember}>Add Member</button>
      <button onClick={removeMember}>Remove Member</button>

      <hr />

      {/* List Projects */}
      {projects.map((p) => (
        <div key={p._id}>
          <p>{p.name}</p>
        </div>
      ))}
    </div>
  );
}
import { useEffect, useState } from "react";

const BASE_URL = "https://team-manager-backend-production-1391.up.railway.app";

export default function Projects({ token }) {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [projectId, setProjectId] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      const res = await fetch(`${BASE_URL}/api/projects`, {
        headers: { Authorization: token }
      });

      const data = await res.json();
      setProjects(data);
    };

    loadProjects();
  }, [token]);

  const createProject = async () => {
    await fetch(`${BASE_URL}/api/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ name })
    });

    setName("");
  };

  const addMember = async () => {
    await fetch(`${BASE_URL}/api/projects/add-member`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ projectId, userId })
    });
  };

  const removeMember = async () => {
    await fetch(`${BASE_URL}/api/projects/remove-member`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ projectId, userId })
    });
  };

  return (
    <div>
      <div className="card">
        <h2>Create Project</h2>

        <input
          placeholder="Project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button className="primary" onClick={createProject}>
          Create
        </button>
      </div>

      <div className="card">
        <h3>Add / Remove Member</h3>

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
      </div>

      {projects.map((p) => (
        <div className="card" key={p._id}>
          {p.name}
        </div>
      ))}
    </div>
  );
}
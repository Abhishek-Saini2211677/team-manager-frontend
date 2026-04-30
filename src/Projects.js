import { useEffect, useState } from "react";

const BASE_URL = "https://team-manager-backend-production-1391.up.railway.app";

export default function Projects({ token }) {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");

  const [projectId, setProjectId] = useState("");
  const [userId, setUserId] = useState("");

  // ✅ FIXED useEffect (no warning now)
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

  // ✅ Create
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

  // ✅ Add member
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

  // ✅ Remove member
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
      <h2>Projects</h2>

      <input
        placeholder="Project name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={createProject}>Create</button>

      <hr />

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

      {projects.map((p) => (
        <div key={p._id}>
          <p>{p.name}</p>
        </div>
      ))}
    </div>
  );
}
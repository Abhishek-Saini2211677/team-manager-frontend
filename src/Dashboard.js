import { useEffect, useState } from "react";

const BASE_URL = "https://team-manager-backend-production-1391.up.railway.app";

export default function Dashboard({ token }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/api/dashboard`, {
      headers: { Authorization: token },
    })
      .then((res) => res.json())
      .then(setData);
  }, [token]);

  if (!data) return <p className="container">Loading...</p>;

  return (
    <div>
      <h2>Dashboard</h2>

      <div className="dashboard-grid">
        <div className="stat-box">Total: {data.total}</div>
        <div className="stat-box">To Do: {data.todo}</div>
        <div className="stat-box">In Progress: {data.inProgress}</div>
        <div className="stat-box">Done: {data.done}</div>
        <div className="stat-box">Overdue: {data.overdue}</div>
      </div>

      <div className="card">
        <h3>Tasks Per User</h3>
        <ul>
          {Object.entries(data.tasksPerUser || {}).map(([user, count]) => (
            <li key={user}>{user}: {count}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
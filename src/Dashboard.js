import { useEffect, useState } from "react";

const BASE_URL = "https://team-manager-backend-production-1391.up.railway.app";

export default function Dashboard({ token }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/api/dashboard`, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("Dashboard error:", err));
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2>Dashboard</h2>

      <button onClick={handleLogout}>Logout</button>

      <p>Total: {data.total}</p>
      <p>To Do: {data.todo}</p>
      <p>In Progress: {data.inProgress}</p>
      <p>Done: {data.done}</p>
      <p>Overdue: {data.overdue}</p>

      <h3>Tasks Per User</h3>
      <ul>
        {Object.entries(data.tasksPerUser || {}).map(([user, count]) => (
          <li key={user}>
            {user}: {count}
          </li>
        ))}
      </ul>
    </div>
  );
}
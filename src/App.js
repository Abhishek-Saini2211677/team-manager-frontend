import { useState } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Tasks from "./Tasks";
import Projects from "./Projects";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [page, setPage] = useState("dashboard");

  if (!token) return <Login setToken={setToken} />;

  return (
    <div>
      <button onClick={() => setPage("dashboard")}>Dashboard</button>
      <button onClick={() => setPage("tasks")}>Tasks</button>
      <button onClick={() => setPage("projects")}>Projects</button>
      <button onClick={() => {
        localStorage.removeItem("token");
        window.location.reload();
      }}>
        Logout
      </button>

      <hr />

      {page === "dashboard" && <Dashboard token={token} />}
      {page === "tasks" && <Tasks token={token} />}
      {page === "projects" && <Projects token={token} />}
    </div>
  );
}

export default App;
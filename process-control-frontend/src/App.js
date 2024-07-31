import React, { useEffect, useState, useTransition } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [processes, setProcesses] = useState("");
  const [pid, setPid] = useState("");
  const [action, setAction] = useState("");

  const fetchProcesses = async () => {
    try {
      const res = await axios.get("http://localhost:3000/processes", {
        auth: {
          username: "admin",
          password: "password",
        },
      });
      setProcesses(res.data);
    } catch (error) {
      console.error("Error fetching processes:", error);
    }
  };

  const controlProcess = async () => {
    try {
      await axios.get(`http://localhost:3000/processes/${pid}/${action}`, {
        auth: {
          username: "admin",
          password: "password",
        },
      });
      fetchProcesses(); // Refresh the process list
    } catch (error) {
      console.error("Error controlling process:", error);
    }
  };

  useEffect(() => {
    fetchProcesses();
  }, []);

  return (
    <>
      <div className="container">
        <div className="list">
          <h2>Process List</h2>
          <pre>{processes}</pre>
        </div>
        <div className="control">
          <h2>Control Process</h2>
          <input
            type="text"
            placeholder="PID"
            value={pid}
            onChange={(e) => setPid(e.target.value)}
          />
          <select value={action} onChange={(e) => setAction(e.target.value)}>
            <option value="">Select Action</option>
            <option value="stop">Stop</option>
            <option value="start">Start</option>
            <option value="restart">Restart</option>
          </select>
          <button onClick={controlProcess}>Execute</button>
        </div>
      </div>
    </>
  );
}

export default App;

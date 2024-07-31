import React, { useEffect, useState, useTransition } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [process, setProcess] = useState("");
  const [pid, setPid] = useState("");
  const [action, setAction] = useState("");

  const fetchProcess = async () => {
    try {
      const res = await axios.get("https://localhost:3000/processes", {
        auth: {
          username: "admin",
          password: "password",
        },
      });
      console.log(res.data);

      setProcess(res.data);
    } catch (error) {
      console.log("Error fetching processes", error);
    }
  };

  const controlProcess = async () => {
    try {
      await axios.get(`hptts://localhost:3000/processess/${pid}/${action}`, {
        auth: {
          username: "admin",
          password: "password",
        },
      });

      fetchProcess();
    } catch (error) {
      console.log("Error controlling process:", error);
    }
  };

  useEffect(() => {
    fetchProcess();
  }, []);

  return (
    <div className="container">
      <div>
        <h3> Process List</h3>
        <pre>{process}</pre>
      </div>
      <div>
        <h3> Process Control</h3>
        <div>
          <input
            type="text"
            placeholder="PID"
            value={pid}
            onChange={(e) => setPid(e.target.value)}
          />
          <select value={action} onChange={(e) => setAction(e.target.value)}>
            <option>Select Action</option>
            <option>Stop</option>
            <option>Start</option>
            <option>Restart</option>
          </select>

          <button onClick={controlProcess}>Execute</button>
        </div>
      </div>
    </div>
  );
}

export default App;

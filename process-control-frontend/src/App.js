import React, { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [process, setProcess] = useState("");

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
          <input type="text" placeholder="PID" />
          <select></select>
        </div>
      </div>
    </div>
  );
}

export default App;

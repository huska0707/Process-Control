const express = require("express");
const { exec, execSync } = require("child_process");
const app = express();
const port = 3000;

app.get("/processes", (req, res) => {
  exec("tasklist", (err, stdout, stderr) => {
    if (err) {
      res.status(500).send(`Error: ${stderr}`);
      return;
    }
    res.send(`<pre>${stdout}</pre>`);
  });
});

app.get("/processes/:pid/:action", (req, res) => {
  const { pid, action } = req.params;
  let command;

  switch (action) {
    case "stop":
      command = `taskkill /PID ${pid} /F`;
      break;
    case "start":
      command = `start /B "your_program.exe"`;
      break;
    case "restart":
      command = `taskkill /PID ${pid} /F && start /B "your_program.exe"`;
      break;
    default:
      res.status(400).send("Invalid action");
      return;
  }

  exec(command, (err, stdout, stderr) => {
    if (err) {
      res.status(500).send(`Error: ${stderr}`);
      return;
    }
    res.send(`Action '${action}' performed on process ${pid}.`);
  });
});

app.listen(port, () => {
  console.log(`Process control app listening at http://localhost:${port}`);
});

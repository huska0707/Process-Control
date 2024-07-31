const express = require("express");
const { exec } = require("child_process");
const basicAuth = require("basic-auth");

const app = express();
const port = 3000;

const auth = (req, res, next) => {
  const user = basicAuth(req);
  if (!user || user.name !== "admin" || user.pass !== "password") {
    res.set("WWW-Authenticate", 'Basic realm="example"');
    return res.status(401).send("Authentication required.");
  }
  next();
};

const isWindows = process.platform === "win32";

app.get("/processes", auth, (req, res) => {
  const command = isWindows ? "tasklist" : "ps -e";
  exec(command, (err, stdout, stderr) => {
    if (err) {
      res.status(500).send(`Error: ${stderr}`);
      return;
    }
    res.send(`<pre>${stdout}</pre>`);
  });
});

app.get("/processes/:pid/:action", auth, (req, res) => {
  const { pid, action } = req.params;
  let command;

  switch (action) {
    case "stop":
      command = isWindows ? `taskkill /PID ${pid} /F` : `kill -9 ${pid}`;
      break;
    case "start":
      command = isWindows
        ? `start /B "your_program.exe"`
        : `nohup your_program &`;
      break;
    case "restart":
      command = isWindows
        ? `taskkill /PID ${pid} /F && start /B "your_program.exe"`
        : `kill -9 ${pid} && nohup your_program &`;
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

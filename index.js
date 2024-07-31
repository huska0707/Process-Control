const express = require("express");
const { exec, execSync } = require("child_process");
const app = express();
const port = 3000;

app.get("/process", (req, res) => {
  exec("tasklist", (err, stdout, stderr) => {
    if (err) {
      res.status(500).send(`Error: ${stderr}`);
      return;
    }
    res.send(`<pre>${stdout}</pre>`);
  });
});

app.listen(port, () => {
  console.log(`Process control app listening at https://localhost:${port}`);
});

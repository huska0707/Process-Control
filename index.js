const express = require("express");

const app = express();

app.get("/process", (req, res) => {});

app.listen(port, () => {
  console.log(`Process control app listening at https://localhost:${port}`);
});

const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

// console log for server running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get("/express_backend", (req, res) => {
  res.send({express: "Express server connected to React!"});
});

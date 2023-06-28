const express = require("express");
const subjetsRouter = require("./routes/getSubjects");
const app = express();
const PORT = 5001;

// Middleware and configuration

app.use(express.json());

// Mount routes
app.use("/getsubjects", subjetsRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

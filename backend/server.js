require("dotenv").config();

const express = require("express");
const cors = require("cors");

const jobRoutes = require("./routes/jobRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/jobs", jobRoutes);
const db = require("./db/db");


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  db.getConnection((err) => {
    if (err) console.error("❌ DB connection failed:", err.message);
    else console.log("✅ DB connected successfully");
  });
  console.log(`Server running on port ${PORT}`);
});

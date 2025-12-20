require("dotenv").config();
const express = require("express");
const cors = require("cors");

const db = require("./db/db.js");
const jobRoutes = require("./routes/jobRoutes");

const app = express();

app.use(cors({
  origin: [      
    "https://job-scheduler-2.onrender.com" 
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use("/api/jobs", jobRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

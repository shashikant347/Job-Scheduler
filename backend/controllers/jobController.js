const db = require("../db/db.js");
const triggerWebhook = require("../utils/webhook");

// ================= CREATE JOB =================
exports.createJob = (req, res) => {
  const { taskName, payload, priority } = req.body;

  const sql =
    "INSERT INTO jobs (taskName, payload, priority, status) VALUES (?, ?, ?, 'pending')";

  db.query(
    sql,
    [taskName, JSON.stringify(payload), priority],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Job created successfully", jobId: result.insertId });
    }
  );
};

// ================= GET ALL JOBS =================
exports.getJobs = (req, res) => {
  const sql = `
    SELECT id, taskName, payload, priority, status, createdAt
    FROM jobs
    ORDER BY createdAt DESC
  `;
  

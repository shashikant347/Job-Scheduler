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
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// ================= GET JOB BY ID =================
exports.getJobById = (req, res) => {
  const sql = `
    SELECT id, taskName, payload, priority, status, createdAt
    FROM jobs
    WHERE id = ?
  `;
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0) return res.status(404).json({ message: "Job not found" });
    res.json(result[0]);
  });
};

// ================= RUN JOB =================
exports.runJob = (req, res) => {
  const { id } = req.params;

  const selectSql = `
    SELECT id, taskName, payload, priority, status, createdAt
    FROM jobs
    WHERE id = ?
  `;

  db.query(selectSql, [id], async (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(404).json({ message: "Job not found" });

    const job = results[0];

    db.query("UPDATE jobs SET status = 'completed' WHERE id = ?", [id], async (err) => {
      if (err) return res.status(500).json(err);

      await triggerWebhook(job);

      res.json({
        message: "Job executed successfully",
        job
      });
    });
  });
};

const express = require("express");
const router = express.Router();


router.post("/", createJob);
router.get("/", getJobs);
router.get("/:id", getJobById);
router.post("/run/:id", runJob);

module.exports = router;

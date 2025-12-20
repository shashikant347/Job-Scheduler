const axios = require("axios");

module.exports = async (job) => {
  try {
    // ✅ SAFE payload handling (string ya object dono case me)
    let payload = {};

    if (job.payload) {
      if (typeof job.payload === "string") {
        payload = JSON.parse(job.payload); // DB se string aaye to
      } else {
        payload = job.payload; // already object ho to
      }
    }

    const response = await axios.post(
      process.env.WEBHOOK_URL,
      {
        jobId: job.id,
        taskName: job.taskName,
        priority: job.priority,
        payload: payload,
        status: job.status,
        completedAt: new Date().toISOString()
      },
      {
        headers: {
          "Content-Type": "application/json"
        },
        timeout: 5000
      }
    );

    console.log("✅ Webhook Success:", response.data,response.status);
  } catch (err) {
    console.error(
      "❌ Webhook Error:",
      err.response?.data || err.message
    );
  }
};

import React, { useState } from "react";
import axios from "axios";

const JobForm = ({ onJobCreated }) => {
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("Low");
  const [payload, setPayload] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let parsedPayload = {};
    try {
      parsedPayload = payload ? JSON.parse(payload) : {};
    } catch (error) {
      alert("Payload must be valid JSON");
      console.log(error);
      return;
    }

    try {
      const res = await axios.post("https://job-scheduler-g443.onrender.com/api/jobs", {
        taskName,
        priority,
        payload: parsedPayload
      });

      onJobCreated(res.data);

      // Reset form
      setTaskName("");
      setPriority("Low");
      setPayload("");
    } catch (error) {
      console.error(error);
      alert("Error creating job");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md mb-6 w-full max-w-md mx-auto"
    >
      <h2 className="text-xl font-bold mb-4 text-center">Create New Job</h2>

      <div className="mb-4">
        <label className="block font-medium mb-1">Task Name</label>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
          className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Payload (JSON)</label>
        <textarea
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
          placeholder='{"key": "value"}'
          className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg transition"
      >
        Create Job
      </button>
    </form>
  );
};

export default JobForm;

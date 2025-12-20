import React, { useState } from "react";
import JobDetail from "./JobDetail";

const JobTable = ({ jobs, onRunJob }) => {
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm">
        <thead className="bg-blue-100">
          <tr>
            <th className="p-3 text-left border-b">ID</th>
            <th className="p-3 text-left border-b">Task Name</th>
            <th className="p-3 text-left border-b">Priority</th>
            <th className="p-3 text-left border-b">Status</th>
            <th className="p-3 text-center border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id} className="hover:bg-gray-50 transition">
              <td className="p-3 border-b">{job.id}</td>
              <td className="p-3 border-b">{job.taskName}</td>
              <td className={`p-3 border-b font-semibold ${
                job.priority === "High"
                  ? "text-red-500"
                  : job.priority === "Medium"
                  ? "text-yellow-500"
                  : "text-green-500"
              }`}>
                {job.priority}
              </td>
              <td className={`p-3 border-b font-medium ${
                job.status === "pending"
                  ? "text-gray-500"
                  : job.status === "running"
                  ? "text-blue-500"
                  : "text-green-600"
              }`}>
                {job.status}
              </td>
              <td className="p-3 border-b flex justify-center gap-2">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg transition"
                  onClick={() => onRunJob(job.id)}
                >
                  Run Job
                </button>
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-lg transition"
                  onClick={() => setSelectedJob(job)}
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedJob && (
        <JobDetail job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  );
};

export default JobTable;

import React from "react";

const JobDetail = ({ job, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Job Details</h2>
        <div className="space-y-2">
          <p><strong>ID:</strong> {job.id}</p>
          <p><strong>Task Name:</strong> {job.taskName}</p>
          <p><strong>Priority:</strong> {job.priority}</p>
          <p><strong>Status:</strong> {job.status}</p>
          <p><strong>Payload:</strong></p>
          <pre className="bg-gray-100 p-2 rounded text-sm">{JSON.stringify(job.payload, null, 2)}</pre>
        </div>
        <button
          className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default JobDetail;

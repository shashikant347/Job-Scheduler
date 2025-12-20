import React, { useEffect, useState } from "react";
import { getJobs, runJob } from "../api/jobApi";
import JobTable from "../components/JobTable";
import Filters from "../components/Filters";
import JobForm from "../components/JobForm";

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  const fetchJobs = async () => {
    try {
      const data = await getJobs();
      setJobs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching jobs", error);
      setJobs([]);
    }
  };

  const handleRunJob = async (id) => {
    try {
      await runJob(id);
      fetchJobs();
    } catch (error) {
      console.error("Error running job", error);
    }
  };

  const handleJobCreated = (newJob) => {
    setJobs((prev) => [...prev, newJob]);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = Array.isArray(jobs)
    ? jobs.filter((job) => 
        (statusFilter ? job.status === statusFilter : true) &&
        (priorityFilter ? job.priority === priorityFilter : true)
      )
    : [];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Job Scheduler Dashboard</h1>

      {/* Create Job Form */}
      <JobForm onJobCreated={handleJobCreated} />

      {/* Filters */}
      <Filters
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
      />

      {/* Job Table */}
      <JobTable jobs={filteredJobs} onRunJob={handleRunJob} />
    </div>
  );
};

export default App;

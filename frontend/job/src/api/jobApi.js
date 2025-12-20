import axios from "axios";

const BASE_URL = "https://job-scheduler-g443.onrender.com";

export const createJob = async (job) => {
  const res = await axios.post(BASE_URL, job);
  return res.data;
};

export const getJobs = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const getJobById = async (id) => {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
};

export const runJob = async (id) => {
  const res = await axios.post(`${BASE_URL}/run/${id}`);
  return res.data;
};

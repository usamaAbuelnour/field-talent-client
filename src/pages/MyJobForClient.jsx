import React, { useEffect, useState } from 'react';
import apiService from '../Api/AxiosServiceConfiguration';
import Loading from '../components/uiComponents/Loading';
import { MapPin } from 'lucide-react';
import Button from "../components/uiComponents/Button"


import { useNavigate } from 'react-router-dom';

export const JobCard = ({ job }) => {
  const navigate = useNavigate();
  

  const handleViewProposals = () => {
    navigate(`/job/${job._id}`, { state: { job } });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-14 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
       <div className="flex justify-between mb-2">
        <p className="text-sm text-gray-600"><span className="font-semibold">Created At:</span> {new Date(job.createdAt).toLocaleString()}</p>
        <h2 className="text-2xl font-bold text-main mb-4 pb-2 text-center border-b-0">{job.title}</h2>
      </div>
      <hr className="border-t-2 border-main w-full mb-6" />

     
      <p className="mb-6 p-2"><span className="font-semibold text-main">Description:</span> {job.description}</p>
      <div className="flex justify-between mb-4">
        <p className="mb-2 p-2"><span className="font-semibold text-main">Category:</span> {job.category}</p>
        <p className="mb-2 text-main border p-2  rounded-full "><span className="font-semibold ">Service:</span> {job.service.join(' | ')}</p>
      </div>
      <div className="flex justify-between mb-4">
      <p className="mb-2 p-2"><span className="font-semibold text-main">Location:</span> {job.location}</p>

     
      <button onClick={handleViewProposals} className="bg-main text-white py-2 px-4 rounded">View Proposals</button>
    </div>
    </div>
  );
};


export default function MyJobForClient() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchJobs = async () => {
      try {
        const response = await apiService.clientJobs();
        setJobs(response.data.jobs);
        console.log(response.data.jobs);
 console.log(response);
 
      } catch (err) {
        console.error(err);
        setError('Failed to fetch jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-center text-2xl text-red-600 m-96">{error}</div>;
  }

  return (
    <div className=" md:mx-20 px-4 py-8 my-24" >
      <h1 className="text-4xl font-bold text-main text-center mb-10">My Jobs</h1>
      <div className="space-y-20">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
}

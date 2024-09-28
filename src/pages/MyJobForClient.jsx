import React, { useEffect, useState } from 'react';
import apiService from '../Api/AxiosServiceConfiguration';
import Loading from '../components/uiComponents/Loading';
import { MapPin } from 'lucide-react';

const JobCard = ({ job }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 mb-14 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]">
    <h2 className="text-2xl font-bold text-main mb-4 pb-2 border-b-2 border-main text-center">{job.title}</h2>
    <p className="mb-6"><span className="font-semibold text-main">Description:</span> {job.description}</p>
    <div  className="flex justify-between mb-6">
    <p className="mb-2"><span className="font-semibold text-main">Category:</span> {job.category}</p>
    <p className="mb-2"><span className="font-semibold text-main">Service:</span> {job.service.join(' | ')}</p> 
    </div>


    <div   className="flex justify-between mb-2">
    <p className="text-sm text-gray-600"><span className="font-semibold">Created At:</span> {new Date(job.createdAt).toLocaleString()}</p>
    <p className="mb-2"><span className="font-semibold text-main"> <MapPin size={17} className="mr-2 text-main inline-block" />Location:</span> {job.location}</p>

    <p className="text-sm text-gray-600"><span className="font-semibold">Updated At:</span> {new Date(job.updatedAt).toLocaleString()}</p>
    </div>
   
  </div>
);

export default function EnhancedJobListing() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0,0);
    const fetchJobs = async () => {
      try {
        const response = await apiService.clientJobs();
        setJobs(response.data.jobs);
        console.log(response.data.jobs);
        
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
    return <div className="text-center text-2xl text-red-600 mt-12">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 my-11" >
      <h1 className="text-4xl font-bold text-main text-center mb-10">My Jobs</h1>
      <div className="space-y-6">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import apiService from '../Api/AxiosServiceConfiguration';
import Loading from '../components/uiComponents/Loading';
import { MapPin } from 'lucide-react';
import Button from "../components/uiComponents/Button"
import { useNavigate } from 'react-router-dom';



export const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleViewProposals = () => {
    navigate(`/job/${job._id}`, { state: { job } });
  };

  const isLongDescription = job.description.length > 400;
  const shortDescription = isLongDescription
    ? job.description.slice(0, 400) + '...'
    : job.description;

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="bg-slate-100 rounded-lg shadow-sm p-4 sm:p-6 mb-2 border border-main dark:bg-gradient-to-r dark:from-main dark:to-main-dark dark:bg-opacity-20 dark:shadow-2xl text-center sm:text-left">
      <div className="relative mb-8 sm:mb-10">
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-0 sm:absolute sm:top-0 sm:left-0">
          <span>Date:</span> {new Date(job.createdAt).toLocaleDateString()}
        </p>
        <h2 className="text-xl dark:text-accent sm:text-2xl font-bold text-main text-center sm:absolute sm:top-0 sm:left-1/2 sm:-translate-x-1/2">
          {job.title}
        </h2>
      </div>

      <hr className="border-t-1 border-main w-3/4 mb-4 sm:mb-6 mx-auto" />

      <div className="mb-4 sm:mb-6">
        <span className="font-semibold text-main text-sm sm:text-base">Description:</span>
        <p className='mt-2 text-sm sm:text-base dark:text-white break-all'>
          {isLongDescription && !showFullDescription ? shortDescription : job.description}
        </p>
        {isLongDescription && (
          <button
            onClick={toggleDescription}
            className="text-main hover:underline mt-2 text-sm sm:text-base dark:text-white"
          >
            {showFullDescription ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-between mb-2 text-center sm:text-left">
        <p className="mb-2 sm:mb-0 text-xs sm:text-sm dark:text-white">
          <span className="font-semibold text-main dark:text-white">Category :</span> {job.category}
        </p>
        <div className="flex flex-wrap gap-1 justify-center sm:justify-start">
          {job.service.map((service, index) => (
            <span
              key={index}
              className="text-main dark:text-white border p-2 lg:p-3 border-gray-400 border-y-2 sm:p-1 dark:border-accent rounded-full text-xs sm:text-sm"
            >
              {service}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col  sm:flex-row justify-center sm:justify-between items-center text-center sm:text-left">
        <p className="sm:mb-0 text-xs sm:text-sm dark:text-white">
          <span className="font-semibold dark:text-white text-main">Location:</span> {job.location}
        </p>
        <Button
          text="View Proposals"
          onClick={handleViewProposals}
          variant="fill"
          size="sm"
          className="mt-2 sm:mt-0"
        />
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
    <div className=" md:mx-20 px-4 py-4 my-10" >
      <h1 className="text-4xl font-bold text-main text-center mb-8 dark:text-accent">My Jobs</h1>
      <div className="space-y-6">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
}

import React from 'react';
import { useLocation } from 'react-router-dom';
import JobDetails from '../components/JobDetailsForApplyComponents/JobDetails';
import ClientDetails from '../components/JobDetailsForApplyComponents/ClientDetails';

const JobDetailsForApply = () => {
  const location = useLocation();
  const job = location.state?.job;

  return (
    
      <div className="relative z-10 container mx-auto my-10 p-6 overflow-x-hidden">
        <div className="flex flex-col lg:flex-row gap-8 mt-9">
          <div className="md:flex-2 w-full lg:w-1/5 order-2 lg:order-1">
            <ClientDetails />
          </div>
          <div className="md:flex-1 w-full lg:w-4/5 order-1 lg:order-2">
            {job ? (
              <JobDetails job={job} />
            ) : (
              <div>No job data available. Please go back and try again.</div>
            )}
          </div>
        </div>
      </div>
    
  );
};

export default JobDetailsForApply;

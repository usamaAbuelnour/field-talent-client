import { useLocation } from 'react-router-dom';
import JobDetails from '../components/JobDetailsForApplyComponents/JobDetails';
import { Navigate } from "react-router-dom";
import ClientDetails from './../components/JobDetailsForApplyComponents/ClientDetails';

const JobDetailsForApply = () => {
  const location = useLocation();
  const job = location.state?.job;

  return (
    <div className="relative container mx-auto my-10 p-6 overflow-x-hidden">
      <div className="mt-9 ">
        <div className=" absolute w-full md:-top-7 -top-11 -right-0">
          {job ? <ClientDetails user={job.userId} /> : null}
        </div>
        <div className="w-full mt-4 ">
          {job ? (
            <JobDetails job={job} />
          ) : (
            <Navigate to="/NotFound" />
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetailsForApply;
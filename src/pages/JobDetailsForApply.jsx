import JobDetails from '../components/JobDetailsForApplyComponents/JobDetails';
import ClientDetails from '../components/JobDetailsForApplyComponents/ClientDetails';

const JobDetailsForApply = () => {
  return (
    <div className="container mx-auto my-10 p-6 ">
      <div className="flex flex-col md:flex-row gap-8 mt-9">
        <div className="md:flex-2 w-full md:w-1/5">
          <ClientDetails />
        </div>

        <div className="md:flex-1 w-full md:w-4/5">
          <JobDetails />
        </div>
      </div>
    </div>
  );
};

export default JobDetailsForApply;

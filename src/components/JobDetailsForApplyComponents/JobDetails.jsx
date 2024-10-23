import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import ApplyPopup from './ApplyPopup';
import { useEffect, useState } from 'react';

const FieldLoader = () => (
  <div className="inline-block w-4 h-4 border-t-2 border-main rounded-full animate-spin ml-2"></div>
);

const JobDetails = ({ job }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleApplyNowClick = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);
  return (
    <div>
      <h2 className="font-bold mb-10 text-2xl sm:text-xl md:text-3xl text-main text-center dark:text-accent">
        {job.title}
      </h2>



      <div className="mb-4 flex flex-col sm:flex-col md:flex-row justify-between items-start md:items-center mx-4  gap-2">
        <div className="order-1 md:order-none text-lg sm:text-lg md:text-xl text-gray-400 dark:text-white ">
          Created: {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : <FieldLoader />}
        </div>
        <div className="order-3 md:order-none text-main flex items-center gap-2 dark:text-white">
          <MapPin />
          <span className="text-lg sm:text-xl md:text-2xl">{job.location}</span>
        </div>
        <div className="order-2 md:order-none text-lg sm:text-lg md:text-xl text-gray-400 dark:text-white">
          Updated: {job.updatedAt ? new Date(job.updatedAt).toLocaleDateString() : <FieldLoader />}
        </div>
      </div>




      <p className="text-gray-700 my-11 dark:text-white text-base sm:text-lg md:text-xl mx-4 break-words">
        Description: {job.description || <FieldLoader />}
      </p>

      <div className="text-lg sm:text-lg md:text-xl font-semibold mb-2 dark:text-white text-main mx-4">
        Category: {job.category || <FieldLoader />}
      </div>
      <div className="text-lg  mb-4 dark:text-white text-main mx-2 p-2  w-fit rounded-full">
        Service: {job.service && job.service.length > 0 ? job.service.join('  |  ') : <FieldLoader />}
      </div>

      <div className="flex justify-center mb-4">
        <button
          onClick={handleApplyNowClick}
          className="bg-main text-white px-6 py-3 rounded hover:bg-teal-700"
        >
          Apply Now
        </button>
      </div>

      {isPopupOpen && <ApplyPopup closePopup={closePopup} jobId={job._id} />}
    </div>
  );
};

export default JobDetails;

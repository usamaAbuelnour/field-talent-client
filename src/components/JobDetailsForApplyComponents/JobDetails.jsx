import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import ApplyPopup from './ApplyPopup';
import { useEffect, useState } from 'react';

const FieldLoader = () => (
  <div className="inline-block w-4 h-4 border-t-2 border-main  rounded-full animate-spin ml-2 mt-4 "></div>
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
    <div className='md:mt-16 mt-24 border-2 shadow-md rounded-lg  dark:border-main'>
      
      <h2 className="rounded-md w-fit mx-auto pt-3  pb-1 mb-2 md:mb-6 text-2xl  md:text-3xl text-accent-dark text-center dark:text-accent  ">
       {job.title}
      </h2>

      <div className=" flex flex-col  md:flex-row justify-between  md:items-center mx-4 items-center gap-2">
        <div className="order-1 md:order-none text-lg  md:text-xl text-gray-400 dark:text-white ">
          Created: {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : <FieldLoader />}
        </div>
        <div className="order-3 md:order-none  flex items-center gap-2 ">
          <MapPin className='hidden md:inline text-lg  md:text-xl text-gray-400 dark:text-white' /><p className='md:hidden text-lg  md:text-xl text-gray-400 dark:text-white'>Location:</p>
          <span className="text-lg  md:text-xl text-gray-600 dark:text-white ">{job.location}</span>
        </div>
        <div className="order-2 md:order-none text-lg  md:text-xl text-gray-400 dark:text-white">
          Updated: {job.updatedAt ? new Date(job.updatedAt).toLocaleDateString() : <FieldLoader />}
        </div>
      </div>




      <p className="text-gray-700 my-4 dark:text-white text-base  md:text-xl mx-2 break-words border border-y-slate-100 border-x-0 shadow-sm p-2 pb-5">
       <span className='block   bg-gradient-to-t from-slate-50 to-slate-100 rounded-md text-center mb-2 pb-1 dark:bg-gradient-to-r dark:to-transparent w-fit dark:from-main-dark'> Description  </span> {job.description || <FieldLoader />}
      </p>

      <div className="text-lg  md:text-xl font-semibold dark:text-white text-main mx-4">
        Category: {job.category || <FieldLoader />}
      </div>
      <div className="text-lg  mb-2 dark:text-white text-main mx-2 p-2  w-fit rounded-full">
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
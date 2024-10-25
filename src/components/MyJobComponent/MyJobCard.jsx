import { useEffect, useState } from 'react';
import Button from '../uiComponents/Button';
import { useNavigate } from 'react-router-dom';

 const  MyJobCard = ({ job }) => {
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
        
      <div className="bg-slate-100 rounded-lg shadow-sm p-4 md:p-6 mb-2 border border-main dark:bg-gradient-to-r dark:from-main dark:to-main-dark dark:bg-opacity-20 dark:shadow-2xl text-center text-left">
        <div className="relative mb-8 md:mb-10">
          <p className=" text-sm text-gray-600 dark:text-gray-400 mb-2 md:mb-0 absolute top-0 left-0">
            <span>Date:</span> {new Date(job.createdAt).toLocaleDateString()}
          </p>
          <h2 className="text-xl dark:text-accent md:text-2xl font-bold text-main text-center absolute top-5 md:top-0 left-1/2 -translate-x-1/2 text-nowrap">
            {job.title}
          </h2>
        </div>
  
  
        <div className="mb-2 mt-14 md:mt-2 md border border-x-0 py-2 pb-4 text-left">
          <span className="font-semibold text-main text-sm md:text-base  ">Description:</span>
          <p className='mt-2 text-sm md:text-base dark:text-white break-all  '>
            {isLongDescription && !showFullDescription ? shortDescription : job.description}
          </p>
          {isLongDescription && (
            <button
              onClick={toggleDescription}
              className="text-main hover:underline mt-2 text-sm md:text-base dark:text-white"
            >
              {showFullDescription ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>
  
        <div className="flex flex-col mb-2 ">
  
          <div className='flex flex-col-reverse md:flex-row gap-0  '>
          
          <p className="mb-2 md:text-base text-sm dark:text-white px-1  ">
            <span className="font-semibold text-main dark:text-white ">Category :</span> {job.category}
          </p>
         
          <div className="md:flex  gap-2 justify-center md:gap-1 items-center md:pt-1 my-1 md:my-0 md:mx-1 hidden">
              <div className=" md:w-1 md:h-1 bg-gradient-to-r from-accent-dark  to-accent rounded-full animate-spin  inline-block mb-1 md:mb-0"></div>
              <div className=" md:w-1 md:h-1 bg-gradient-to-r from-accent-dark  to-accent rounded-full animate-spin  inline-block mb-1 md:mb-0"></div>
              <div className=" md:w-1 md:h-1 bg-gradient-to-r from-accent-dark  to-accent rounded-full animate-spin  inline-block mb-1 md:mb-0"></div>
            </div>
        <p className="mb-0 md:text-base text-sm dark:text-white  px-1 ">
            <span className="font-semibold text-main dark:text-white ">Location:</span> {job.location}
          </p>
         
          
          </div>
        
        </div>
  
        <div className="flex md:flex-row flex-col  gap-1 items-center justify-center md:justify-between m ">
        <div className="flex flex-wrap gap-1 justify-center   ">
            {job.service.map((service, index) => (
              <span
                key={index}
                className="text-main dark:text-white border md:p-2 lg:p-3 border-gray-400 border-y-2 p-1 dark:border-accent rounded-full text-sm"
              >
                {service}
              </span>
            ))}
          </div>
          <Button
            text="View Proposals"
            onClick={handleViewProposals}
            variant="fill"
            size="sm"
            className="mt-2 md:mt-0 border-accent border-y-2  dark:border-accent rounded-full  w-fit"
          />
        </div>
      </div>
    );
  };
  

  export default MyJobCard
import React from 'react';
import { MapPin } from 'lucide-react';

const ShowJobCard = ({ job }) => {
  return (
    <div className="w-full px-2 sm:px-4 md:px-10  py-2 sm:py-11 mb-6 sm:mb-8 mx-auto rounded-lg shadow-md bg-gray-100 border border-main border-opacity-30 lg:px-24">
      <h2 className="font-bold mb-2 sm:mb-4 text-center p-1 sm:p-2 mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md rounded-lg text-main text-sm sm:text-base md:text-lg lg:text-xl break-words">
        {job.title}
      </h2>
      <p className="mb-2 sm:mb-4 p-2 sm:p-4 bg-white rounded-md text-xs sm:text-sm md:text-base">
        {job.description}
      </p>
      <div className="flex flex-col mb-1">
        <h3 className="font-semibold p-1 rounded-md text-main text-xs sm:text-sm md:text-base">
          Category: {job.category}
        </h3>
        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center text-xs sm:text-sm md:text-base p-1 sm:p-2">
          <p className="mb-1 sm:mb-0">
            Service: {job.service.join(' | ')}
          </p>
          <div className="flex items-center mt-1 sm:mt-0">
            <MapPin className="text-main" size={16} />
            <span className="ml-1 text-xs sm:text-sm md:text-base">{job.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowJobCard;
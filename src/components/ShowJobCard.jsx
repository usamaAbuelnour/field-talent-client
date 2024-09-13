import React from 'react';
import { MapPin } from 'lucide-react';

const ShowJobCard = ({ job }) => {
  return (
    <div className="w-full p-4 mb-4 mx-auto rounded-lg shadow-md bg-gray-100">
      <h2 className="font-bold mb-4 text-center p-2 mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md rounded-lg bg-main text-white text-base sm:text-lg md:text-xl break-words">
        {job.title}
      </h2>
      <p className="mb-4 p-4 bg-white rounded-md text-base sm:text-sm md:text-lg">
        {job.description}
      </p>
      <div className="flex flex-col">
        <h3 className="font-semibold border border-main p-2 rounded-md mb-2 text-main text-base sm:text-sm md:text-lg">
          Category : {job.category}
        </h3>
        <p className="border border-main p-2 rounded-md mb-2 text-base sm:text-sm md:text-lg">
          Service : {job.service.join(' | ')}
        </p>
        <div className="flex items-center m-3">
          <MapPin className="text-main" size={20} />
          <span className="ml-2 text-base sm:text-sm md:text-lg">{job.location}</span>
        </div>
      </div>
    </div>
  );
};

export default ShowJobCard;

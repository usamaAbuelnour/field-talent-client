import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import ApplyPopup from './ApplyPopup';
import React, { useState } from 'react';

const FieldLoader = () => (
  <div className="inline-block w-4 h-4 border-t-2 border-main rounded-full animate-spin ml-2"></div>
);

const JobDetails = ({ job }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleApplyNowClick = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const ImgUrls = [
    "https://png.pngtree.com/thumb_back/fh260/png-vector/20200530/ourmid/pngtree-shanghai-modern-architecture-shopping-center-building-png-image_2214281.jpg",
    "https://www.nippon.com/ar/ncommon/contents/images/152732/152732.jpg",
    "https://cnn-arabic-images.cnn.io/cloudinary/image/upload/w_780,h_439,c_fill,q_auto/cnnarabic/2014/10/24/images/21376.jpg",
  ];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % ImgUrls.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + ImgUrls.length) % ImgUrls.length);
  };

  return (
    <div>
      <h2 className="font-bold mb-10 text-2xl sm:text-3xl md:text-4xl text-main text-center dark:text-accent">
        {job.title}
      </h2>

      <div className="relative flex items-center justify-center mb-6">
        <button
          onClick={prevImage}
          className="absolute left-2 bg-main text-white p-2 rounded-full hover:bg-opacity-75 transition duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>
        <img
          src={ImgUrls[currentImageIndex]}
          alt="Job"
          className="w-full h-64 object-cover max-w-[80%] border rounded"
        />
        <button
          onClick={nextImage}
          className="absolute right-2 bg-main text-white p-2 rounded-full hover:bg-opacity-75 transition duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="mb-4 flex justify-between items-center mx-4">
        <div className="text-lg sm:text-xl md:text-2xl text-main mb-2 dark:text-white">
          Date: {job.date || <FieldLoader />}
        </div>
        <div className="text-main mb-2 flex items-center gap-2 dark:text-white">
          <MapPin />
          <span className="text-lg sm:text-xl md:text-2xl">{job.location}</span>
        </div>
      </div>

      <p className="text-gray-700 mb-4 dark:text-white text-base sm:text-lg md:text-xl mx-4 break-words">
        Description: {job.description || <FieldLoader />}
      </p>

      <div className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 dark:text-white text-main mx-4">
        Category: {job.category || <FieldLoader />}
      </div>
      <div className="text-lg sm:text-xl md:text-2xl mb-4 dark:text-white text-main mx-4">
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

      {isPopupOpen && <ApplyPopup closePopup={closePopup} />}
    </div>
  );
};

export default JobDetails;

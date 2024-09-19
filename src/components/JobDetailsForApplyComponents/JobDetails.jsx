import React, { useState } from 'react';
import { MapPin } from 'lucide-react'; 
import ApplyPopup from './ApplyPopup';

const JobDetails = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleApplyNowClick = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };
 const imgurl= "https://img.youm7.com/ArticleImgs/2017/3/25/140113-Oak-Alley,-South-Carolina.jpg";
  return (
    <div className="">
      <h2 className=" font-bold mb-4 text-3xl">Job Title</h2>
      <img src={imgurl} alt="Job" className="w-40 h-40 object-cover mb-4" />
      <div className="mb-4 flex gap-9">
        <div className="text-xl text-main mb-2 "> Date: 2024</div>
        <div className=" text-main mb-2 flex gap-2 ">
          <MapPin /> <span>Location</span>
        </div>
        </div>
        <p className="text-gray-700 mb-4">
          Description: This is a brief job description

        </p>
        <div className="text-xl font-semibold mb-2">Category</div>
        <div className="text-xl mb-4">Service</div>
      

      <button
        onClick={handleApplyNowClick}
        className="bg-main text-white px-4 py-2 rounded hover:bg-teal-700"
      >
        Apply Now
      </button>

      {isPopupOpen && <ApplyPopup closePopup={closePopup} />}
    </div>
  );
};

export default JobDetails;
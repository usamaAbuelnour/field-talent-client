/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Pencil, Briefcase, Calendar, Clock, PhoneCall, MapPin } from 'lucide-react';
import axios from 'axios';

const ClientProfile = ({ token }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [client, setClient] = useState({
    name: 'Mostapha Yasser',
    email: 'fatma@gmail.com',
    jobCount: 12,
    joinedDate: '2022-01-10',
    lastJob: '2024-09-18',
    personalIMAGE: "https://ik.imagekit.io/usamaAbuelnour/Client-mostaphayassser256_gmail-com/personal-image/personalImage__mn5LykTa",
    mobile1: '+20 *** *** ****',
    mobile2: '+20 *** *** ****',
    location: 'Cairo, Egypt',
  });

  const handleUpload = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('personalImage', selectedImage);

    setIsUploading(true);
    try {
      const response = await axios.post('https://field-talent.vercel.app/clients/personalImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });

      setClient(prevClient => ({ ...prevClient, personalIMAGE: response.data }));

      handleClose();
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  return (
    <div className="flex items-center justify-center min-h-screen mt-20 md:mt-7 md:px-6 sm:px-2">
      <div className="p-2 w-full mx-auto">
        <div className="text-center">
          <div className="flex flex-col items-center">
            <div className="relative inline-block mb-2">
              <div className="absolute -top-2 -right-2 bg-main rounded-full p-1 cursor-pointer" onClick={() => setShowModal(true)}>
                <Pencil className="text-white" size={16} />
              </div>
              <img
                className="w-36 h-36 rounded-full border-4 border-main shadow-lg object-cover"
                src={client.personalIMAGE}
                alt="Client"
              />
            </div>
            <h2 className="md:text-4xl sm:text-xl font-bold text-main mb-2 flex items-center dark:text-accent">
              {client.name}
              <div className="ml-2 bg-main rounded-full p-1 cursor-pointer" onClick={() => setShowModal(true)}>
                <Pencil className="text-white" size={16} />
              </div>
            </h2>
            <p className="text-lg md:text-xl text-main dark:text-slate-100">{client.email}</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoItem label="Job Count" value={client.jobCount} icon={<Briefcase />} labelSize="text-sm sm:text-lg md:text-xl" />
          <InfoItem label="Location" value={client.location} icon={<MapPin />} labelSize="text-sm sm:text-lg md:text-xl" />
          <InfoItem label="Mobile 1" value={client.mobile1} icon={<PhoneCall />} labelSize="text-sm sm:text-lg md:text-xl" />
          <InfoItem label="Mobile 2" value={client.mobile2} icon={<PhoneCall />} labelSize="text-sm sm:text-lg md:text-xl" />
          <InfoItem label="Last Job" value={client.lastJob} icon={<Clock />} labelSize="text-sm sm:text-lg md:text-xl" />
          <InfoItem label="Joined" value={client.joinedDate} icon={<Calendar />} labelSize="text-sm sm:text-lg md:text-xl" />
        </div>
      </div>

      {showModal && (
        <dialog className="modal" open>
          <div className="modal-box">
            <h2 className="font-bold text-lg">Upload Personal Image</h2>
            <input type="file" accept="image/*" onChange={handleImageChange} className="my-4" />
            <div className="modal-action">
              <button className="btn" onClick={handleUpload} disabled={isUploading}>
                {isUploading ? 'Uploading...' : 'Upload'}
              </button>
              <button className="btn" onClick={handleClose}>Close</button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

const InfoItem = ({ label, value, className = "", icon, labelSize }) => (
  <div className={`px-4 py-1 rounded-lg shadow flex items-center ${className}`}>
    <div className="mr-4 text-main dark:text-accent">
      {icon ? React.cloneElement(icon, { size: 24 }) : <div className="text-gray-400">No Icon</div>}
    </div>
    <div>
      <p className={`font-semibold text-sm sm:text-lg md:text-xl 
    ${labelSize} text-main dark:text-accent`}>{label}</p>
      <p className="text-xl mt-1 dark:text-slate-100 text-gray-700">{value}</p>
    </div>
  </div>
);

export default ClientProfile;

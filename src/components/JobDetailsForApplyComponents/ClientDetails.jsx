import React from 'react';

const ClientDetails = () => {
  return (
    <div className="p-6 dark:bg-main-dark dark:bg-opacity-25 shadow-lg rounded-lg dark:text-white">
      <h2 className="text-xl font-bold text-main mb-4  text-center dark:text-accent ">About Client</h2>
      
      <div className="mb-4 dark:text-white">
        <p className="font-semibold bg-main text-white p-2 rounded m-2">Client Name</p> 
        <p className="ml-2 p-2">Fatma Mohamed</p>
      </div>
      <div className="mb-4 dark:text-white">
        <p className="font-semibold bg-main text-white p-2 rounded m-2">Joined</p> 
        <p className="ml-2 p-2">1-10-2024</p>
      </div>
      <div className="mb-4 dark:text-white">
        <p className="font-semibold bg-main text-white p-2 rounded m-2">Number of Offer Jobs</p> 
        <p className="ml-2 p-2">15</p>
      </div>
    </div>
  );
};

export default ClientDetails;

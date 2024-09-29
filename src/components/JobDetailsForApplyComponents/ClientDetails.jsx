import React from 'react';

const ClientDetails = ({ user }) => {
  return (
    <div className="p-6 dark:bg-main-dark dark:bg-opacity-25 shadow-lg rounded-lg dark:text-white">
      <h2 className="text-xl font-bold text-main mb-4 text-center dark:text-accent">About Client</h2>
      
      <div className="mb-4 dark:text-white">
        <p className="font-semibold bg-main text-white p-2 rounded m-2">Client Name</p> 
        <p className="ml-2 p-2">{user.firstName} {user.lastName}</p>
      </div>
      <div className="mb-4 dark:text-white">
        <p className="font-semibold bg-main text-white p-2 rounded m-2">Joined</p> 
        <p className="ml-2 p-2">{new Date(user.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default ClientDetails;

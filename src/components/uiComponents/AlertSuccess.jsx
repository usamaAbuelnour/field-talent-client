import React from 'react';

export default function AlertSuccess({ message }) {
  return (
    <div role="alert" className="alert alert-success bg-gradient-to-t from-green-200 text-xs to-green-200 my-5 border border-y-2  border-green-400 rounded-md md:rounded-full text-main md:text-base md:font-semibold  ">
   
      <span className='text-center'> 
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 shrink-0 stroke-current inline-block mr-2 p-1 rounded-full bg-slate-200  bg-gradient-to-r from-green-300  to-green-500 text-main  animate-bounce delay-1000  "
        fill="none"
        viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
        
        {message} 
    
      
      </span>
    </div>
  );
}
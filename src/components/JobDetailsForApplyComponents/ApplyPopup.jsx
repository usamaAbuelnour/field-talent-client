
import React, { useEffect, useRef, useState } from 'react';

const ApplyPopup = ({ closePopup }) => {
  const [applicationText, setApplicationText] = useState('');
  const [expectedSalary, setExpectedSalary] = useState('');
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closePopup();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closePopup]);

  const handleSendApproval = () => {
    console.log('Send Approval clicked');
    closePopup();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div
        ref={popupRef}
        className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3"
      >
        <h2 className="text-xl font-bold mb-4">Apply for Job</h2>
        <textarea
          placeholder="Write your comment ..."
          value={applicationText}
          onChange={(e) => setApplicationText(e.target.value)}
          className="w-full h-32 mb-4 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Expected Salary"
          value={expectedSalary}
          onChange={(e) => setExpectedSalary(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <div className="flex justify-between">
          <button
            onClick={handleSendApproval}
            className="bg-main text-white px-4 py-2 rounded hover:bg-teal-700"
          >
            Send Approval
          </button>
          <button
            onClick={closePopup} 
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyPopup;

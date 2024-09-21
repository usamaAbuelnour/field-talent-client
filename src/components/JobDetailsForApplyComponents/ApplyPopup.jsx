import React, { useEffect, useRef, useState } from 'react';

const ApplyPopup = ({ closePopup }) => {
  const [applicationText, setApplicationText] = useState('');
  const [expectedSalary, setExpectedSalary] = useState('EGP ');
  const [errorMessage, setErrorMessage] = useState('');
  const [isTextValid, setIsTextValid] = useState(true); 
  const [isSalaryValid, setIsSalaryValid] = useState(true); 
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
    const charCount = applicationText.trim().length;
    const isTextValid = charCount >= 200;
    const isSalaryValid = expectedSalary.trim() !== 'EGP ' && expectedSalary.trim() !== ''; // التحقق المحدث

    setIsTextValid(isTextValid);
    setIsSalaryValid(isSalaryValid);

    if (!isTextValid || !isSalaryValid) {
      setErrorMessage('Please fill out all fields correctly.');
      return;
    }

    closePopup();
  };

  const handleSalaryChange = (e) => {
    const inputValue = e.target.value;
    if (/^EGP \d*$/.test(inputValue) || inputValue === '') { // السماح بالقيمة الفارغة
      setExpectedSalary(inputValue);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div
        ref={popupRef}
        className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3"
      >
        <h2 className="text-xl font-bold mb-4">Apply for Job</h2>

        {/* حقل الوصف */}
        <textarea
          placeholder="Write your Cover letter (at least 200 characters) ..."
          value={applicationText}
          onChange={(e) => setApplicationText(e.target.value)}
          className={`w-full h-32 mb-4 p-2 border rounded overflow-y-scroll resize-none ${
            !isTextValid ? 'border-red-500' : ''
          }`} 
          style={{ height: '150px', width: '100%', maxHeight: '150px' }}
        />
        {!isTextValid && (
          <p className="text-red-500">Cover letter must be at least 200 characters.</p>
        )}

        {/* حقل الراتب المتوقع */}
        <input
          type="text"
          placeholder="Expected Salary"
          value={expectedSalary}
          onChange={handleSalaryChange}
          className={`w-full mb-4 p-2 border rounded ${
            !isSalaryValid ? 'border-red-500' : ''
          }`} 
        />
        {!isSalaryValid && (
          <p className="text-red-500">Please enter your expected salary.</p>
        )}

        {/* الأزرار */}
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

        {/* رسالة الخطأ العامة */}
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default ApplyPopup;

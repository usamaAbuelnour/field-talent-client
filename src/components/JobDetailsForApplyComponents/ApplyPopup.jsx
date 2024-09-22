/* eslint-disable react/prop-types */
import  { useState } from 'react';

const ApplyPopup = ({ closePopup }) => {
  const [applicationText, setApplicationText] = useState('');
  const [expectedSalary, setExpectedSalary] = useState('EGP ');
  const [descriptionError, setDescriptionError] = useState('');
  const [salaryError, setSalaryError] = useState('');

  const validateDescription = () => {
    const charCount = applicationText.trim().length;
    if (charCount === 0) {
      setDescriptionError('Please enter a cover letter');
      return false;
    } else if (charCount < 150) {
      setDescriptionError('Cover letter must be at least 150 characters.');
      return false;
    }
    setDescriptionError('');
    return true;
  };

  const validateSalary = () => {
    if (expectedSalary.trim() === 'EGP' || expectedSalary.trim() === 'EGP ') {
      setSalaryError('Please enter your expected salary.');
      return false;
    }
    setSalaryError('');
    return true;
  };

  const handleSendApproval = () => {
    const isDescriptionValid = validateDescription();
    const isSalaryValid = validateSalary();

    if (isDescriptionValid && isSalaryValid) {
      closePopup();
    }
  };

  const handleSalaryChange = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue.replace('EGP ', ''))) {
      setExpectedSalary(inputValue);
    }
  };

  const handleKeyPress = (e) => {
    if (!/^[0-9]*$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
      e.preventDefault();
    }
  };

  return (
    <div className="fixed inset-0  flex items-center justify-center  ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-9/12 dark:bg-main-dark ">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 dark:text-accent">Apply for Job</h2>

        <textarea
          placeholder="Write your Cover letter (at least 150 characters) ..."
          value={applicationText}
          onChange={(e) => setApplicationText(e.target.value)}
          className={`w-full h-32 mb-2 p-2 border rounded overflow-y-auto resize-none dark:text-white dark:bg-main-dark ${
            descriptionError ? 'border-red-500' : ''
          }`}
          style={{ minHeight: '150px', maxHeight: '300px' }}
        />
        {descriptionError && <p className="text-red-500 mb-4">{descriptionError}</p>}

        <input
          type="text"
          placeholder="Expected Salary"
          value={expectedSalary}
          onChange={handleSalaryChange}
          onKeyPress={handleKeyPress}
          className={`w-full mb-2 p-2 border rounded   dark:bg-main-dark${
            salaryError ? 'border-red-500' : ''
          }`}
        />
        {salaryError && <p className="text-red-500 mb-4 ">{salaryError}</p>}

        <div className="flex flex-col justify-between mt-4">
          <button
            onClick={handleSendApproval}
            className="bg-main text-white px-4 py-2 rounded hover:bg-teal-700 mb-2"
          >
            Send Approval
          </button>
          <button
            onClick={closePopup}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 dark:text-white  dark:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyPopup;

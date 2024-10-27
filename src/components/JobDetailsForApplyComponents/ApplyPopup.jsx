/* eslint-disable react/prop-types */
import { useState } from 'react';
import apiService from '../../Api/AxiosServiceConfiguration';
import AlertError from './../uiComponents/AlertError';
import AlertSuccess from './../uiComponents/AlertSuccess';

const ApplyPopup = ({ closePopup, jobId }) => {
  const [applicationText, setApplicationText] = useState('');
  const [expectedSalary, setExpectedSalary] = useState('EGP ');
  const [descriptionError, setDescriptionError] = useState('');
  const [salaryError, setSalaryError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage,setSuccessMessage] = useState('');


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
    const salaryValue = expectedSalary.replace('EGP ', '').trim();
    
    if (salaryValue === '' || isNaN(salaryValue)) {
      setSalaryError('Please enter a valid expected salary.');
      return false;
    }
    
    setSalaryError('');
    return true;
  };

  const handleSendApproval = async () => {
    const isDescriptionValid = validateDescription();
    const isSalaryValid = validateSalary();
  
    if (isDescriptionValid && isSalaryValid) {
      try {
        const totalCost = parseFloat(expectedSalary.replace('EGP ', '').trim());
  
        if (isNaN(totalCost)) {
          console.log("Invalid salary value");
        }
  
        const dataToSend = {
          jobId,
          coverLetter: applicationText,
          totalCost,
        };
        console.log("Data being sent:", dataToSend);
  
        const response = await apiService.PostProposals(dataToSend);
        console.log("Response from API:", response);
  
        if (response && response.status === 201 && response.data) {
          console.log("Data sent successfully!");
          console.log("Proposal Data:", {
            userId: response.data.userId,
            coverLetter: response.data.coverLetter,
            jobId: response.data.jobId,
            totalCost: response.data.totalCost,
            status: response.data.status,
          }); 
          setSuccessMessage("The proposal has been sent successfully. ");
          setTimeout(function() {
            closePopup(); 
        }, 2000); 
        } else {
          console.log("Failed to send data.");
        }
  
        
      } catch (error) {
        
        if (error.response.status === 409) {
          setErrorMessage("You've already applied to this job!");
        } else {
          setErrorMessage("An error occurred while sending the proposal.");
        }
      }
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
    <div className="fixed inset-0 flex items-center justify-center md:mt:0 mt-20 z-10">
      <div className="bg-white p-6 rounded-lg shadow-lg w-9/12 dark:bg-main-dark">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-main dark:text-accent ">Apply for Job</h2>
        {successMessage && <AlertSuccess message={successMessage} />}
        {errorMessage && <AlertError message={errorMessage} />}
        <textarea
          placeholder="Write your Cover letter (at least 150 characters) ..."
          value={applicationText}
          onChange={(e) => setApplicationText(e.target.value)}
          className={`w-full h-32 mb-2 p-2  rounded overflow-y-auto resize-none focus:border-main border-2 dark:text-white dark:bg-main-dark ${
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
          className={`w-full mb-2 p-2 border-2 dark:text-white rounded dark:bg-main-dark ${
            salaryError ? 'border-red-500' : ''
          }`}
        />
        {salaryError && <p className="text-red-500 mb-4">{salaryError}</p>}

        <div className="flex flex-col justify-between mt-4">
          <button
            onClick={handleSendApproval}
            className="bg-main text-white px-4 py-2 rounded hover:bg-teal-700 mb-2"
          >
            Send Proposal
          </button>
          <button
            onClick={closePopup}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-200 dark:text-white dark:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyPopup;

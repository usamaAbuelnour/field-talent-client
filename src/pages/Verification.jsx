/* eslint-disable react/prop-types */
import { useState, useCallback, useEffect } from "react";
import Button from "../components/uiComponents/Button";
import axios from "axios";
import { Stepper } from "react-form-stepper";
import { useNavigate } from "react-router-dom";

const STEPS = {
  client: ["Identity Authentication"],
  engineer: ["Identity Authentication", "Engineer Education"],
};

const API_ENDPOINTS = {
  client: {
    frontId: "https://field-talent.vercel.app/clients/frontId",
    backId: "https://field-talent.vercel.app/clients/backId",
    verificationInfo: "https://field-talent.vercel.app/clients/verificationInfo",
  },
  engineer: {
    frontId: "https://field-talent.vercel.app/engineers/frontId",
    backId: "https://field-talent.vercel.app/engineers/backId",
    unionCard: "https://field-talent.vercel.app/engineers/unionCard",
    militaryCert: "https://field-talent.vercel.app/engineers/militaryCert",
    graduationCert: "https://field-talent.vercel.app/engineers/graduationCert",
    verificationInfo: "https://field-talent.vercel.app/engineers/verificationInfo",
  },
};

function Verification({ userType, token ,verificationStatus,redirectingUrl}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    frontId: null,
    backId: null,
    ...(userType === "engineer" && {
      unionCard: null,
      militaryCert: null,
      graduationCert: null,
    }),
  });
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  console.log('Initial formData:', formData);
  console.log('User type:', userType);
  console.log('Token:', token);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (verificationStatus.status==="accepted") {
      navigate(redirectingUrl, { replace: true });
    }
  }, [verificationStatus, redirectingUrl, navigate]);

  const steps = STEPS[userType] || [];

  const validateForm = useCallback(() => {
    const newErrors = {};
    const MAX_FILE_SIZE = 2 * 1024 * 1024; 

    const isValidFile = (file) => file && file.size <= MAX_FILE_SIZE;

    if (currentStep === 1) {
      if (!formData.frontId || !isValidFile(formData.frontId)) {
        newErrors.frontId = "Front ID image is required and must be under 2MB";
      }
      if (!formData.backId || !isValidFile(formData.backId)) {
        newErrors.backId = "Back ID image is required and must be under 2MB";
      }
    }
    if (currentStep === 2 && userType === "engineer") {
      if (!formData.unionCard || !isValidFile(formData.unionCard)) {
        newErrors.unionCard = "Engineers Union Card image is required and must be under 2MB";
      }
      if (!formData.militaryCert || !isValidFile(formData.militaryCert)) {
        newErrors.militaryCert = "Military Service Status image is required and must be under 2MB";
      }
      if (!formData.graduationCert || !isValidFile(formData.graduationCert)) {
        newErrors.graduationCert = "Graduation Certificate image is required and must be under 2MB";
      }
    }
    setErrors(newErrors);
    console.log('Form validation result:', Object.keys(newErrors).length === 0);
    console.log('Validation errors:', newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, currentStep, userType]);

  const handleInputChange = useCallback((e) => {
    const { name, files } = e.target;
    console.log(`File input changed - Name: ${name}, File:`, files[0]);
    setFormData((prev) => {
      const newFormData = {
        ...prev,
        [name]: files ? files[0] : null,
      };
      console.log('Updated formData:', newFormData);
      return newFormData;
    });
  }, []);

  const uploadFile = async (file, endpoint, fieldName) => {
    console.log(`Uploading ${fieldName} to ${endpoint}`);
    const formData = new FormData();
    formData.append(fieldName, file);
    console.log('FormData content:', formData);
    
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await axios.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(`Upload response for ${fieldName}:`, response.data);
      return response.data;
    } catch (error) {
      console.error(`Error uploading ${fieldName} to ${endpoint}:`, error);
      console.log('Error response:', error.response);
      if (error.response && error.response.status === 500) {
        throw new Error(`Server error (500) while uploading ${fieldName}. Please try again later.`);
      }
      throw error;
    }
  };

  const handleSubmit = async () => {
    console.log('Submitting form...');
    if (!validateForm()) {
      console.log('Form validation failed');
      return;
    }
    setIsSubmitting(true);
    setUploadError(null);

    try {
      console.log('Starting file uploads');
      const uploadPromises = Object.entries(formData).map(([key, file]) => {
        if (file) {
          console.log(`Preparing to upload ${key}`);
          return uploadFile(file, API_ENDPOINTS[userType][key], key);
        }
        console.log(`Skipping upload for ${key} - no file`);
        return Promise.resolve(null);
      });

      const uploadResults = await Promise.all(uploadPromises);
      console.log('All file uploads completed:', uploadResults);

      console.log('Posting verification info');
      const verificationResponse = await axios.post(API_ENDPOINTS[userType].verificationInfo, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Verification info response:', verificationResponse.data);

      console.log('Navigating to home page');
      navigate("/");
    } catch (error) {
      console.error("Error submitting verification:", error);
      if (error.response && error.response.status === 500) {
        setUploadError("The server encountered an error. Please try again later or contact support if the problem persists.");
      } else {
        setUploadError(error.message || "An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
      console.log('Form submission completed');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h2 className="text-lg font-semibold mb-4 pt-5 dark:text-accent">Upload your ID card images (front & back)</h2>
            <FormField
              label="Front ID card image"
              name="frontId"
              type="file"
              onChange={handleInputChange}
              error={errors.frontId}
            />
            <FormField
              label="Back ID card image"
              name="backId"
              type="file"
              onChange={handleInputChange}
              error={errors.backId}
              className="dark:bg-main"
            />
          </>
        );
      case 2:
        return userType === "engineer" ? (
          <>
            <h2 className="text-lg font-semibold mb-4 dark:text-white">Upload engineer verification documents</h2>
            <FormField
              label="Engineers Union card"
              name="unionCard"
              type="file"
              onChange={handleInputChange}
              error={errors.unionCard}
            />
            <FormField
              label="Military service status"
              name="militaryCert"
              type="file"
              onChange={handleInputChange}
              error={errors.militaryCert}
            />
            <FormField
              label="Graduation certificate"
              name="graduationCert"
              type="file"
              onChange={handleInputChange}
              error={errors.graduationCert}
            />
          </>
        ) : null;
      default:
        return null;
    }
  };

  const handleNext = () => {
    console.log('Moving to next step');
    if (validateForm()) {
      setCurrentStep((prev) => {
        console.log('Current step:', prev + 1);
        return prev + 1;
      });
    }
  };

  const handlePrevious = () => {
    console.log('Moving to previous step');
    setCurrentStep((prev) => {
      console.log('Current step:', prev - 1);
      return prev - 1;
    });
  };

  const handleSkip = () => {
    console.log('Skipping verification');
    navigate("/");
  };

  return (
    <div className="max-w-2xl min-h-screen flex flex-col mx-auto py-10 px-10">
      <div className="dark:text-white">
        <Stepper
          activeStep={currentStep - 1}
          steps={steps.map((label) => ({ label }))}
          styleConfig={{
            activeBgColor: "#115e59",
            completedBgColor: "#10b981",
            inactiveBgColor: "#6b7280",
            activeColor: "#115e59",
          }}
        />
      </div>

      <div className="bg-gray-100 border-main border-2   shadow-main min-h-fit dark:bg-gray-800  py-1 rounded-lg shadow-sm px-6 flex-grow">
        <form className="space-y-6">{renderStepContent()}</form>

        {uploadError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{uploadError}</span>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-8 sticky bg-white dark:bg-gray-800">
        <Button onClick={handleSkip} text="Skip" variant="outline" />
        <div className="flex gap-3">
          <Button
            onClick={handlePrevious}
            text="Previous"
            disabled={currentStep === 1}
            className="btn btn-secondary"
          />
          <Button
            onClick={currentStep === steps.length ? handleSubmit : handleNext}
            text={currentStep === steps.length ? "Finish" : "Next"}
            className="btn btn-primary"
            disabled={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}

function FormField({ label, name, type, onChange, error }) {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text dark:text-white">{label}</span>

      </label>
      <input
        type={type}
        name={name}
        className={`input input-bordered border-main w-full ${type === "file" ? "file-input" : ""}  dark:bg-main dark:text-white`}
        onChange={onChange}
        accept={type === "file" ? "image/*" : undefined}
      />
      {error && <span className="text-error">{error}</span>}
    </div>
  );
}

export default Verification;
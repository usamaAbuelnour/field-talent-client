/* eslint-disable react/prop-types */
import  { useState, useCallback, useEffect } from "react";
import Button from "../components/uiComponents/Button";
import axios from "axios";
import { Stepper } from "react-form-stepper";

const STEPS = {
  client: ["Contact", "Identity Authentication"],
  engineer: ["Contact", "Identity Authentication", "Engineer Education"],
};

const LOCATIONS = [
  "Port Fouad",
  "Port Said",
  "Ismailia",
  "Suez",
  "10th of Ramadan",
  "El Shorouk",
  "El Obour",
  "New Capital",
  "Badr",
  "5th Settlement",
  "Nasr City",
];

function Verification({ userType = "engineer" }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const steps = STEPS[userType] || [];

  const [formData, setFormData] = useState(() => ({
    location: "",
    phoneNumber: "",
    whatsAppNumber: "",
    frontID: null,
    backID: null,
    ...(userType === "engineer" && {
      engineersUnionCard: null,
      militaryServiceStatus: null,
      graduationCertificate: null,
    }),
  }));

  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.phoneNumber || !/^\d{11}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = "Phone number must be 11 digits";
    if (!formData.whatsAppNumber || !/^\d{11}$/.test(formData.whatsAppNumber))
      newErrors.whatsAppNumber = "WhatsApp number must be 11 digits";

    if (currentStep === 2) {
      if (!formData.frontID) newErrors.frontID = "Front ID image is required";
      if (!formData.backID) newErrors.backID = "Back ID image is required";
    }

    if (currentStep === 3 && userType === "engineer") {
      if (!formData.engineersUnionCard)
        newErrors.engineersUnionCard = "Engineers Union Card image is required";
      if (!formData.militaryServiceStatus)
        newErrors.militaryServiceStatus = "Military Service Status image is required";
      if (!formData.graduationCertificate)
        newErrors.graduationCertificate = "Graduation Certificate image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, currentStep, userType]);

  const handleInputChange = useCallback((e) => {
    const { name, value, files } = e.target;
    if (name === 'phoneNumber' || name === 'whatsAppNumber') {
      const numericValue = value.replace(/\D/g, '').slice(0, 11);
      setFormData((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: files ? files[0] : value,
      }));
    }
  }, []);


  const handleSubmit = async () => {
    if (!validateForm()) return;
    console.log(formData)
    setIsSubmitting(true);
    try {
      const response = await axios.post("https://your-backend-api.com/submit", {
        ...formData,
        userType,
      });
      console.log("Data sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h2 className="text-lg font-semibold mb-4 text-center">Upload contact</h2>
            <FormField
              label="Choose your location"
              name="location"
              type="select"
              options={LOCATIONS}
              value={formData.location}
              onChange={handleInputChange}
              error={errors.location}
            />
            <FormField
              label="Enter phone number"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              error={errors.phoneNumber}
            />
            <FormField
              label="Enter WhatsApp number"
              name="whatsAppNumber"
              type="tel"
              value={formData.whatsAppNumber}
              onChange={handleInputChange}
              error={errors.whatsAppNumber}
            />
          </>
        );
      case 2:
        return (
          <>
            <h2 className="text-lg font-semibold mb-4">Upload your ID card images (front & back)</h2>
            <FormField
              label="Front ID card image"
              name="frontID"
              type="file"
              onChange={handleInputChange}
              error={errors.frontID}
            />
            <FormField
              label="Back ID card image"
              name="backID"
              type="file"
              onChange={handleInputChange}
              error={errors.backID}
            />
          </>
        );
      case 3:
        return userType === "engineer" ? (
          <>
            <h2 className="text-lg font-semibold mb-4">Upload engineer verification documents</h2>
            <FormField
              label="Engineers Union card"
              name="engineersUnionCard"
              type="file"
              onChange={handleInputChange}
              error={errors.engineersUnionCard}
            />
            <FormField
              label="Military service status"
              name="militaryServiceStatus"
              type="file"
              onChange={handleInputChange}
              error={errors.militaryServiceStatus}
            />
            <FormField
              label="Graduation certificate"
              name="graduationCertificate"
              type="file"
              onChange={handleInputChange}
              error={errors.graduationCertificate}
            />
          </>
        ) : null;
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (validateForm()) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="max-w-2xl min-h-screen flex flex-col mx-auto pt-8 px-10">
      <div className="mb-8">
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

      <div className="bg-white  shadow-main min-h-fit dark:bg-gray-800 rounded-lg shadow-sm p-6 flex-grow">
        <form className="space-y-6">{renderStepContent()}</form>
      </div>

      <div className="flex justify-between mt-8 sticky -bottom-5 bg-white dark:bg-gray-800 p-4">
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
  );
}

function FormField({ label, name, type, value, onChange, error, options }) {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      {type === "select" ? (
        <select
          name={name}
          className="select select-bordered w-full"
          value={value}
          onChange={onChange}
        >
          <option disabled value="">
            Choose your location
          </option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          className={`input input-bordered w-full ${
            type === "file" ? "file-input" : ""
          }`}
          value={type !== "file" ? value : undefined}
          onChange={onChange}
        />
      )}
      {error && <span className="text-error text-sm">{error}</span>}
    </div>
  );
}

export default Verification;
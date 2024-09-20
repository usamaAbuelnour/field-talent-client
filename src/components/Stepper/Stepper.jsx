/* eslint-disable react/prop-types */
import  { useState, useCallback } from "react";
import { Check } from "lucide-react";
import Button from "../uiComponents/Button";
import axios from "axios";

const STEPS = {
  CLIENT: ["Contact", "Identity Authentication"],
  ENGINEER: ["Contact", "Identity Authentication", "Engineer Education"],
};

const LOCATIONS = [
  "Port Fouad", "Port Said", "Ismailia", "Suez", "10th of Ramadan",
  "El Shorouk", "El Obour", "New Capital", "Badr", "5th Settlement", "Nasr City",
];

function Stepper({ userType = "client" }) {
  const steps = STEPS[userType.toUpperCase()];

  const [formData, setFormData] = useState({
    location: "",
    phoneNumber: "",
    whatsAppNumber: "",
    frontID: null,
    backID: null,
  });
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, currentStep]);

  const handleInputChange = useCallback((e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  }, []);

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post("https://your-backend-api.com/submit", {
        ...formData,
        userType,
      });
      console.log("Data sent successfully:", response.data);
      setComplete(true);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
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
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between mb-8">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 ? "active" : ""} ${
              i + 1 < currentStep || complete ? "complete" : ""
            }`}
          >
            <div className="step">
              {i + 1 < currentStep || complete ? <Check size={24} /> : i + 1}
            </div>
            <p className="text-sm mt-2">{step}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <form className="space-y-6">
          {renderStepContent()}
        </form>
      </div>

      <div className="flex justify-between mt-8">
        <Button
          onClick={() => setCurrentStep((prev) => prev - 1)}
          text="Previous"
          disabled={currentStep === 1}
          className="btn btn-secondary"
        />
        <Button
          onClick={() => {
            if (currentStep === steps.length) {
              handleSubmit();
            } else {
              setCurrentStep((prev) => prev + 1);
            }
          }}
          text={currentStep === steps.length ? "Finish" : "Next"}
          className="btn btn-primary"
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
      {type === 'select' ? (
        <select
          name={name}
          className="select select-bordered w-full"
          value={value}
          onChange={onChange}
        >
          <option disabled value="">Choose your location</option>
          {options.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          className={`input input-bordered w-full ${type === 'file' ? 'file-input' : ''}`}
          value={value}
          onChange={onChange}
        />
      )}
      {error && <span className="text-error text-sm">{error}</span>}
    </div>
  );
}

export default Stepper;
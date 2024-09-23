/* eslint-disable react/prop-types */
import { useState, useCallback, useEffect } from "react";
import Button from "../components/uiComponents/Button";
import axios from "axios";
import { Stepper } from "react-form-stepper";
import { useNavigate } from "react-router-dom";

const STEPS = {
  client: ["Personal Data"],
  engineer: [
    "Personal Data",
    "Work Experience 1",
    "Work Experience 2",
    "Engineer Education",
  ],
};

const skills = [
  "cad",
  "revet",
  "sap",
  "fishing work",
  "Structural Design",
  "AutoCAD",
  "Project Management",
  "Site Supervision",
  "Construction Safety",
];
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
  "Cairo",
  "Alexandria",
  "Giza",
  "Aswan",
  "Luxor",
  "Asyut",
  "Minya",
  "Fayoum",
  "Beni Suef",
  "Qena",
  "Sohag",
  "Damanhur",
  "Zagazig",
  "Mansoura",
  "Tanta",
  "Mahalla",
  "Damietta",
  "Sharqia",
  "Kafr El Sheikh",
  "Beheira",
  "Monufia",
  "Matruh",
  "North Sinai",
  "South Sinai",
  "Red Sea",
  "New Valley",
];

function AddProfileData({ userType = "client" }) {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const steps = STEPS[userType] || [];

  const [formData, setFormData] = useState(() => ({
    location: "",
    phoneNumber: "",
    whatsAppNumber: "",
    profilePreview: "",
    personalImage: null,
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
    if (!formData.personalImage) newErrors.personalImage = " image is required";

    if (currentStep === 2) {
      if (!formData.skills) newErrors.skills = "skills is required";

      if (!formData.experienceImageNumber1)
        newErrors.experienceImageNumber1 =
          "experience Image Number 1  is required";

      if (!formData.experienceImageNumber2)
        newErrors.experienceImageNumber2 =
          "experience Image Number 2 is required";

      if (!formData.experienceImageNumber3)
        newErrors.experienceImageNumber3 =
          "experience Image Number 3 is required";
    }
    if (currentStep === 3 && userType === "engineer") {
      if (!formData.engineersUnionCard)
        newErrors.engineersUnionCard = "Engineers Union Card image is required";
      if (!formData.militaryServiceStatus)
        newErrors.militaryServiceStatus =
          "Military Service Status image is required";
      if (!formData.graduationCertificate)
        newErrors.graduationCertificate =
          "Graduation Certificate image is required";
    }

    if (currentStep === 4 && userType === "engineer") {
      if (!formData.engineersUnionCard)
        newErrors.engineersUnionCard = "Engineers Union Card image is required";
      if (!formData.militaryServiceStatus)
        newErrors.militaryServiceStatus =
          "Military Service Status image is required";
      if (!formData.graduationCertificate)
        newErrors.graduationCertificate =
          "Graduation Certificate image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, currentStep, userType]);

  const handleInputChange = useCallback((e) => {
    const { name, value, files } = e.target;
    if (name === "phoneNumber" || name === "whatsAppNumber") {
      const numericValue = value.replace(/\D/g, "").slice(0, 11);
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
            <h2 className="text-lg font-semibold mb-4 text-center">
              personal information
            </h2>
            <FormField
              label="personal image  card image"
              name="personalImage"
              type="file"
              onChange={handleInputChange}
              error={errors.personalImage}
            />
            <FormField
              label="Choose your location"
              name="location"
              type="select"
              options={LOCATIONS}
              value={formData.location}
              onChange={handleInputChange}
              error={errors.location}
            />
            <div className="flex gap-3">
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
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="text-lg font-semibold mb-4">Work Experience</h2>
            <FormField
              label="Choose your top 6 skills"
              name="skills"
              type="select"
              options={skills}
              value={formData.skills}
              onChange={handleInputChange}
              error={errors.skills}
            />
            <div className="flex gap-2">
              <FormField
                label="show your experience images"
                name="experienceImageNumber1"
                type="file"
                onChange={handleInputChange}
                error={errors.experienceImageNumber1}
              />
              <FormField
                label="show your experience images"
                name="experienceImageNumber1"
                type="file"
                onChange={handleInputChange}
                error={errors.experienceImageNumber2}
              />
              <FormField
                label="show your experience images"
                name="experienceImageNumber1"
                type="file"
                onChange={handleInputChange}
                error={errors.experienceImageNumber3}
              />
            </div>
          </>
        );
      case 3:
        return userType === "engineer" ? (
          <>
            <h2 className="text-lg font-semibold mb-4">
              upload your work experience
            </h2>
            <div className="exp1">
              <input type="date" name="start" id="" />
              <input type="end" name="end" id="" />

              <FormField
                label="jop title"
                name="jobExperience"
                type="text"
                onChange={handleInputChange}
                error={errors.jobExperience}
              />
              <FormField
                label="job description"
                name="jobExperience"
                type="textarea"
                onChange={handleInputChange}
                error={errors.jobExperience}
              />
            </div>
            <div className="exp2">
              <input type="date" name="start" id="" />
              <input type="end" name="end" id="" />

              <FormField
                label="jop title"
                name="jobExperience"
                type="text"
                onChange={handleInputChange}
                error={errors.jobExperience}
              />
              <FormField
                label="job description"
                name="jobExperience"
                type="textarea"
                onChange={handleInputChange}
                error={errors.jobExperience}
              />
            </div>
            <div className="exp3">
              <input type="date" name="start" id="" />
              <input type="end" name="end" id="" />

              <FormField
                label="jop title"
                name="jobExperience"
                type="text"
                onChange={handleInputChange}
                error={errors.jobExperience}
              />
              <FormField
                label="job description"
                name="jobExperience"
                type="textarea"
                onChange={handleInputChange}
                error={errors.jobExperience}
              />
            </div>
          </>
        ) : null;
      case 4:
        return userType === "engineer" ? (

<>
<h1></h1>

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

  const handleSkip = () => {
    navigate("/");
  };

  return (
    <div className="max-w-2xl min-h-screen flex flex-col mx-auto py-10 px-10">
      <div className="">
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

      <div className="bg-white shadow-main min-h-fit dark:bg-gray-800 py-1 rounded-lg shadow-sm px-6 flex-grow">
        <form className="space-y-6">{renderStepContent()}</form>
      </div>

      <div className="flex justify-between mt-8 sticky  bg-white dark:bg-gray-800 ">
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
          value={value}
          onChange={onChange}
          accept={type === "file" ? "image/*" : undefined}
        />
      )}
      {error && <span className="text-error">{error}</span>}
    </div>
  );
}

export default AddProfileData;

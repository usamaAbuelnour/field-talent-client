/* eslint-disable react/prop-types */
import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormField from "../components/AddProfileDataComponent/FormField";
import FormStepper from "../components/AddProfileDataComponent/FormStepper";
import FormButtonGroup from "../components/AddProfileDataComponent/FormButtonGroup";

const STEPS = {
  client: ["Personal Data"],
  engineer: ["Personal Data", "Work Experience", "Engineer Education"],
};

const skills = [
  "CAD",
  "Revit",
  "SAP",
  "Fishing Work",
  "Structural Design",
  "AutoCAD",
  "Project Management",
  "Site Supervision",
  "Construction Safety",
];

const governorate = ["Port Fouad", "Port Said", "Ismailia", "Suez"];
const SPECIALIZATIONS = [
  "Civil Engineering",
  "Electrical Engineering",
  "Architectural Engineering",
];

const GRADES = ["Acceptable", "Good", "Very Good", "Excellent"];

function AddProfileData({ userType }) {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const steps = STEPS[userType] || [];
  const initialState = {
    location: "",
    phoneNumber: "",
    whatsAppNumber: "",
    profileOverview: "",
    skills: [],
    startJobDates: Array(3).fill(""),
    endJobDates: Array(3).fill(""),
    jobTitles: Array(3).fill(""),
    jobDescriptions: Array(3).fill(""),
  };

  const [formData, setFormData] = useState(initialState);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.replace(/\D/g, "").slice(0, 11), 
    }));
  }, []);

  const handleJobChange = (index, field, value) => {
    setFormData((prev) => {
      const newData = { ...prev };
      newData[field][index] = value;
      return newData;
    });
  };

  const handleSubmit = async () => {
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
            <h2 className="text-lg font-semibold mb-4 text-center">Personal Information</h2>
            <FormField
              label="Choose your location"
              name="location"
              type="select"
              options={governorate}
              value={formData.location}
              onChange={handleInputChange}
            />
            <div className="flex gap-3">
              <FormField
                label="Phone Number"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
              <FormField
                label="WhatsApp Number"
                name="whatsAppNumber"
                type="tel"
                value={formData.whatsAppNumber}
                onChange={handleInputChange}
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
            />
            <h2 className="text-lg font-semibold mb-4">Upload Your Work Experience</h2>
            {Array.from({ length: 3 }, (_, index) => (
              <div key={index} className={`exp${index + 1}`}>
                <FormField
                  label={`Start Job ${index + 1}`}
                  name={`startJobDate${index + 1}`}
                  type="date"
                  onChange={(e) => handleJobChange(index, 'startJobDates', e.target.value)}
                />
                <FormField
                  label={`End Job ${index + 1}`}
                  name={`endJobDate${index + 1}`}
                  type="date"
                  onChange={(e) => handleJobChange(index, 'endJobDates', e.target.value)}
                />
                <FormField
                  label={`Job Title ${index + 1}`}
                  name={`jobTitle${index + 1}`}
                  type="text"
                  onChange={(e) => handleJobChange(index, 'jobTitles', e.target.value)}
                />
                <FormField
                  label={`Job Description ${index + 1}`}
                  name={`jobDescription${index + 1}`}
                  type="textarea"
                  onChange={(e) => handleJobChange(index, 'jobDescriptions', e.target.value)}
                />
              </div>
            ))}
          </>
        );
      case 3:
        return userType === "engineer" ? (
          <>
            <h1>Engineer Education</h1>
            <FormField
              label="Graduation From"
              name="graduationFrom"
              type="text"
              onChange={handleInputChange}
            />
            <FormField
              label="Graduation Year"
              name="graduationYear"
              type="date"
              onChange={handleInputChange}
            />
            <FormField
              label="Specialization"
              name="specialization"
              type="select"
              options={SPECIALIZATIONS}
              value={formData.specialization}
              onChange={handleInputChange}
            />
            <FormField
              label="Grade"
              name="grade"
              type="select"
              options={GRADES}
              value={formData.grade}
              onChange={handleInputChange}
            />
            <FormField
              label="Final Project"
              name="finalProject"
              type="text"
              onChange={handleInputChange}
            />
            <FormField
              label="Project Grade"
              name="projectGrade"
              type="select"
              options={GRADES}
              value={formData.projectGrade}
              onChange={handleInputChange}
            />
          </>
        ) : null;
      default:
        return null;
    }
  };

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSkip = () => {
    navigate("/");
  };

  return (
    <div className="max-w-2xl min-h-screen flex flex-col mx-auto py-10 px-10">
      <FormStepper currentStep={currentStep} steps={steps} />
      <div className="bg-white shadow-main min-h-fit dark:bg-gray-800 py-1 rounded-lg shadow-sm px-6 flex-grow">
        <form className="space-y-6">{renderStepContent()}</form>
      </div>
      <FormButtonGroup
        currentStep={currentStep}
        totalSteps={steps.length}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        handleSubmit={handleSubmit}
        handleSkip={handleSkip}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

export default AddProfileData;

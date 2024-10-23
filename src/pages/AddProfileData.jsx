/* eslint-disable react/prop-types */
import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormField from "../components/AddProfileDataComponent/FormField";
import FormStepper from "../components/AddProfileDataComponent/FormStepper";
import FormButtonGroup from "../components/AddProfileDataComponent/FormButtonGroup";

const STEPS = {
  client: ["Personal Data"],
  engineer: ["Personal Data", "Work Experience"],
};

const SKILLS = [
  "CAD", "Revit", "SAP", "Fishing Work", "Structural Design",
  "AutoCAD", "Project Management", "Site Supervision", "Construction Safety",
];

const GOVERNORATES = ["Port Fouad", "Port Said", "Ismailia", "Suez"];

const API_BASE_URL = "https://field-talent.vercel.app";

function AddProfileData({ userType, token }) {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const steps = STEPS[userType] || [];
  const initialState = {
    governorate: "",
    phoneNumbers: [""],
    whatsAppPhoneNumbers: [""],
    profileOverview: "",
    ...(userType === "engineer" && {
      skills: [],
      workExperience: Array(3).fill({
        startDate: "",
        finishDate: "",
        name: "",
        description: "",
      }),
    }),
  };

  const [formData, setFormData] = useState(initialState);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
  
    setFormData((prev) => {
      if (name.startsWith("phoneNumbers") || name.startsWith("whatsAppPhoneNumbers")) {
        const [arrayName, index] = name.split("[");
        const cleanedValue = value.replace(/\D/g, "").slice(0, 11);
        return {
          ...prev,
          [arrayName]: prev[arrayName].map((item, i) => 
            i === parseInt(index) ? cleanedValue : item
          ),
        };
      }
      
      if (name === "skills") {
        return {
          ...prev,
          [name]: Array.isArray(value) ? value : [],
        };
      }
      
      return { ...prev, [name]: value };
    });
  }, []);

  const handleJobChange = useCallback((index, field, value) => {
    setFormData((prev) => {
      const newWorkExperience = prev.workExperience.map((job, i) => 
        i === index ? { ...job, [field]: value } : job
      );
      return { ...prev, workExperience: newWorkExperience };
    });
  }, []);

  const filterEmptyFields = useCallback((data) => {
    return Object.entries(data).reduce((acc, [key, value]) => {
      if (Array.isArray(value)) {
        const filteredArray = value.filter(item => {
          if (typeof item === 'object' && item !== null) {
            return Object.values(item).some(v => v !== "" && v !== null);
          }
          return item !== "" && item !== null;
        });
        if (filteredArray.length > 0) {
          acc[key] = filteredArray;
        }
      } else if (value !== "" && value !== null) {
        acc[key] = value;
      }
      return acc;
    }, {});
  }, []);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      const filteredData = filterEmptyFields(formData);
      
      if (Object.keys(filteredData).length === 0) {
        setError("No data to submit. Please fill out at least one field.");
        setIsSubmitting(false);
        return;
      }

      const endpoint = `${API_BASE_URL}/${userType === "engineer" ? "engineers" : "clients"}`;

      const response = await axios.patch(endpoint, filteredData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Data sent successfully:", response.data);
      console.log("Data sent successfully:", formData);

      navigate("/");
    } catch (error) {
      console.error("Error sending data:", error.response?.data);
      setError("An error occurred while submitting the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, userType, token, navigate, filterEmptyFields]);


  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h2 className="text-lg font-semibold mb-4 text-center dark:text-accent">Personal Information</h2>
            <FormField
              label="Choose your governorate"
              name="governorate"
              type="select"
              options={GOVERNORATES}
              value={formData.governorate}
              onChange={handleInputChange}
              className="dark:text-white "
            />
            <div className="flex justify-between gap-5 dark:text-white   ">
              <FormField
                label="Phone Number"
                name="phoneNumbers[0]"
                type="tel"
                value={formData.phoneNumbers[0]}
                onChange={handleInputChange}
                

              />
              <FormField
                label="WhatsApp Number"
                name="whatsAppPhoneNumbers[0]"
                type="tel"
                value={formData.whatsAppPhoneNumbers[0]}
                onChange={handleInputChange}
              

              />
            </div> 
            <FormField
              label="Profile Overview"
              name="profileOverview"
              type="textarea"
              value={formData.profileOverview}
              onChange={handleInputChange}
              className="dark:text-white"

            />
          </>
        );
      case 2:
        return (
          <>
            <h2 className="text-lg font-semibold mb-4 dark:text-accent">Work Experience</h2>
            <FormField
              label="Choose your top 6 skills"
              name="skills"
              type="multiselect"
              options={SKILLS}
              value={formData.skills}
              onChange={handleInputChange}
              maxSelections={6}
            />
            <h2 className="text-lg font-semibold mb-4 dark:text-accent">Upload Your Work Experience</h2>
            {formData.workExperience.map((exp, index) => (
              <div key={index} className={`exp${index + 1}`}>
                <FormField
                  label={`Start Job ${index + 1}`}
                  name={`startDate`}
                  type="date"
                  value={exp.startDate}
                  onChange={(e) => handleJobChange(index, "startDate", e.target.value)}
                />
                <FormField
                  label={`End Job ${index + 1}`}
                  name={`finishDate`}
                  type="date"
                  value={exp.finishDate}
                  onChange={(e) => handleJobChange(index, "finishDate", e.target.value)}
                />
                <FormField
                  label={`Job Title ${index + 1}`}
                  name={`name`}
                  type="text"
                  value={exp.name}
                  onChange={(e) => handleJobChange(index, "name", e.target.value)}
                />
                <FormField
                  label={`Job Description ${index + 1}`}
                  name={`description`}
                  type="textarea"
                  value={exp.description}
                  onChange={(e) => handleJobChange(index, "description", e.target.value)}
                />
              </div>
            ))}
          </>
        );
      default:
        return null;
    }
  };

  const handleNext = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  }, [steps.length]);

  const handlePrevious = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleSkip = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className="max-w-2xl min-h-screen flex flex-col mx-auto py-10 px-10  dark:text-white">
      <FormStepper currentStep={currentStep} steps={steps} />
      <div className="bg-white shadow-main min-h-fit dark:bg-gray-800 py-1 rounded-lg shadow-sm px-6 flex-grow">
        <form className="space-y-6">{renderStepContent()}</form>
        {error && <div className="text-red-500 mt-4">{error}</div>}
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

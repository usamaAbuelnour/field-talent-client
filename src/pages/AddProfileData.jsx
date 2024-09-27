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

function AddProfileData({ userType, token }) {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const steps = STEPS[userType] || [];
  const initialState = {
    governorate: null,
    phoneNumbers: [null],
    whatsAppPhoneNumbers: [null],
    profileOverview: null,
    ...(userType === "engineer" && {
      skills: [null],
      workExperience: Array(3).fill({
        startDate: null,
        finishDate: null,
        name: null,
        description: null,
      }),
    }),
  };

  const [formData, setFormData] = useState(initialState);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;

    if (
      name.startsWith("phoneNumbers") ||
      name.startsWith("whatsAppPhoneNumbers")
    ) {
      const index = name.match(/\d+/)[0];
      const arrayName = name.includes("phoneNumbers")
        ? "phoneNumbers"
        : "whatsAppPhoneNumbers";

      setFormData((prev) => ({
        ...prev,
        [arrayName]: prev[arrayName].map((item, i) =>
          i === parseInt(index)
            ? value
              ? value.replace(/\D/g, "").slice(0, 11)
              : null
            : item
        ),
      }));
    } else if (name === "skills") {
      const selectedSkills = Array.isArray(value) ? value.slice(0, 6) : [];
      setFormData((prev) => ({
        ...prev,
        [name]: selectedSkills,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value || null,
      }));
    }
  }, []);

  const handleJobChange = (index, field, value) => {
    setFormData((prev) => {
      const newWorkExperience = [...prev.workExperience];
      newWorkExperience[index] = {
        ...newWorkExperience[index],
        [field]: value || null,
      };
      return { ...prev, workExperience: newWorkExperience };
    });
  };
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      const endpoint =
        userType === "engineer"
          ? "https://field-talent.vercel.app/engineers"
          : "https://field-talent.vercel.app/clients";

      const response = await axios.patch(
        endpoint,
        {
          ...formData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Data sent successfully:", response.data);
      navigate("/");
    } catch (error) {
      console.log("Error sending data:", error.response.data);
      console.log(formData, token);
      setError(
        "An error occurred while submitting the form. Please try again."
      );
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
              Personal Information
            </h2>
            <FormField
              label="Choose your governorate"
              name="governorate"
              type="select"
              options={governorate}
              value={formData.governorate}
              onChange={handleInputChange}
            />
            <div className="flex gap-3">
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
              label={`profileOverview `}
              name={`profileOverview`}
              type="textarea"
              value={formData.profileOverview}
              onChange={handleInputChange}
            />
          </>
        );
      case 2:
        return (
          <>
          
            <h2 className="text-lg font-semibold mb-4">Work Experience</h2>
            <FormField
              label="Choose your top 6 skills"
              name="skills"
              type="multiselect"
              options={SKILLS}
              value={formData.skills}
              onChange={handleInputChange}
              maxSelections={6}
            />
            <h2 className="text-lg font-semibold mb-4">
              Upload Your Work Experience
            </h2>
            {formData.workExperience.map((exp, index) => (
              <div key={index} className={`exp${index + 1}`}>
                <FormField
                  label={`Start Job ${index + 1}`}
                  name={`startDate`}
                  type="date"
                  value={exp.startDate}
                  onChange={(e) =>
                    handleJobChange(index, "startDate", e.target.value)
                  }
                />
                <FormField
                  label={`End Job ${index + 1}`}
                  name={`finishDate`}
                  type="date"
                  value={exp.finishDate}
                  onChange={(e) =>
                    handleJobChange(index, "finishDate", e.target.value)
                  }
                />
                <FormField
                  label={`Job Title ${index + 1}`}
                  name={`name`}
                  type="text"
                  value={exp.name}
                  onChange={(e) =>
                    handleJobChange(index, "name", e.target.value)
                  }
                />
                <FormField
                  label={`Job Description ${index + 1}`}
                  name={`description`}
                  type="textarea"
                  value={exp.description}
                  onChange={(e) =>
                    handleJobChange(index, "description", e.target.value)
                  }
                />
              </div>
            ))}
          </>
        );
      default:
        return null;
    }
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSkip = () => {
    navigate("/");
  };

  return (
    <div className="max-w-2xl min-h-screen flex flex-col mx-auto py-10 px-10">
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

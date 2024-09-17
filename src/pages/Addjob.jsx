/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Loading from '../components/lodding'; 

const Addjob = ({ token,handleRedirctuinUrl }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
    service: [],
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    handleRedirctuinUrl("/add-job")

    if (!token) {
      navigate("/login");
    }
  }, [token, navigate,handleRedirctuinUrl]);

  const validateForm = () => {
    let newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (formData.service.length === 0)
      newErrors.service = "At least one service must be selected";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      service: checked
        ? [...prevData.service, value]
        : prevData.service.filter((option) => option !== value),
    }));
    
    setErrors((prevErrors) => ({ ...prevErrors, service: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const requestData = { ...formData };

    fetch("https://field-talent.vercel.app/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        setIsSubmitting(false);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Job added successfully:", data);
        navigate("/showjobs");
      })
      .catch((error) => {
        setIsSubmitting(false);
        console.error("Error adding job:", error);
        setErrors({ submit: "Failed to submit the job. Please try again." });
      });
  };

  const renderCheckboxes = () => {
    switch (formData.category) {
      case "Concrete Construction":
        return (
          <>
            <label className="block">
              <input
                type="checkbox"
                value="Concrete1"
                checked={formData.service.includes("Concrete1")}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Concrete1
            </label>
            <label className="block">
              <input
                type="checkbox"
                value="Concrete2"
                checked={formData.service.includes("Concrete2")}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Concrete2
            </label>
            <label className="block">
              <input
                type="checkbox"
                value="Concrete3"
                checked={formData.service.includes("Concrete3")}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Concrete3
            </label>
          </>
        );
      case "Consultation":
        return (
          <>
            <label className="block">
              <input
                type="checkbox"
                value="Consultation1"
                checked={formData.service.includes("Consultation1")}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Consultation1
            </label>
            <label className="block">
              <input
                type="checkbox"
                value="Consultation2"
                checked={formData.service.includes("Consultation2")}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Consultation2
            </label>
            <label className="block">
              <input
                type="checkbox"
                value="Consultation3"
                checked={formData.service.includes("Consultation3")}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Consultation3
            </label>
          </>
        );
      case "Finishing Works":
        return (
          <>
            <label className="block">
              <input
                type="checkbox"
                value="Finishing1"
                checked={formData.service.includes("Finishing1")}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Finishing1
            </label>
            <label className="block">
              <input
                type="checkbox"
                value="Finishing2"
                checked={formData.service.includes("Finishing2")}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Finishing2
            </label>
            <label className="block">
              <input
                type="checkbox"
                value="Finishing3"
                checked={formData.service.includes("Finishing3")}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Finishing3
            </label>
          </>
        );
      default:
        return (
          <p className="text-gray-500">
            No services available for this category.
          </p>
        );
    }
  };

  const locationOptions = [
    "portfouad",
    "portsaid",
    "suez",
    "nasr city",
    "new capital",
    "badr",
    "el obour",
    "settlement",
    "10th of ramadan",
    "el shrok",
  ];

  if (isSubmitting) {
    return <Loading />; 
  }

  return (
    <div className="min-h-screen  flex items-center justify-center pt-8 mx-8 dark:bg-transparent">
      <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full p-8 py-16 border border-main border-opacity-30 my-10 dark:bg-main-dark dark:bg-opacity-20">
        <h2 className="  dark:text-accent text-2xl font-bold mb-6 text-main text-center">
          Add New Job
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
           
            <div>
              
              <label className="block text-gray-600 font-medium mb-2 dark:text-white">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}

             
              <label className=" dark:text-white block text-gray-600 font-medium mb-2 mt-4">
                Location
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 ${
                  errors.location ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select location</option>
                {locationOptions.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">{errors.location}</p>
              )}

              
              <label className=" dark:text-white block text-gray-600 font-medium mb-2 mt-4">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.category ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Category</option>
                <option value="Concrete Construction">
                  Concrete Construction
                </option>
                <option value="Consultation">Consultation</option>
                <option value="Finishing Works">Finishing Works</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>

            
            <div>
             
              <label className=" dark:text-white block text-gray-600 font-medium mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter description"
                style={{ height: "250px" }}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            
            <div className="col-span-2">
              <label className=" dark:text-white block text-gray-600 font-medium mb-2">
                Service
              </label>
              <div className=" dark:text-white flex mb-4 justify-evenly">
                {renderCheckboxes()}
              </div>
              {errors.service && (
                <p className="text-red-500 text-sm mt-1">{errors.service}</p>
              )}
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <Button
              className="w-2/5 rounded-md"
              disabled={isSubmitting}
              to="/showjobs"
              text={isSubmitting ? "Submitting..." : "Add Job"}
              type="submit"
              variant="fill"
              size="lg"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default Addjob;

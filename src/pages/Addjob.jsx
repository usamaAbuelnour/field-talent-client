import  { useState, useEffect } from 'react';
import Button from "../components/uiComponents/Button";
import Loading from '../components/uiComponents/Loading';
import apiService from '../Api/AxiosServiceConfiguration';
import Select from 'react-select';
import { PartyPopper } from 'lucide-react';

const Addjob = () => {
  const initialFormState = {
    title: "",
    description: "",
    location: null,
    category: null,
    service: [],
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateForm = () => {
    let newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (formData.service.length === 0) newErrors.service = "At least one service must be selected";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSelectChange = (selectedOption, actionMeta) => {
    setFormData((prevData) => ({
      ...prevData,
      [actionMeta.name]: selectedOption,
      service: actionMeta.name === 'category' ? [] : prevData.service,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [actionMeta.name]: "" }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const response = await apiService.addJob({
        ...formData,
        location: formData.location.value,
        category: formData.category.value,
      });
      console.log("Job added successfully:", response.data);
      setShowSuccess(true);
      setFormData(initialFormState);
    } catch (error) {
      setErrors({ submit: "Failed to submit the job. Please try again." });
      console.log(error)
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCheckboxes = () => {
    if (!formData.category) {
      return (
        <p className="text-gray-500 italic">
          Please select a category to view available services.
        </p>
      );
    }

    const categoryServices = {
      "Concrete Construction": ["Concrete1", "Concrete2", "Concrete3"],
      "Consultation": ["Consultation1", "Consultation2", "Consultation3"],
      "Finishing Works": ["Finishing1", "Finishing2", "Finishing3"],
    };

    const services = categoryServices[formData.category.value] || [];

    return services.length > 0 ? (
      services.map((service) => (
        <label key={service} className="block">
          <input
            type="checkbox"
            value={service}
            checked={formData.service.includes(service)}
            onChange={handleCheckboxChange}
            className="mr-2"
            style={{
              accentColor: '#115e59',
            }}
          />
          {service}
        </label>
      ))
    ) : (
      <p className="text-gray-500">
        No services available for this category.
      </p>
    );
  };


  const locationOptions = [
    { value: "portfouad", label: "Port Fouad" },
    { value: "portsaid", label: "Port Said" },
    { value: "suez", label: "Suez" },
    { value: "nasr city", label: "Nasr City" },
    { value: "new capital", label: "New Capital" },
    { value: "badr", label: "Badr" },
    { value: "el obour", label: "El Obour" },
    { value: "5th settlement", label: "5th Settlement" },
    { value: "10th of ramadan", label: "10th of Ramadan" },
    { value: "el shrok", label: "El Shrok" },
  ]

  const categoryOptions = [
    { value: "Concrete Construction", label: "Concrete Construction" },
    { value: "Consultation", label: "Consultation" },
    { value: "Finishing Works", label: "Finishing Works" },
  ];
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? '#115e59' : '#115e59',
      boxShadow: state.isFocused ? '0 0 0 1px #115e59' : null,
      '&:hover': {
        borderColor: '#115e59',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#115e59' : 'white',
      color: state.isFocused ? 'white' : 'black',
      '&:active': {
        backgroundColor: '#115e59',
      },
    }),
  };

  if (isSubmitting) {
    return <Loading />;
  }


  return (
    <div className="min-h-screen flex items-center justify-center pt-4 px-4 sm:px-6 lg:px-8 dark:bg-transparent">
      <div className="w-full max-w-2xl p-6 sm:p-8 lg:p-10 border-main border-opacity-30 my-10 dark:bg-main-dark dark:bg-opacity-20 relative">
        {showSuccess && (
          <div className=" bg-gradient-to-r from-accent to-accent-dark text-gray-100 mb-3 p-4 rounded-xl font-mono text-center  opacity-100">
            <p className="text-lg md:text-xl  text-center ">
             
              Job added successfully <PartyPopper className="inline-block text-pink-700 animate-pulse" /> <PartyPopper className="inline-block text-pink-700 animate-pulse" />  Top engineers will apply soon you can choose one . and you can add another job.
            </p>
          </div>
        )}
        <h2 className="dark:text-accent text-xl sm:text-2xl lg:text-3xl font-bold mb-6 text-main text-center">
          Add New Job
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-600 font-medium mb-2 dark:text-white text-sm sm:text-base">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-3 py-2 text-sm sm:text-base border border-main rounded-md focus:outline-none focus:ring-2 focus:ring-main ${errors.title ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="Enter title"
            />
            {errors.title && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="dark:text-white block text-gray-600 font-medium mb-2 text-sm sm:text-base">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`w-full px-3 py-2 text-sm sm:text-base border border-main rounded-md focus:outline-none focus:ring-2 focus:ring-main ${errors.description ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="Enter description"
              rows="4"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.description}
              </p>
            )}
          </div>

          <div>
            <label className="dark:text-white block text-gray-600 font-medium mb-2 text-sm sm:text-base">
              Location
            </label>
            <Select
              name="location"
              value={formData.location}
              onChange={(option) => handleSelectChange(option, { name: 'location' })}
              options={locationOptions}
              styles={customStyles}
              className="text-sm sm:text-base focus:ring-main "
              placeholder="Select location"
            />
            {errors.location && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.location}</p>
            )}
          </div>

          <div>
            <label className="dark:text-white block text-gray-600 font-medium mb-2 text-sm sm:text-base">
              Category
            </label>
            <Select
              name="category"
              value={formData.category}
              onChange={(option) => handleSelectChange(option, { name: 'category' })}
              options={categoryOptions}
              styles={customStyles}
              className="text-sm sm:text-base "
              placeholder="Select Category"
            />
            {errors.category && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.category}</p>
            )}
          </div>

          <div>
            <label className="dark:text-white block text-gray-600 font-medium mb-2 text-sm sm:text-base">
              Service
            </label>
            <div className="dark:text-white space-y-2 text-sm sm:text-base">
              {renderCheckboxes()}
            </div>
            {errors.service && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.service}</p>
            )}
          </div>

          <div className="pt-4">
            <Button
              className="w-full rounded-md text-sm sm:text-base"
              disabled={isSubmitting}
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
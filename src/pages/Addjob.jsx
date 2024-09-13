import { useState } from 'react';

const Addjob = () => {
  const [formData, setFormData] = useState({
    title: '',
    image: null,
    description: '',
    address: '',
    category: '',
    terms: false,
    selectedOptions: [] // To store selected checkboxes
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData((prevState) => ({
        ...prevState,
        selectedOptions: [...prevState.selectedOptions, value]
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        selectedOptions: prevState.selectedOptions.filter(option => option !== value)
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Submit logic here
  };

  const renderCheckboxes = () => {
    switch (formData.category) {
      case 'Concrete Construction':
        return (
          <>
            <label className="block">
              <input
                type="checkbox"
                value="Option 1 for Concrete Construction"
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Option 1 for Concrete Construction
            </label>
            <label className="block">
              <input
                type="checkbox"
                value="Option 2 for Concrete Construction"
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Option 2 for Concrete Construction
            </label>
          </>
        );
      case 'Consultation':
        return (
          <>
            <label className="block">
              <input
                type="checkbox"
                value="Option 1 for Consultation"
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Option 1 for Consultation
            </label>
            <label className="block">
              <input
                type="checkbox"
                value="Option 2 for Consultation"
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Option 2 for Consultation
            </label>
          </>
        );
      case 'Finnishing Work':
        return (
          <>
            <label className="block">
              <input
                type="checkbox"
                value="Option 1 for Finnishing Work"
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Option 1 for Finnishing Work
            </label>
            <label className="block">
              <input
                type="checkbox"
                value="Option 2 for Finnishing Work"
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Option 2 for Finnishing Work
            </label>
          </>
        );
      default:
        return null;
    }
  };

  // ثابتة وغير مرتبطة بالفئة
  const addressOptions = [
    'portfouad',
    'portsaid',
    'suez',
    'nasr city',
    'new capital',
    'badr',
    'el obour',
    'settlement',
    '10th of ramadan',
    'el shrok'
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">Add New Job</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            {/* Title */}
            <div className="">
              <label className="block text-gray-600 font-medium mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter title"
              />
            </div>

            {/* Image */}
            <div className="mb-4">
              <label className="block text-gray-600 font-medium mb-2">Add Image</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition duration-200">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16V8m0 8l-4-4m4 4l4-4m0 0l-4-4m4 4h6"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                  </div>
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              </div>
            </div>

            {/* Description */}
            <div className="">
              <label className="block text-gray-600 font-medium mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter description"
              ></textarea>
            </div>

            {/* Address */}
            <div className="mb-4">
              <label className="block text-gray-600 font-medium mb-2">Address</label>
              <select
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Address</option>
                {addressOptions.map((address) => (
                  <option key={address} value={address}>
                    {address}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div className="mb-4">
              <label className="block text-gray-600 font-medium mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                <option value="Concrete Construction">Concrete Construction</option>
                <option value="Consultation">Consultation</option>
                <option value="Finnishing Work">Finnishing Work</option>
              </select>
            </div>

            {/* Render checkboxes based on category */}
            <div className="mb-4 col-span-2">
              {renderCheckboxes()}
            </div>

            {/* Terms Checkbox */}
            <div className="mb-4 col-span-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-600">I agree to the terms and conditions</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addjob;

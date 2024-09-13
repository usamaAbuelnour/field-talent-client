import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Addjob = ({ token }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    category: '',
    service: [],
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      service: checked
        ? [...prevState.service, value]
        : prevState.service.filter((option) => option !== value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.location) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    const requestData = { ...formData };

    fetch('https://field-talent.vercel.app/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
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
        console.log('Job added successfully:', data);
        navigate('/showjobs');
      })
      .catch((error) => {
        setIsSubmitting(false);
        console.error('Error adding job:', error);
        alert('Failed to submit the job. Please try again.');
      });
  };

  const renderCheckboxes = () => {
    switch (formData.category) {
      case 'Concrete Construction':
        return (
          <>
            <label className="block">
              <input
                type="checkbox"
                value="Concrete1"
                checked={formData.service.includes('Concrete1')}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Concrete1
            </label>
            <label className="block">
              <input
                type="checkbox"
                value="Concrete2"
                checked={formData.service.includes('Concrete2')}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Concrete2
            </label>
            <label className="block">
              <input
                type="checkbox"
                value="Concrete3"
                checked={formData.service.includes('Concrete3')}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Concrete3
            </label>
          </>
        );
      case 'Consultation':
        return (
          <>
            <label className="block">
              <input
                type="checkbox"
                value="Consultation1"
                checked={formData.service.includes('Consultation1')}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Consultation1
            </label>
            <label className="block">
              <input
                type="checkbox"
                value="Consultation2"
                checked={formData.service.includes('Consultation2')}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Consultation2
            </label>
            <label className="block">
              <input
                type="checkbox"
                value="Consultation3"
                checked={formData.service.includes('Consultation3')}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Consultation3
            </label>
          </>
        );
      case 'Finnishing Work':
        return (
          <>
            <label className="block">
              <input
                type="checkbox"
                value="Finishing1"
                checked={formData.service.includes('Finishing1')}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Finishing1
            </label>
            <label className="block">
              <input
                type="checkbox"
                value="Finishing2"
                checked={formData.service.includes('Finishing2')}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Finishing2
            </label>
            <label className="block">
              <input
                type="checkbox"
                value="Finishing3"
                checked={formData.service.includes('Finishing3')}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Finishing3
            </label>
          </>
        );
      default:
        return <p className="text-gray-500">No services available for this category.</p>;
    }
  };

  const locationOptions = [
    'portfouad',
    'portsaid',
    'suez',
    'nasr city',
    'new capital',
    'badr',
    'el obour',
    'settlement',
    '10th of ramadan',
    'el shrok',
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">Add New Job</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            {/* title */}
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

            {/* description */}
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

            {/* location */}
            <div className="mb-4">
              <label className="block text-gray-600 font-medium mb-2">Location</label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select location</option>
                {locationOptions.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* category */}
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

            {/*  show checks based on category*/}
            <div className="mb-4 col-span-2">{renderCheckboxes()}</div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addjob;

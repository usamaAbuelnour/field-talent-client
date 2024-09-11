import React, { useEffect, useState } from 'react';
import { MapPin, Bell  } from 'lucide-react';

const ShowJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedService, setSelectedService] = useState('');

  useEffect(() => {
    fetch('/jobs.json')
      .then(response => response.json())
      .then(data => {
        setJobs(data);
        setFilteredJobs(data);
      })
      .catch(error => console.error('Error fetching jobs:', error));
  }, []);

  useEffect(() => {
    filterJobs();
  }, [selectedLocation, selectedCategory, selectedService]);

  const filterJobs = () => {
    let filtered = jobs;

    if (selectedLocation) {
      filtered = filtered.filter(job => job.location === selectedLocation);
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(job => job.category === selectedCategory);
    }

    if (selectedService) {
      filtered = filtered.filter(job => job.service === selectedService);
    }

    setFilteredJobs(filtered);
  };

  const uniqueLocations = [...new Set(jobs.map(job => job.location))];
  const uniqueCategories = [...new Set(jobs.map(job => job.category))];
  const uniqueServices = [...new Set(jobs.map(job => job.service))];

  return (
    <div className="container mx-auto p-4 ">
        <h1 className="text-4xl font-extrabold text-center mb-8 mt-20 
        shadow-lg inline-block p-4 rounded-full bg-white transition-colors duration-300 text-gray-800 ">
        <span className="font-serif tracking-wider "> Available Jobs<Bell className="inline-block ml-2" size={30} color="#333" /></span>
        
      </h1>

      <div className="flex justify-center gap-2 items-center mb-8">
        <select
          className="p-2 border border-gray-300 rounded-md"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="">All Locations</option>
          {uniqueLocations.map((location, index) => (
            <option key={index} value={location}>{location}</option>
          ))}
        </select>

        <select
          className="p-2 border border-gray-300 rounded-md"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {uniqueCategories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>

        <select
          className=" border border-gray-300 rounded-md inline-block p-3"
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
        >
          <option value="">All Services</option>
          {uniqueServices.map((service, index) => (
            <option key={index} value={service}>{service}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap">
        {filteredJobs.map((job, index) => (
          <div
            key={index}
            className="w-full p-4 mb-4 rounded-lg shadow-md bg-gray-100"
          >
            <h2
              className="text-2xl font-bold mb-4 text-center p-2 mx-auto bg-white w-max"
            >
              {job.title}
            </h2>
            <p className="mb-4 p-4 bg-white rounded-md">
              {job.description}
            </p>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4 bg-white p-4 rounded-md">
                <span className="text-lg font-semibold border border-gray-300 p-2 rounded-md">
                  {job.category}
                </span>
                <span className="text-lg border border-gray-300 p-2 rounded-md">
                  {job.service}
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-white p-4 rounded-md ml-4">
                <MapPin size={20} color="#2DD3B7" />
                <span className="text-lg">{job.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowJobs;

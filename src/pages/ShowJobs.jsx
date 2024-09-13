import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FilterJobs from '../components/FilterJobs';
import ShowJobCard from '../components/ShowJobCard';
import { Bell } from 'lucide-react';

const ShowJobs = ({ token }) => { 
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login'); 
      return;
    }

    fetch('https://field-talent.vercel.app/jobs', {
      headers: {
        'Authorization': `Bearer ${token}`,  
      }
    })
      .then(response => response.json())
      .then(data => {
        setJobs(data);
        setFilteredJobs(data);
      })
      .catch(error => console.error('Error fetching jobs:', error));
  }, [token, navigate]);

  useEffect(() => {
    filterJobs();
  }, [selectedLocation, selectedCategory, selectedServices]);

  const filterJobs = () => {
    let filtered = jobs;

    if (selectedLocation) {
      filtered = filtered.filter(job => job.location === selectedLocation.value);
    }

    if (selectedCategory) {
      filtered = filtered.filter(job => job.category === selectedCategory.value);
    }

    if (selectedServices.length > 0) {
      filtered = filtered.filter(job => 
        job.service.some(service => selectedServices.some(selected => selected.value === service))
      );
    }

    setFilteredJobs(filtered);
  };

  const uniqueLocations = [...new Set(jobs.map(job => job.location))];
  const uniqueCategories = [...new Set(jobs.map(job => job.category))];
  const uniqueServices = [...new Set(jobs.flatMap(job => job.service))];

  const locationOptions = uniqueLocations.map(location => ({ value: location, label: location }));
  const categoryOptions = uniqueCategories.map(category => ({ value: category, label: category }));
  const serviceOptions = uniqueServices.map(service => ({ value: service, label: service }));

  return (
    <div className="container mx-auto p-4">
       <h1 className=" font-bold  mb-8 mt-20 shadow-lg inline-block p-4 rounded-lg bg-white">
      <span className="font-serif text-main text-xl md:text-2xl lg:text-3xl">
        Available Jobs 
        <Bell className="inline-block ml-2 text-main text-xl md:text-2xl lg:text-3xl" size={20} />
      </span>
    </h1>

      <FilterJobs
        locationOptions={locationOptions}
        categoryOptions={categoryOptions}
        serviceOptions={serviceOptions}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedServices={selectedServices}
        setSelectedServices={setSelectedServices}
      />

      <div className="flex flex-wrap">
        {filteredJobs.map((job, index) => (
          <ShowJobCard
            key={index}
            job={job}
          />
        ))}
      </div>
    </div>
  );
};

export default ShowJobs;

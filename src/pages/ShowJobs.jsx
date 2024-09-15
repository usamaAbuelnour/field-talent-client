/* eslint-disable react/prop-types */
import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FilterJobs from '../components/FilterJobs';
import ShowJobCard from '../components/ShowJobCard';
import Loading from '../components/lodding';
import axios from 'axios';

import { Bell } from 'lucide-react';
import { data } from 'autoprefixer';

const ShowJobs = ({ token }) => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    window.scrollTo(0, 0);
        axios.get('https://field-talent.vercel.app/jobs', {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(response => {
      setJobs(response.data);
      console.log(response.data);
      setFilteredJobs(response.data);
      setIsLoading(false);
    })
    .catch(() => {
      setIsLoading(false);
      navigate('/not-found'); 
    });
  }, [token, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-2 sm:p-5">
      <h1 className="font-bold mb-4 sm:mb-8 mt-10 sm:mt-20 text-center bg-white">
        <span className="font-serif shadow-lg rounded-lg text-main text-lg sm:text-xl md:text-2xl lg:text-3xl inline-block p-3 sm:p-5">
          Available Jobs
          <Bell className="inline-block ml-2 text-main text-lg sm:text-xl md:text-2xl lg:text-3xl" size={20} />
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

<div className="flex flex-wrap px-2 sm:px-5 md:px-10 lg:px-20">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => (
            <ShowJobCard
              key={index}
              job={job}
            />
          ))
        ) : (
          <p className="text-center text-main m-auto text-3xl"> No jobs available</p> 
        )}
      </div>
    </div>
  );
};

export default ShowJobs;
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FilterJobs from '../components/showJopComponents/FilterJobs';
import ShowJobCard from '../components/showJopComponents/ShowJobCard';
import Loading from '../components/uiComponents/Loading';
import { Bell } from 'lucide-react';
import apiService from './../Api/AxiosServiceConfiguration';

const ShowJobs = ({ isDarkMode }) => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [serviceOptions, setServiceOptions] = useState([]);
  const [NoAvailableMassage, setNoAvailableMassage] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0,0)
    const searchParams = new URLSearchParams(location.search);
    fetchJobs(searchParams);
  }, [location.search, currentPage]);

  const fetchJobs = async (params) => {
    setIsLoading(true);
    setNoAvailableMassage(null);
    try {
      const response = await apiService.getJobs({
        ...Object.fromEntries(params.entries()),
        page: currentPage
      });
      const jobsData = response.data;
      if (jobsData.jobs && Array.isArray(jobsData.jobs)) {
        setJobs(jobsData.jobs);
        setTotalPages(jobsData.pagesCount);
        updateFilterOptions(jobsData.jobs);
      } else if (typeof jobsData === 'string') {
        setNoAvailableMassage(jobsData);
      }
    } catch (error) {
      navigate('/not-found', { replace: true });
    } finally {
      setIsLoading(false);
    }
  };

  const updateFilterOptions = (jobsData) => {
    const locations = [...new Set(jobsData.map(job => job.location))];
    const categories = [...new Set(jobsData.map(job => job.category))];
    const services = [...new Set(jobsData.flatMap(job => job.service))];

    setLocationOptions(locations.map(location => ({ value: location, label: location })));
    setCategoryOptions(categories.map(category => ({ value: category, label: category })));
    setServiceOptions(services.map(service => ({ value: service, label: service })));

    const searchParams = new URLSearchParams(location.search);
    const locationParam = searchParams.get('location');
    const categoryParam = searchParams.get('category');
    const servicesParam = searchParams.getAll('service');

    if (locationParam) {
      setSelectedLocation({ value: locationParam, label: locationParam });
    }
    if (categoryParam) {
      setSelectedCategory({ value: categoryParam, label: categoryParam });
    }
    if (servicesParam.length) {
      setSelectedServices(servicesParam.map(service => ({ value: service, label: service })));
    }
  };

  const updateFilters = (newParams) => {
    const searchParams = new URLSearchParams(location.search);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === '') {
        searchParams.delete(key);
      } else if (Array.isArray(value)) {
        searchParams.delete(key);
        value.forEach(v => searchParams.append(key, v));
      } else {
        searchParams.set(key, value);
      }
    });
    navigate(`?${searchParams.toString()}`, { replace: true });
  };

  const handleLocationChange = (selectedOption) => {
    setSelectedLocation(selectedOption);
    updateFilters({ location: selectedOption ? selectedOption.value : null });
  };

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
    updateFilters({ category: selectedOption ? selectedOption.value : null });
  };

  const handleServiceChange = (selectedOptions) => {
    setSelectedServices(selectedOptions);
    updateFilters({ service: selectedOptions.map(option => option.value) });
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', page);
    navigate(`?${searchParams.toString()}`, { replace: true });
  };

  if (isLoading) {
    return <Loading />;
  }

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={`${isDarkMode ? "dark" : ""} container mx-auto p-2 sm:p-5`}>
      <h1 className="font-bold mb-4 sm:mb-8 mt-10 sm:mt-20 text-center">
        <span className="font-serif shadow-lg rounded-lg text-main text-lg sm:text-xl md:text-2xl lg:text-3xl inline-block p-3 sm:p-5 dark:text-accent">
          Available Jobs
          <Bell className="inline-block ml-2 text-main text-lg sm:text-xl md:text-2xl lg:text-3xl" size={20} />
        </span>
      </h1>

      <FilterJobs
        locationOptions={locationOptions}
        categoryOptions={categoryOptions}
        serviceOptions={serviceOptions}
        selectedLocation={selectedLocation}
        setSelectedLocation={handleLocationChange}
        selectedCategory={selectedCategory}
        setSelectedCategory={handleCategoryChange}
        selectedServices={selectedServices}
        setSelectedServices={handleServiceChange}
      />

      <div className="flex flex-wrap px-2 sm:px-5 md:px-10 lg:px-20">
        {jobs.length > 0 ? (
          jobs.map((job, index) => (
            <ShowJobCard
              key={index}
              job={job}
            />
          ))
        ) : (
          <p className="text-center text-main m-auto text-3xl">{NoAvailableMassage || 'No jobs available'}</p>
        )}
      </div>

      {totalPages > 1 && (
  <div className="flex flex-wrap justify-center gap-2 mt-4 sm:gap-4 md:mr-8">
    {pageNumbers.map(number => (
      <button
        key={number}
        onClick={() => handlePageChange(number)}
        className={`px-3 py-1.5 text-sm sm:px-4 sm:py-2 sm:text-base md:px-5 md:py-2.5 md:text-lg lg:px-6 lg:py-3 lg:text-xl border rounded ${currentPage === number ? 'bg-main text-white' : 'text-main'}`}
        disabled={currentPage === number}
      >
        {number}
      </button>
    ))}
  </div>
      )}

    </div>
  );
};

export default ShowJobs;

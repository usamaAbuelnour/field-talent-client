/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import apiService from '../Api/AxiosServiceConfiguration';
import Loading from '../components/uiComponents/Loading';
import NoPage from '../components/uiComponents/NoPage';
import MyJobCard from '../components/MyJobComponent/MyJobCard'


export default function MyJobForClient() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchJobs = async () => {
      try {
         
        const response = await apiService.clientJobs();
        const fetchedJobs = response.data.jobs; 
         console.log( fetchedJobs);
        if (!Array.isArray(fetchedJobs)) {
          setJobs([]); 
        } else {
          setJobs(fetchedJobs); 
        }

        console.log(fetchedJobs);

      } catch (err) {
        setError("We apologize, an error occurred. You can reload the page or contact us to resolve it as soon as possible.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <NoPage
        title="Error"
        description= {error }
        buttonText="Home"
        buttonTo="/" 
      />
    );
  }
  
  if (!jobs || jobs.length === 0) {
    return (
      <NoPage 
        title="No Jobs" 
        description="You didn't add any jobs." 
        buttonText="Add Job" 
        buttonTo="/add-job" 
      />
    );
  }

  return (
    <div className="md:mx-20 px-4 py-4 my-10">
      <h1 className="text-4xl font-bold text-main text-center mb-8 dark:text-accent">My Jobs</h1>
      <div className="space-y-6">
        {jobs.map((job) => (
          <MyJobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
}

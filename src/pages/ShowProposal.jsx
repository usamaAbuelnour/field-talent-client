import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Maximize2, MapPin } from 'lucide-react';
import apiService from '../Api/AxiosServiceConfiguration';
import Loading from '../components/uiComponents/Loading';

const ShowProposal = () => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState(null);
  
  const location = useLocation();
  const jobId = new URLSearchParams(location.search).get('jobId');

  useEffect(() => {
    const fetchJobAndProposals = async () => {
      if (!jobId) {
        setError('No job ID provided');
        setLoading(false);
        return;
      }

      try {
        const response = await apiService.clientJobs();
        const selectedJob = response.data.jobs.find(job => job._id === jobId);
        
        if (selectedJob) {
          setJob(selectedJob);
        } else {
          setError('Job not found');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch job and proposals');
      } finally {
        setLoading(false);
      }
    };

    fetchJobAndProposals();
  }, [jobId]);

  const openModal = (proposal) => {
    setSelectedProposal(proposal);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProposal(null);
  };

  if (loading) return <Loading />;
  if (error) return <div className="text-center text-2xl text-red-600 mt-12">{error}</div>;
  if (!job) return <div className="text-center text-2xl mt-12">Job not found</div>;

  return (
    <div className="mt-20">
      <div className="container mx-auto p-4 px-4 md:px-20 mb-12">
        <div className="bg-white shadow-lg rounded-xl mb-10 p-6 md:p-8">
          <h1 className="text-4xl font-bold text-center text-main mb-6">{job.title}</h1>
          <p className="mb-4"><span className="font-semibold text-main">Description:</span> {job.description}</p>
          <div className="flex justify-between mb-4">
            <p><span className="font-semibold text-main">Category:</span> {job.category}</p>
            <p><span className="font-semibold text-main">Service:</span> {job.service.join(' | ')}</p>
          </div>
          <p className="mb-2">
            <span className="font-semibold text-main">
              <MapPin size={17} className="mr-2 text-main inline-block" />Location:
            </span> {job.location}
          </p>
          <p className="text-sm text-gray-600"><span className="font-semibold">Created At:</span> {new Date(job.createdAt).toLocaleString()}</p>
        </div>

        <h2 className="text-3xl font-bold text-main mb-6">Proposals</h2>
        
        {job.proposals.map((proposal, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl mb-10 p-6 md:p-8 cursor-pointer transform hover:-translate-y-2 transition duration-300 ease-in-out"
            onClick={() => openModal(proposal)}
          >
            <div className="flex items-start mb-4">
              <img
                src={proposal.freelancerId.profilePicture || "https://via.placeholder.com/150"}
                alt="Freelancer Avatar"
                className="w-24 h-24 rounded-full object-cover mr-4 shadow-md"
              />
              <div className="flex-grow me-16">
                <h3 className="text-2xl font-semibold text-indigo-600">
                  {`${proposal.freelancerId.firstName} ${proposal.freelancerId.lastName}`}
                </h3>
                <p className="text-gray-600 mt-2 line-clamp-3">
                  {proposal.coverLetter}
                </p>
              </div>
              <Maximize2
                className="h-6 w-6 text-indigo-600 hover:text-gray-700 cursor-pointer transition duration-300 ease-in-out flex-shrink-0"
                onClick={() => openModal(proposal)}
              />
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center">
                <span className="text-gray-600 mr-2 ms-10">Budget:</span>
                <span className="text-xl font-bold text-green-600">
                  ${proposal.bidAmount}
                </span>
              </div>
              <div className="flex space-x-4">
                <button className="btn btn-success text-sm py-1 px-5 bg-green-500 border-none text-white hover:bg-green-600 hover:shadow-lg transition duration-300 ease-in-out rounded-lg">
                  Accept
                </button>
                <button className="btn btn-error text-sm py-1 px-5 border-2 border-red-500 text-red-500 bg-transparent hover:bg-red-500 hover:text-white hover:shadow-lg transition duration-300 ease-in-out rounded-lg">
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <div
              className="bg-white p-8 rounded-lg w-3/4 md:w-1/2 shadow-2xl transform transition-all duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="float-right text-gray-700 text-xl font-bold"
                onClick={closeModal}
              >
                ✕
              </button>
              {selectedProposal && (
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-indigo-600">
                    {`${selectedProposal.freelancerId.firstName} ${selectedProposal.freelancerId.lastName}'s Proposal`}
                  </h3>
                  <img
                    src={selectedProposal.freelancerId.profilePicture || "https://via.placeholder.com/150"}
                    alt="Freelancer Avatar"
                    className="w-28 h-28 rounded-full mb-6 mx-auto shadow-lg"
                  />
                  <p className="text-gray-700 mb-6">
                    {selectedProposal.coverLetter}
                  </p>

                  <div className="flex space-x-6 justify-between items-baseline">
                    <div className="flex mb-8">
                      <span className="text-gray-600">Budget:</span>
                      <span className="text-green-600 font-semibold ms-2">
                        ${selectedProposal.bidAmount}
                      </span>
                    </div>
                    <div className="flex space-x-4">
                      <button className="btn btn-success text-sm py-1 px-4 bg-green-500 text-white hover:bg-green-600 transition duration-300 ease-in-out rounded-lg">
                        Accept
                      </button>
                      <button className="btn btn-error text-sm py-1 px-4 border-2 border-red-500 text-red-500 bg-transparent hover:bg-red-500 hover:text-white hover:shadow-lg transition duration-300 ease-in-out rounded-lg">
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowProposal;
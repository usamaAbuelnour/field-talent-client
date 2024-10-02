import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from "../components/uiComponents/Button";
import apiService from '../Api/AxiosServiceConfiguration';
import { Smile, FileCheck2, FileSpreadsheet, HardHat, ReceiptPoundSterling ,Blocks , House,KeySquare ,BrickWall} from 'lucide-react';

const JobDetailsForClientToSeeProposal = () => {
  const location = useLocation();
  const job = location.state?.job;
  const [proposals, setProposals] = useState(job?.proposals || []);
  const [acceptedProposal, setAcceptedProposal] = useState(null);
  const [showSmile, setShowSmile] = useState(false);

  if (!job) {
    return (
      <div className="container mx-auto p-4 text-center text-red-600">
        No job details available. Please go back and try again.
      </div>
    );
  }

  const handleAccept = async (index) => {
    const proposalId = proposals[index]?._id;
    const status = { status: "accepted" };

    try {
      const response = await apiService.updateProposalStatus(proposalId, status);
      setAcceptedProposal(proposals[index]);
      setProposals([]);
      setShowSmile(true);
      setTimeout(() => setShowSmile(false), 3000);
    } catch (error) {
      console.error("Error accepting proposal:", error);
    }
  };

  const handleReject = async (index) => {
    const proposalId = proposals[index]._id;
    const status = { status: 'rejected' };

    try {
      await apiService.updateProposalStatus(proposalId, status);
      const updatedProposals = proposals.filter((_, i) => i !== index);
      setProposals(updatedProposals);
    } catch (error) {
      console.error("Error rejecting proposal:", error);
    }
  };

  return (
    <div className="container mx-auto p-2 sm:p-3 md:p-4 lg:p-6">
    <div className=" bg-white shadow-sm dark:bg-main rounded-md mt-24 mb-6 sm:mb-8 md:mb-10 lg:mb-11 transition-all duration-300 ease-in-out transform hover:shadow-sm sm:mt-10 md:mt-12 lg:mt-14 p-3 sm:p-4 md:p-5 lg:p-6">
      <h1 className="dark:text-accent text-2xl sm:text-lg md:text-2xl  lg:text-3xl font-bold text-center mb-4 sm:mb-6 md:mb-7 lg:mb-8 text-main animate-fade-in-down">
        {job.title}
      </h1>
      <p className="dark:text-white text-sm sm:text-base md:text-lg lg:text-xl mb-2 sm:mb-3 text-black flex justify-center break-all">
        {job.description}
      </p>
      
  
    </div>
 
  

      {showSmile && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce">
          <Smile size={64} color="#4CAF50" />
        </div>
      )}

      {acceptedProposal ? (
        <div className="bg-white dark:bg-main dark:bg-opacity-25 border-l-4 border-main p-3 sm:p-4 md:p-5 lg:p-6 mb-4 sm:mb-5 md:mb-6 rounded-lg shadow-md">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-5 lg:mb-6 text-main">Accepted Proposal</h2>
          <div className="text-sm sm:text-base md:text-lg lg:text-xl mb-2 sm:mb-3 md:mb-4 break-all flex flex-col items-start">
            <div className="flex items-center">
              <FileCheck2 className="inline-block mr-2" />
              <span>Cover Letter:</span>
            </div>
            <p className="mt-2">{acceptedProposal.coverLetter}</p>
          </div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-2 sm:mb-3 md:mb-4"><span>Cost:</span> {acceptedProposal.totalCost}</p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-2 sm:mb-3 md:mb-4"><span>Freelancer:</span> {acceptedProposal.userId?.firstName || 'Not available'}</p>
        </div>
      ) : (
        <>
          <h2 className="dark:text-accent-dark text-xlw-fit sm:p-1 md:p-3 rounded-full sm:text-2xl md:text-3xl lg:text-4xl font-bold mt-6 sm:mt-8 md:mt-9 lg:mt-10 mb-4 sm:mb-5 md:mb-6 text-main ">
            <HardHat /> Proposals
          </h2>

          {proposals.length > 0 ? (
            proposals.map((proposal, index) => (
              <div
                key={index}
                className="bg-white dark:bg-main dark:bg-opacity-25 border-l-4 border-stone-900 p-3 sm:p-4 md:p-5 lg:p-6 mb-6 sm:mb-8 md:mb-10 lg:mb-12 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1"
              >
                <div className="text-sm sm:text-base md:text-lg lg:text-xl mb-2 sm:mb-3 md:mb-4 flex flex-col">
                  <div className="flex items-center justify-center mb-4">
                    <FileSpreadsheet className="inline-block mr-1 text-main sm:text-base md:text-xl lg:text-3xl dark:text-accent-dark" />
                    <span className='text-main sm:text-base md:text-xl lg:text-3xl dark:text-accent-dark'>Cover Letter</span>
                  </div>
                  <p className="mt-2 break-all dark:text-white ">{proposal.coverLetter}</p>
                </div>
                <div className="flex justify-between items-center sm:space-x-3 md:space-x-4 mt-2 sm:mt-3 md:mt-4">
                  <div className="flex items-center">
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-0 flex items-center dark:text-white">
                      <span> EPG :</span> {proposal.totalCost}
                      <ReceiptPoundSterling size={18} className="ml-1 text-main dark:text-accent" />
                    </p>
                  </div>
                  <div className="space-x-2 flex">
                    <Button
                      text="Accept"
                      variant="fill"
                      size="md"
                      onClick={() => handleAccept(index)}
                      className="sm:text-base md:text-lg lg:text-xl"
                    />
                    <Button
                      text="Reject"
                      variant="outline"
                      size="md"
                      onClick={() => handleReject(index)}
                      className="sm:text-base md:text-lg lg:text-xl dark:text-white"
                    />
                  </div>
                </div>

              </div>

            ))
          ) : (
            <p className="text-center text-gray-600 italic text-sm sm:text-base md:text-lg lg:text-xl">
              No proposals yet.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default JobDetailsForClientToSeeProposal;
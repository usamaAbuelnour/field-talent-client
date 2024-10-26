/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */

import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from "../components/uiComponents/Button";
import apiService from '../Api/AxiosServiceConfiguration';
import { Smile, FileCheck2, FileSpreadsheet, HardHat, ReceiptPoundSterling, } from 'lucide-react';
import NoPage from '../components/uiComponents/NoPage';
import engineers from "../../public/engineers.png";




const JobDetailsForClientToSeeProposal = () => {



  const location = useLocation();
  console.log(location);

  const job = location.state?.job;
  const [acceptedProposal, setAcceptedProposal] = useState(null);
  const [showSmile, setShowSmile] = useState(false);

  const [proposals, setProposals] = useState(() => {
    const acceptedProposal = job?.proposals.find(p => p.status === 'accepted');
    if (acceptedProposal) {
      return [acceptedProposal];
    }
    return job?.proposals.filter(p => p.status === 'pending') || [];
  });


  if (!job) {
    return (
      <div className="container h-screen mx-auto p-4 text-center text-red-600">
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

  if (proposals.length === 0) {
    return (
      <NoPage
        title={`Dear ${job.userId.firstName}`}
        description={
          <>
            Unfortunately, this JOB "{job.title}" Has No Proposal Yet
          </>
        }
        buttonText="My Jobs"
        buttonTo="/My-Job"
      />
    );
  }

  return (
    <div className="container  min-h-screen mx-auto  ">
      {showSmile && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce">
          <Smile size={64} color="#4CAF50" />
        </div>
      )}

      {acceptedProposal ? (
        <div className="bg-white dark:bg-main dark:bg-opacity-25 border-l-4 border-main p-3  md:p-5  mb-4  md:mb-6 rounded-lg shadow-md">
          <h2 className="text-xl  md:text-3xl  font-bold mb-3  md:mb-5  text-main">Accepted Proposal</h2>
          <div className="text-sm  md:text-lg  mb-2 md:mb-4 break-all flex flex-col items-start">
            <div className="flex items-center">
              <FileCheck2 className="inline-block mr-2" />
              <span>Cover Letter:</span>
            </div>
            <p className="mt-2">{acceptedProposal.coverLetter}</p>
          </div>
          <p className="text-sm  md:text-lg  mb-2 md:mb-4">
            <span>Cost:</span> {acceptedProposal.totalCost}
          </p>
          <p className=" text-base md:text-lg   mb-3 md:mb-4">
            <span>Freelancer:</span> {acceptedProposal.userId?.firstName || 'Not available'}
          </p>
        </div>
      ) : (


        <div className='w-full lg:w-11/12  mx-auto md:p-4 p-1 lg:p-8   rounded-md '>

          <h2 className=" flex flex-col items-center justify-center gap-0  dark:text-accent-dark text-xlw-fit p-1 md:p-3 rounded-full text-2xl md:text-3xl  font-semibold pt-20   mb-6 text-main ">
            <HardHat className='animate-pulse' /> Proposals
          </h2>

          {proposals.map((proposal, index) => (
            <div
              key={index}
              className=" dark:bg-main mb-12  dark:bg-opacity-25  p-4 md:p-5  rounded-lg hover:shadow-lg shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-main dark:border-main"
            >
              <div className="text-base md:text-lg  flex flex-col">
                <div className="flex flex-col  mb-0">
                  <p className=' inline-block bg-gradient-to-r from-green-100 to-slate-200 dark:from-teal-900 dark:to-main-dark dark:text-white w-fit pr-2 pl-1 rounded-md '>Cover Latter</p>
                  <span className='hidden  w-36 mr-3  md:pt-4 lg:pt-0'>
                    <img src={engineers} alt="cover letter" />
                  </span>
                  <p className="mt-2 break-all dark:text-white text-sm md:text-base my-4 border-b pb-3 ">{proposal.coverLetter}</p>

                </div>

              </div>
              {/* <hr className='pt-0.5 h-0 bg-slate-200  border-none mt-2 w-5/6 md:w-4/6 mx-auto dark:bg-main ' /> */}

              <div className="flex md:flex-row flex-col items-center md:justify-between w-full mt-2 lg:mt-3">
                <Button
                  text="Accept"
                  variant="fill"
                  size="sm"
                  onClick={() => handleAccept(index)}
                  className=" md:w-1/5 w-full md:text-xl text-base order-2 md:order-1"
                />

                <div className='order-1 md:order-2 md:mb-0 mb-1.5'>
                  <div className="text-nowrap  flex  justify-center items-center dark:text-white text-sm md:text-base">
                    <p className='w-fit  pb-0  p-2 rounded-md '> <span className='inline-block '>Cost :</span> {proposal.totalCost} EGP</p>
                  </div>

                  <div className="flex  justify-center gap-1 items-center pt-1  my-0 mx-1 ">
                    <div className="w-1 h-1 bg-gradient-to-r from-accent-dark to-accent rounded-full animate-spin inline-block  mb-0"></div>
                    <div className="w-1 h-1 bg-gradient-to-r from-accent-dark to-accent rounded-full animate-spin inline-block  mb-0"></div>
                    <div className="w-1 h-1 bg-gradient-to-r from-accent-dark to-accent rounded-full animate-spin inline-block  mb-0"></div>
                  </div>
                </div>

                <Button
                  text="Reject"
                  variant="outline"
                  size="sm"
                  onClick={() => handleReject(index)}
                  className=" md:w-1/5 w-full text-red-700 md:text-xl text-base  bg-red-300 hover:bg-red-400 border-red-100 border dark:bg-red-500 dark:text-red-900   hover:border-red-200 order-3 "


                />
              </div>
            </div>
          ))}
        </div>

      )}
    </div>

  );

};


export default JobDetailsForClientToSeeProposal;

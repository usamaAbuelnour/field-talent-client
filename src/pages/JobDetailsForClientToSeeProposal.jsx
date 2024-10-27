import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from "../components/uiComponents/Button";
import apiService from '../Api/AxiosServiceConfiguration';
import { Smile, FileCheck2, HardHat } from 'lucide-react';
import NoPage from '../components/uiComponents/NoPage';
import deal from '../../public/deal.png'

const JobDetailsForClientToSeeProposal = () => {
  const location = useLocation();
  const job = location.state?.job;
  console.log(job);
  
  const [acceptedProposal, setAcceptedProposal] = useState(null);
  const [showSmile, setShowSmile] = useState(false);

  const [proposals, setProposals] = useState(() => {
    if (job?.acceptedProposal) {
      const foundProposal = job.proposals.find(p => p._id === job.acceptedProposal);
      console.log("ffffffffff",foundProposal);
      setAcceptedProposal(foundProposal)
      
      return foundProposal ? [foundProposal] : job.proposals.filter(p => p.status === 'pending' || p.status === 'awaiting confirmation');
    }
    return job?.proposals.filter(p => p.status === 'pending' || p.status === 'awaiting confirmation');
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
      setProposals([proposals[index]]);
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
        description={`Unfortunately, this JOB "${job.title}" Has No Proposal Yet`}
        buttonText="My Jobs"
        buttonTo="/My-Job"
      />
    );
  }

  return (
    <div className=" min-h-screen mx-auto">
      {showSmile && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce">
          <Smile size={64} color="#4CAF50" />
        </div>
      )}

      {job?.acceptedProposal ? (
      <div className='w-full min-h-screen px-6 bg-green-200 dark:bg-accent-dark mx-auto md:p-4 p-1 lg:p-8 rounded-md '>
      <h2 className="mx-auto md:mx-0 bg-transparent  md:bg-gradient-to-l w-fit pl-0.5 from-green-100 to-green-300 dark:from-teal-900 dark:to-main-dark flex mt-10 items-center justify-center gap-0  text-xlw-fit p-0.5 md:p-3 rounded-full text-2xl md:text-3xl font-semibold pt-20 mb-6 text-main-dark dark:text-accent-dark ">
         Accepted Proposal 
      </h2>

      <div className='flex  md:flex-row-reverse'>
        <img src={deal} alt="" className="hidden md:block w-1/3 mx-9 md mb-12  pt-0" />
        <div className="mb-12 flex-grow dark:bg-opacity-25 p-4 md:p-5 rounded-lg hover:shadow-lg shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-main dark:border-main bg- dark:bg-accent">
          <div className="text-base md:text-lg flex flex-col">
            <div className="flex flex-col mb-0">
              <div className="flex items-center mb-3 justify-center md:justify-start">
                <FileCheck2 className="inline-block mr-2 text-main dark:text-green-900" />
                <p className='inline-block font-semibold   w-fit pr-2 pl-1 rounded-md border-2   border-red-800 text-red-600 dark:text-rose-900 dark:border-rose-900'>"Please contact the engineer within 24 hours."</p>
              </div>
              <p className="mt-2 break-all  text-sm md:text-base my-4 border-y pb-3 dark:border-accent">{acceptedProposal?.coverLetter}</p>
            </div>
            <p className="text-sm md:text-lg mb-2 md:mb-4"><span>Cost:</span> {acceptedProposal?.totalCost} EGP</p>
            <p className="text-base md:text-lg mb-3 md:mb-4"><span>Engineer Name :</span> {acceptedProposal?.userId?.firstName || 'Not available'} {acceptedProposal?.userId?.lastName || 'Not available'} </p>
            <p className="text-base md:text-lg mb-3 md:mb-4"><span>Email:</span> {acceptedProposal?.userId?.email || 'Not available'}</p>
          </div>
        </div>
      </div>
    </div>
      ) : (
        <div className='w-full min-h-screen  mx-auto md:p-4 p-1 lg:p-8 rounded-md px-6'>
          <h2 className="flex flex-col items-center justify-center gap-0 dark:text-accent-dark text-xlw-fit p-1 md:p-3 rounded-full text-2xl md:text-3xl font-semibold pt-20 mb-6 text-main ">
            <HardHat className='animate-bounce inline' /> Proposals
          </h2>

          {proposals.map((proposal, index) => (
            <div
              key={index}
              className="dark:bg-main mb-12 dark:bg-opacity-25 p-4 md:p-5 rounded-lg hover:shadow-lg shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-main dark:border-main"
            >
              <div className="text-base md:text-lg flex flex-col">
                <div className="flex flex-col mb-0">
                  <p className='inline-block bg-gradient-to-r from-green-100 to-slate-200 dark:from-teal-900 dark:to-main-dark dark:text-white w-fit pr-2 pl-1 rounded-md'>Cover Letter</p>
                  <p className="mt-2 break-all dark:text-white text-sm md:text-base my-4 border-b pb-3 ">{proposal.coverLetter}</p>
                </div>
              </div>

              <div className="flex md:flex-row flex-col items-center md:justify-between w-full mt-2 lg:mt-3">
                {!job?.acceptedProposal && (
                  <>
                    <Button
                      text="Accept"
                      variant="fill"
                      size="sm"
                      onClick={() => handleAccept(index)}
                      className="md:w-1/5 w-full md:text-xl text-base order-2 md:order-1"
                    />
                    <Button
                      text="Reject"
                      variant="outline"
                      size="sm"
                      onClick={() => handleReject(index)}
                      className="md:w-1/5 w-full text-red-700 md:text-xl text-base bg-red-300 hover:bg-red-400 border-red-100 border dark:bg-red-500 dark:text-red-900 hover:border-red-200 order-3"
                    />
                  </>
                )}
                <div className='order-1 md:order-2 md:mb-0 mb-1.5'>
                  <div className="text-nowrap flex justify-center items-center dark:text-accent text-base md:text-lg font-semibold text-teal-800">
                    <p className='w-fit pb-0 p-2 rounded-md'><span className='inline-block'>Cost :</span> {proposal.totalCost} EGP</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobDetailsForClientToSeeProposal;

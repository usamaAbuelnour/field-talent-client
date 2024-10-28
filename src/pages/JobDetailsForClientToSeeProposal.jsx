import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Button from "../components/uiComponents/Button";
import apiService from "../Api/AxiosServiceConfiguration";
import {
  FileCheck2, 
  CheckCircle2, 
  Phone, 
  Mail, 
  MessageCircle,
  UserCheck,
  ArrowRight,
  HardHat
} from "lucide-react";
import NoPage from "../components/uiComponents/NoPage";

// Separate DetailItem component
const DetailItem = ({ icon, label, value, showLine = false }) => (
  <div className="relative">
    {showLine && (
      <div className="absolute left-6 top-full w-px h-4 bg-emerald-300 dark:bg-emerald-700" />
    )}
    <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors group relative">
      <div className="group-hover:scale-110 transition-transform bg-emerald-100 dark:bg-emerald-900/50 p-2 rounded-full">
        {icon}
      </div>
      <span className="font-semibold text-emerald-800 dark:text-emerald-400 min-w-[100px]">{label}:</span>
      <span className="text-slate-700 dark:text-slate-300 break-all">{value}</span>
    </div>
  </div>
);

// Separate AcceptedProposal component
const AcceptedProposal = ({ acceptedProposal }) => {
  return (
    <div className="w-full bg-gray-100 dark:bg-gradient-to-tr dark:from-slate-900 dark:to-slate-800 min-h-screen p-4 lg:p-8 rounded-md">
      <div className="flex items-center justify-center mb-8">
        <div className="relative">
          <h2 className="text-3xl font-semibold text-emerald-800 dark:text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-8 h-8 animate-bounce text-emerald-600 dark:text-emerald-400" />
            Accepted Proposal
          </h2>
          <div className="absolute -z-10 w-full h-full blur-lg bg-emerald-200 dark:bg-emerald-900 opacity-20 animate-pulse" />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="flex-grow bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-emerald-200 dark:border-emerald-900 shadow-lg max-w-3xl mx-auto w-full">
          <div className="p-6">
            {/* Urgent Notice */}
            <div className="mb-6 transform hover:scale-105 transition-transform">
              <div className="inline-flex items-center gap-2 px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-800">
                <FileCheck2 className="w-5 h-5" />
                Please contact the engineer within 24 hours
              </div>
            </div>

            {/* Connection Line */}
            <div className="relative w-full h-2 bg-emerald-200 dark:bg-emerald-800 rounded-full mb-6">
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4">
                {[...Array(4)].map((_, i) => (
                  <div 
                    key={i}
                    className={`w-3 h-3 bg-emerald-500 rounded-full animate-pulse`}
                    style={{ animationDelay: `${i * 75}ms` }}
                  />
                ))}
              </div>
            </div>

            {/* Cover Letter Section */}
            <div className="relative mb-6">
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
              <div className="p-4 bg-white/80 dark:bg-slate-900/80 rounded-lg shadow-inner border-l-4 border-emerald-500 min-h-[120px] max-h-[240px] overflow-y-auto">
                <p className="text-sm md:text-base dark:text-slate-200 whitespace-pre-wrap">
                  {acceptedProposal?.coverLetter}
                </p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <DetailItem 
                  icon={<UserCheck className="text-emerald-600 dark:text-emerald-400" />}
                  label="Cost"
                  value={`${acceptedProposal?.totalCost} EGP`}
                  showLine
                />
                <DetailItem 
                  icon={<UserCheck className="text-emerald-600 dark:text-emerald-400" />}
                  label="Engineer"
                  value={`${acceptedProposal?.userId?.firstName || 'Not available'} ${acceptedProposal?.userId?.lastName || ''}`}
                  showLine
                />
              </div>
              <div>
                <DetailItem 
                  icon={<Phone className="text-emerald-600 dark:text-emerald-400" />}
                  label="Phone"
                  value={acceptedProposal?.engineerId?.phoneNumbers || 'Not available'}
                  showLine
                />
                <DetailItem 
                  icon={<MessageCircle className="text-emerald-600 dark:text-emerald-400" />}
                  label="WhatsApp"
                  value={acceptedProposal?.engineerId?.whatsAppPhoneNumbers || 'Not available'}
                  showLine
                />
                <DetailItem 
                  icon={<Mail className="text-emerald-600 dark:text-emerald-400" />}
                  label="Email"
                  value={acceptedProposal?.userId?.email || 'Not available'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main component
const JobDetailsForClientToSeeProposal = () => {
  const location = useLocation();
  const job = location.state?.job;
  const [acceptedProposal, setAcceptedProposal] = useState(null);
  const [proposals, setProposals] = useState(() => {
    if (job?.acceptedProposal) {
      const foundProposal = job.proposals.find(
        (p) => p.status === job.acceptedProposal.status
      );
      if (foundProposal) {
        setAcceptedProposal(foundProposal);
        return [foundProposal];
      }
    }
    return job?.proposals.filter(
      (p) => p.status === "pending" || p.status === "awaiting confirmation"
    ) || [];
  });

  useEffect(() => {
    if (proposals.length === 0) {
      console.log("No more proposals left");
    }
  }, [proposals, acceptedProposal]);

  if (!job) {
    return (
      <div className="container h-screen mx-auto p-4 text-center text-red-600">
        No job details available. Please go back and try again.
      </div>
    );
  }

  const handleAccept = async (index) => {
    try {
      const proposalId = proposals[index]?._id;
      const status = { status: "accepted" };
      await apiService.updateProposalStatus(proposalId, status);
      
      const updatedProposal = { ...proposals[index], status: "accepted" };
      setAcceptedProposal(updatedProposal);
      setProposals([updatedProposal]);
    } catch (error) {
      console.error("Error accepting proposal:", error);
    }
  };

  const handleReject = async (index) => {
    try {
      const proposalId = proposals[index]._id;
      const status = { status: "rejected" };
      await apiService.updateProposalStatus(proposalId, status);
      setProposals(prev => prev.filter((_, i) => i !== index));
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
    <div className="min-h-screen mx-auto">
      {job?.acceptedProposal || acceptedProposal ? (
        <AcceptedProposal acceptedProposal={acceptedProposal} />
      ) : (
        <div className="w-full min-h-screen mx-auto md:p-4 p-1 lg:p-8 rounded-md px-6">
          <h2 className="z-50 flex flex-col items-center justify-center gap-0 dark:text-accent-dark text-xlw-fit p-1 md:p-3 rounded-full text-2xl md:text-3xl font-semibold pt-20 mb-6 text-main">
            <HardHat className="animate-bounce inline" /> Proposals
          </h2>

          {proposals.map((proposal, index) => (
            <div
              key={index}
              className="dark:bg-main mb-12 dark:bg-opacity-25 p-4 md:p-5 rounded-lg hover:shadow-lg shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-main dark:border-main"
            >
              <div className="text-base md:text-lg flex flex-col">
                <div className="flex flex-col mb-0">
                  <p className="inline-block bg-gradient-to-r from-green-100 to-slate-200 dark:from-teal-900 dark:to-main-dark dark:text-white w-fit pr-2 pl-1 rounded-md">
                    Cover Letter
                  </p>
                  <p className="mt-2 break-all dark:text-white text-sm md:text-base my-4 border-b pb-3">
                    {proposal.coverLetter}
                  </p>
                </div>
              </div>

              <div className="flex md:flex-row flex-col items-center md:justify-between w-full mt-2 lg:mt-3">
                <Button
                  text="Accept"
                  variant="fill"
                  size="sm"
                  onClick={() => handleAccept(index)}
                  className="md:w-1/5 w-full md:text-xl text-base order-2 md:order-1"
                />
                <div className="order-1 md:order-2 md:mb-0 mb-1.5">
                  <div className="text-nowrap flex justify-center items-center dark:text-accent text-base md:text-lg font-semibold text-teal-800">
                    <p className="w-fit pb-0 p-2 rounded-md">
                      <span className="inline-block">Cost:</span>{" "}
                      {proposal.totalCost} EGP
                    </p>
                  </div>
                </div>
                <Button
                  text="Reject"
                  variant="outline"
                  size="sm"
                  onClick={() => handleReject(index)}
                  className="md:w-1/5 w-full text-red-700 md:text-xl text-base bg-red-300 hover:bg-red-400 border-red-100 border dark:bg-red-500 dark:text-red-900 hover:border-red-200 order-3"
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
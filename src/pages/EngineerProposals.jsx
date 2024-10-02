import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Loading from "../components/uiComponents/Loading";
import Button from "../components/uiComponents/Button";
import NoPage from "../components/uiComponents/NoPage";
const EngineerProposals = ({ token }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [engineerProposals, setEngineerProposals] = useState({
    proposal: [],
    proposalsCount: 0,
    pagesCount: 0,
    currentPage: 1,
  });
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [noProposals, setNoProposals] = useState(false);

  const fetchEngineerProposals = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://field-talent.vercel.app/proposals",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      setNoProposals(typeof data !== "object" || data.proposal.length === 0);
      setEngineerProposals(data);
    } catch (error) {
      console.error("Error fetching engineer proposals:", error);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchEngineerProposals();
  }, [fetchEngineerProposals]);

  const openModal = (proposal) => {
    setSelectedProposal(proposal);
  };

  const closeModal = () => {
    setSelectedProposal(null);
  };

  return (
    <div className="min-h-screen">
      {isLoading ? (
        <Loading />
      ) : noProposals ? (
        <>
          <NoPage
            title={"There are no Proposals"}
            description={
              " Dear engineer, you have not submitted any proposals yet. "
            }
            buttonText={"Show Jobs to Apply"}
            buttonTo={"/showjobs"}
          />
         
        </>
      ) : (
        <div className="container mx-auto p-4 px-4 mt-16 dark:text-text-dark md:px-20 mb-12">
          <h1 className="text-4xl font-bold text-center text-main mb-12">
            My Proposals
          </h1>
          {engineerProposals.proposal.map((proposal) => (
            <div
              key={proposal._id}
              className=" dark:bg-gradient-to-r from-main to-accent dark:text-white shadow-lg rounded-xl mb-8 p-8 w-full transform hover:-translate-y-2 transition duration-300 ease-in-out"
            >
              <h2 className="text-2xl font-semibold mb-4 dark:text-white text-main">
                <span className="text-gray-600 dark:text-accent">
                  Job Title:
                </span>
                {proposal.jobId.title}
              </h2>
              <p className="text-gray-600 dark:text-white mb-6 line-clamp-3">
                {proposal.jobId.description}
              </p>
              <div className="flex flex-wrap dark:text-white justify-between items-center">
                <button
                  onClick={() => openModal(proposal)}
                  className="btn bg-main text-white hover:bg-main-dark mb-2 sm:mb-0"
                >
                  View Cover Letter & Budget
                </button>
                <p
                  className={`text-lg font-semibold px-4 py-1 rounded-lg ${
                    proposal.status === "accepted"
                      ? "bg-green-100 text-green-600"
                      : proposal.status === "rejected"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-600 dark:opacity-60"
                  }`}
                >
                  {proposal.status.charAt(0).toUpperCase() +
                    proposal.status.slice(1)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedProposal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-main-dark dark:text-text-dark rounded-lg p-8 max-w-md w-full">
            <h3 className="text-2xl dark:text-accent font-bold mb-4 break-words">
              Cover Letter
            </h3>
            <p className="mb-4 break-words">{selectedProposal.coverLetter}</p>
            <h4 className="text-xl font-semibold mb-2 dark:text-accent">
              Job Details
            </h4>
            <p className="mb-2">
              <span className="font-semibold break-words">Title:</span>{" "}
              {selectedProposal.jobId.title}
            </p>
            <p className="mb-4">
              <span className="font-semibold">Your Offer:</span> $
              {selectedProposal.totalCost}
            </p>
            <div className="w-full flex justify-end">
              <Button
                onClick={closeModal}
                variant="outline"
                text="Close"
                size="md"
                className="border-2"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EngineerProposals;

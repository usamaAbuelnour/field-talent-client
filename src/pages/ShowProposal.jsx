import { useState } from "react";
import { Maximize2 } from "lucide-react";

const ShowProposal = () => {
  const proposals = [
    {
      avatar:
        "https://askmescript.com/upload/photos/2020/04/pNFDnM5HcX9sozLiqIN4_24_62b73862def5530a11afeb3a88f402de_image.png",
      freelancerName: "John Doe",
      proposal: "I can complete this project in 5 days.",
      salaryOffer: 500,
    },
    {
      avatar:
        "https://askmescript.com/upload/photos/2020/04/pNFDnM5HcX9sozLiqIN4_24_62b73862def5530a11afeb3a88f402de_image.png",
      freelancerName: "Jane Smith",
      proposal:
        "I have experience with similar projects and can deliver within a week. I have experience with similar projects and can deliver within a week I have experience with similar projects and can deliver within a week. I have experience with similar projects and can deliver within a week I have experience with similar projects and can deliver within a week. I have experience with similar projects and can deliver within a week I have experience with similar projects and can deliver within a week. I have experience with similar projects and can deliver within a week.",
      salaryOffer: 600,
    },
    {
      avatar:
        "https://askmescript.com/upload/photos/2020/04/pNFDnM5HcX9sozLiqIN4_24_62b73862def5530a11afeb3a88f402de_image.png",
      freelancerName: "John Doe",
      proposal: "I can complete this project in 5 days.",
      salaryOffer: 500,
    },

    {
      avatar:
        "https://askmescript.com/upload/photos/2020/04/pNFDnM5HcX9sozLiqIN4_24_62b73862def5530a11afeb3a88f402de_image.png",
      freelancerName: "Jane Smith",
      proposal:
        "I have experience with similar projects and can deliver within a week. I have experience with similar projects and can deliver within a week I have experience with similar projects and can deliver within a week. I have experience with similar projects and can deliver within a week I have experience with similar projects and can deliver within a week. I have experience with similar projects and can deliver within a week I have experience with similar projects and can deliver within a week. I have experience with similar projects and can deliver within a week.",
      salaryOffer: 600,
    },
    {
      avatar:
        "https://askmescript.com/upload/photos/2020/04/pNFDnM5HcX9sozLiqIN4_24_62b73862def5530a11afeb3a88f402de_image.png",
      freelancerName: "John Doe",
      proposal: "I can complete this project in 5 days.",
      salaryOffer: 500,
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState(null);

  const openModal = (proposal) => {
    setSelectedProposal(proposal);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProposal(null);
  };

  return (
    <div className="mt-20">
      <div className="container mx-auto p-4 px-4 md:px-20 mb-12">
        <div>
          <h1 className="text-4xl font-bold text-center text-main mb-12">
            Job Title
          </h1>
        </div>
        {proposals.map((proposal, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl mb-10 p-6 md:p-8 cursor-pointer transform hover:-translate-y-2 transition duration-300 ease-in-out"
            onClick={() => openModal(proposal)}
          >
            <div className="flex items-start mb-4">
              <img
                src={proposal.avatar}
                alt="Freelancer Avatar"
                className="w-24 h-24 rounded-full object-cover mr-4 shadow-md"
              />
              <div className="flex-grow me-16">
                <h3 className="text-2xl font-semibold text-indigo-600">
                  {proposal.freelancerName}
                </h3>
                <p className="text-gray-600 mt-2 line-clamp-3">
                  {proposal.proposal}
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
                  ${proposal.salaryOffer}
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
                    {selectedProposal.freelancerName}&apos;s Proposal
                  </h3>
                  <img
                    src={selectedProposal.avatar}
                    alt="Freelancer Avatar"
                    className="w-28 h-28 rounded-full mb-6 mx-auto shadow-lg"
                  />
                  <p className="text-gray-700 mb-6">
                    {selectedProposal.proposal}
                  </p>

                  <div className="flex space-x-6 justify-between items-baseline">
                    <div className="flex mb-8">
                      <span className="text-gray-600">Budget:</span>
                      <span className="text-green-600 font-semibold ms-2">
                        ${selectedProposal.salaryOffer}
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

import { useState } from "react";

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
        "I have experience with similar projects and can deliver within a week. I have experience with similar projects and can deliver within a week. I have experience with similar projects and can deliver within a week.",
      salaryOffer: 600,
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
          <h1 className="text-3xl font-bold text-center text-slate-600 mb-10">
            Job Title
          </h1>
        </div>
        {proposals.map((proposal, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center md:items-start justify-between bg-white shadow-md rounded-lg mb-10 p-4 md:p-6"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start w-full md:w-auto">
              <img
                src={proposal.avatar}
                alt="Freelancer Avatar"
                className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover mb-4 md:mb-0 md:mr-4"
              />
              <div className="flex flex-col w-full md:w-auto">
                <div className="flex flex-col md:flex-row items-center  w-full">
                  <h3 className="text-xl font-semibold">
                    {proposal.freelancerName}
                  </h3>
                  <p className="text-lg font-semibold text-green-600 mt-2 md:mt-0 md:ml-6">
                    ${proposal.salaryOffer}
                  </p>
                </div>
                <p className="text-gray-600 line-clamp-3 mt-2">
                  {proposal.proposal}
                </p>
              </div>
            </div>
            <div className="mt-4 md:mt-0 md:ml-4 flex justify-center md:justify-end w-full md:w-auto">
              <button
                className="btn btn-info text-sm py-2 px-4"
                onClick={() => openModal(proposal)}
              >
                View Details
              </button>
              {/* Accept and Reject Buttons outside the modal */}
              <div className="flex space-x-2 ml-4">
                <button className="btn btn-success text-sm py-1 px-3 bg-transparent border-2 border-green-600 text-green-600 hover:bg-green-500 hover:text-white hover:border-green-700 transition duration-300 ease-in-out">
                  Accept
                </button>
                <button className="btn btn-error text-sm py-1 px-3">
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="modal modal-open">
              <div className="modal-box relative">
                <button
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                  onClick={closeModal}
                >
                  ✕
                </button>
                {selectedProposal && (
                  <div>
                    <h3 className="text-lg font-bold mb-2">
                      {selectedProposal.freelancerName}&apos;s Proposal
                    </h3>
                    <img
                      src={selectedProposal.avatar}
                      alt="Freelancer Avatar"
                      className="w-20 h-20 rounded-full mb-4"
                    />
                    <p className="text-gray-600 mb-4">
                      {selectedProposal.proposal}
                    </p>
                    <p className="text-green-600 font-semibold mb-4">
                      Salary Offer: ${selectedProposal.salaryOffer}
                    </p>
                    {/* Accept and Reject Buttons inside the modal */}
                    <div className="flex space-x-2">
                      <button className="btn btn-success text-sm py-1 px-3 bg-transparent border-2 border-green-600 text-green-600 hover:bg-green-500 hover:text-white hover:border-green-700 transition duration-300 ease-in-out">
                        Accept
                      </button>
                      <button className="btn btn-error text-sm py-1 px-3">
                        Reject
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div
              className="fixed inset-0 bg-black opacity-50"
              onClick={closeModal}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowProposal;

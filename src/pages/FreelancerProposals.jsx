// eslint-disable-next-line no-unused-vars
import React from 'react';

const FreelancerProposals = () => {
  const proposals = [
    {
      jobTitle: 'Apartment - Plumbing Works',
      proposal:
        'I can build a responsive and user-friendly website within 2 weeks. I have experience with React and Node.js and will ensure the website meets all your requirements.',
      costOffer: 500,
      status: 'Accepted',
    },
    {
      jobTitle: 'Ground Floor - Concrete Works',
      proposal:
        'I will design a modern and intuitive mobile app UI that enhances user experience. My design will be tailored to your brand and project requirements.',
      costOffer: 300,
      status: 'Pending',
    },
    {
      jobTitle: 'Villa - Plastering Works',
      proposal:
        'I will optimize your website for search engines, including keyword research, on-page SEO, and backlink building to improve your site\'s visibility.',
      costOffer: 200,
      status: 'Rejected',
    },
  ];

  return (
    <div className="mt-20">
      <div className="container mx-auto p-4 px-4 md:px-20 mb-12">
        <h1 className="text-4xl font-bold text-center text-main mb-12">
          My Proposals
        </h1>
        {proposals.map((proposal, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl mb-8 p-8 w-full transform hover:-translate-y-2 transition duration-300 ease-in-out"
          >
            <h2 className="text-2xl font-semibold mb-4 text-indigo-600">{proposal.jobTitle}</h2>
            <p className="text-gray-600 mb-6 line-clamp-2">{proposal.proposal}</p>
            <div className="flex justify-between items-center">
              <p className="text-lg font-bold text-teal-500">${proposal.costOffer}</p>
              <p
                className={`text-lg font-semibold px-4 py-1 rounded-lg ${
                  proposal.status === 'Accepted'
                    ? 'bg-green-100 text-green-600'
                    : proposal.status === 'Rejected'
                    ? 'bg-red-100 text-red-600'
                    : 'bg-yellow-100 text-yellow-600'
                }`}
              >
                {proposal.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FreelancerProposals;

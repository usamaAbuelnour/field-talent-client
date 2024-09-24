import React from 'react';
import { Pencil, Briefcase, Calendar, Clock, DollarSign, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const ClientProfile = () => {
  const client = {
    name: 'Fatma Mohamed Ali',
    email: 'fatma@gmail.com',
    jobCount: 12,
    joinedDate: '2022-01-10',
    lastJob: '2024-09-18',
    imageUrl: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
    totalSpent: '$5,000',
    avgPaymentPerJob: '$416.67'
  };

  return (
    <div className="flex items-center justify-center min-h-screen mt-11 md:px-6 sm:px-2">
      <div className="p-2 w-full mx-auto">
        <div className="text-center">
          <motion.div
            className="flex flex-col items-center" 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <div className="relative inline-block mb-2">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="absolute -top-2 -right-2 bg-main rounded-full p-1 cursor-pointer"
              >
                <Pencil className="text-white" size={16} />
              </motion.div>
              <img
                className="w-36 h-36 rounded-full border-4 border-main shadow-lg object-cover"
                src={client.imageUrl}
                alt="Client"
              />
            </div>
            <h2 className="md:text-4xl sm:text-xl font-bold text-main mb-2 flex items-center dark:text-slate-100">
              {client.name}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="ml-2 bg-main rounded-full p-1 cursor-pointer"
              >
                <Pencil className="text-white" size={16} />
              </motion.div>
            </h2>
            <p className="text-lg md:text-xl text-main dark:text-slate-100">{client.email}</p>
          </motion.div>
        </div>
        <motion.div
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <InfoItem label="Job Count" value={client.jobCount} icon={<Briefcase />} labelSize="text-sm sm:text-lg md:text-xl lg:text-2xl"/>
          <InfoItem label="Joined" value={client.joinedDate} icon={<Calendar />} labelSize="text-sm sm:text-lg md:text-xl lg:text-2xl" />
          <InfoItem label="Last Job" value={client.lastJob} icon={<Clock />} labelSize="text-sm sm:text-lg md:text-xl lg:text-2xl" />
          <InfoItem label="Total Spent" value={client.totalSpent} icon={<DollarSign />} labelSize="text-sm sm:text-lg md:text-xl lg:text-2xl"/>
          <InfoItem label="Avg Payment/Job" value={client.avgPaymentPerJob} icon={<TrendingUp />} className="col-span-1 md:col-span-2" labelSize="text-sm sm:text-lg md:text-xl lg:text-2xl"/>
        </motion.div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value, className = "", icon, labelSize }) => (
  <motion.div
    className={`px-4 py-1 rounded-lg shadow flex items-center ${className}`}
    whileHover={{ scale: 1.01 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="mr-4 text-main dark:text-accent-dark">
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <div>
      <p className={`font-semibold ${labelSize} text-main `}>{label}</p> 
      <p className="text-xl mt-1 dark:text-slate-100 text-gray-700 ">{value}</p> 
    </div>
  </motion.div>
);

export default ClientProfile;

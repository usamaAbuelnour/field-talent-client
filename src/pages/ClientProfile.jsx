/* eslint-disable no-constant-binary-expression */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback } from "react";
import {
  Pencil,
  Briefcase,
  Calendar,
  Clock,
  PhoneCall,
  MapPin,
  Check,
  AlertCircle,
} from "lucide-react";
import Button from "../components/uiComponents/Button";
import axios from "axios";
import Loading from '../components/uiComponents/Loading'
const API_URL = "https://field-talent.vercel.app";

const ClientProfile = ({ token }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading,setIsLoading]= useState()
  const [isUploading, setIsUploading] = useState(false);
  const [client, setClient] = useState({
    name: "loading.....",
    email: "loading.....",
    jobCount: 0,
    joinedDate: "loading.....",
    lastJob: "loading.....",
    personalIMAGE:
      "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=740&t=st=1727728576~exp=1727729176~hmac=dab7ffbb993a0c134e1704edf8d78553ed28f121ea6316e88d273ba620035a48",
    mobile: "loading.....",
    whatsAppPhoneNumbers: "loading.....",
    location: "loading.....",
  });

  const fetchClientData = useCallback(async () => {
    try {
      setIsLoading(true)

      const response = await axios.get(`${API_URL}/clients`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const myData = response.data;
      console.log(myData.verificationState)
      if (myData.clientId) {
        setClient({
          name: `${myData.firstName} ${myData.lastName}` || "your name",
          email: myData.email || "example@example.com",
          jobCount: myData.clientId.jobsCount || "no job yet",
          joinedDate: myData.createdAt || "not available",
          lastJob: myData.lastJob ? myData.lastJob : "not found",
          personalIMAGE:
            myData.clientId.personalImage ||
            "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=740&t=st=1727728576~exp=1727729176~hmac=dab7ffbb993a0c134e1704edf8d78553ed28f121ea6316e88d273ba620035a48",
          mobile: myData.clientId.phoneNumbers?.[0] || "not available",
          whatsAppPhoneNumbers:
            myData.clientId.whatsAppPhoneNumbers?.[0] || "not available",
          location: myData.clientId.governorate || "egypt",
          verificationState: myData.verificationState|| null,
        });
      } else {
        setClient({
          name: `${myData.firstName} ${myData.lastName}` || "your name",
          email: myData.email || "example@example.com",
          jobCount: "No Job ",
          joinedDate: myData.createdAt || "Not Available",
          lastJob: "Not Found Yet",
          personalIMAGE:
            "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=740&t=st=1727728576~exp=1727729176~hmac=dab7ffbb993a0c134e1704edf8d78553ed28f121ea6316e88d273ba620035a48",
          mobile: "Add Your Mobile",
          whatsAppPhoneNumbers: "Add Your WhatsApp Phone Number",
          location: "Egypt",
          verificationState: null,
        });
      }
      console.log(myData, client);
    } catch (error) {
      console.log(error);
    }
    finally{
      setIsLoading(false)
    }
  }, [token]);

  useEffect(() => {
    fetchClientData();
  }, [fetchClientData]);

  const handleUpload = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("personalImage", selectedImage);

    setIsUploading(true);
    try {
      const response = await axios.post(
        `${API_URL}/clients/personalImage`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setClient((prevClient) => ({
        ...prevClient,
        personalIMAGE: response.data,
      }));

      handleClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const renderverificationState = () => {
    if(client.verificationState){  switch (client.verificationState.status) {
      
      case "pending":
        return (
          <div className="text-yellow-500 mt-2 flex items-center justify-center">
            <AlertCircle size={20} className="mr-2" />
            Verification pending
          </div>
        );
      case "rejected":
        return (
          <div className="text-red-500 mt-2 flex items-center justify-center">
            <AlertCircle size={20} className="mr-2" />
            Verification rejected.{client.verificationState && client.verificationState.remarks}
          </div>
        );
      default:
        return null;
    }}
  
  };
  if (isLoading){
    return (<Loading/>)

  }
  return (
    <div className="flex items-center justify-center min-h-screen mt-20 md:mt-7 md:px-6 sm:px-2">
      <div className="p-2 w-full mx-auto">
        <div className="text-center">
          <div className="flex flex-col items-center">
            <div className="relative inline-block mb-2">
              <div className="relative">
                <img
                  className="w-36 h-36 rounded-full border-4 border-main shadow-lg object-cover"
                  src={client.personalIMAGE}
                  alt="client image"
                />
                <Pencil
                  className="text-white absolute -right-1 bottom-10 bg-main rounded-full p-1 cursor-pointer"
                  size={26}
                  onClick={() => setShowModal(true)}
                />
                {client.verificationState && client.verificationState.status === "accepted" && (
                  <div className="flex gap-1 absolute top-1 right-1">
                    <Check
                      className="bg-accent text-white rounded-full p-1"
                      size={24}
                    />
                  </div>
                )}
              </div>
            </div>

            {renderverificationState()}

            <h2 className="md:text-4xl sm:text-xl font-bold text-main mb-2 flex items-center dark:text-accent">
              {client.name}
            </h2>
            <p className="text-lg md:text-xl text-main dark:text-slate-100">
              {client.email}
            </p>
          </div>
          <div className="flex justify-center my-5 gap-4">
            {( client.verificationState && client.verificationState.status !== "pending" && client.verificationState.status !== "accepted" )&& (
              <Button
                to="/verification"
                text="Verify your account"
                variant="fill"
                size="sm"
              />
            )}
            {
              client.verificationState === null &&
              <Button
              to="/verification"
              text="Verify your account"
              variant="fill"
              size="sm"
            />
            }
            <Button
              to="/AddProfileData"
              text="update your profile"
              variant={
                client.verificationState && client.verificationState.status === "accepted" ? "fill" : "outline"
              }
              size="sm"
            />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoItem
            label="number of jobs"
            value={client.jobCount}
            icon={<Briefcase />}
            labelSize="text-sm sm:text-lg md:text-xl"
          />
          <InfoItem
            label="location"
            value={client.location}
            icon={<MapPin />}
            labelSize="text-sm sm:text-lg md:text-xl"
          />
          <InfoItem
            label="mobile"
            value={client.mobile}
            icon={<PhoneCall />}
            labelSize="text-sm sm:text-lg md:text-xl"
          />
          <InfoItem
            label="whatsAppPhoneNumbers"
            value={client.whatsAppPhoneNumbers}
            icon={<PhoneCall />}
            labelSize="text-sm sm:text-lg md:text-xl"
          />
          <InfoItem
            label="last job"
            value={client.lastJob}
            icon={<Clock />}
            labelSize="text-sm sm:text-lg md:text-xl"
          />
          <InfoItem
            label="joinedDate"
            value={client.joinedDate}
            icon={<Calendar />}
            labelSize="text-sm sm:text-lg md:text-xl"
          />
        </div>
      </div>

      {showModal && (
        <dialog className="modal" open>
          <div className="modal-box">
            <h2 className="font-bold text-lg"> upload your image </h2>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="my-4"
            />
            <div className="modal-action">
              <button
                className="btn"
                onClick={handleUpload}
                disabled={isUploading}
              >
                {isUploading ? "upload..." : "done"}
              </button>
              <button className="btn" onClick={handleClose}>
                close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

const InfoItem = ({ label, value, className = "", icon, labelSize }) => (
  <div className={`px-4 py-1 rounded-lg shadow flex items-center ${className}`}>
    <div className="mr-4 text-main dark:text-accent">
      {icon ? (
        React.cloneElement(icon, { size: 24 })
      ) : (
        <div className="text-gray-400">not fond </div>
      )}
    </div>
    <div>
      <p
        className={`font-semibold text-sm sm:text-lg md:text-xl 
    ${labelSize} text-main dark:text-accent`}
      >
        {label}
      </p>
      <p className="text-xl mt-1 dark:text-slate-100 text-gray-700">{value}</p>
    </div>
  </div>
);

export default ClientProfile;

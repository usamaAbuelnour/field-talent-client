// /* eslint-disable react/prop-types */

// export default AddProfileData;import { useState, useCallback, useEffect } from "react";
// import Button from "../components/uiComponents/Button";
// import axios from "axios";
// import { Stepper } from "react-form-stepper";
// import { useNavigate } from "react-router-dom"; 

// const STEPS = {
//   client: ["personal Data"],
//   engineer: ["personal Data", "Engineer Experience", "Engineer Education"],
// };

// const LOCATIONS = [
//   "Port Fouad",
//   "Port Said",
//   "Ismailia",
//   "Suez",
//   "10th of Ramadan",
//   "El Shorouk",
//   "El Obour",
//   "New Capital",
//   "Badr",
//   "5th Settlement",
//   "Nasr City",
// ];
// function AddProfileData({userType}) {


//   const navigate = useNavigate(); 
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const steps = STEPS[userType] || [];

//   const [formData, setFormData] = useState(() => ({
//     location: "",
//     phoneNumber: "",
//     whatsAppNumber: "",
//     frontID: null,
//     backID: null,
//     ...(userType === "engineer" && {
//       engineersUnionCard: null,
//       militaryServiceStatus: null,
//       graduationCertificate: null,
//     }),
//   }));

//   const [errors, setErrors] = useState({});
//   const [currentStep, setCurrentStep] = useState(1);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const validateForm = useCallback(() => {
//     const newErrors = {};
//     if (!formData.location) newErrors.location = "Location is required";
//     if (!formData.phoneNumber || !/^\d{11}$/.test(formData.phoneNumber))
//       newErrors.phoneNumber = "Phone number must be 11 digits";
//     if (!formData.whatsAppNumber || !/^\d{11}$/.test(formData.whatsAppNumber))
//       newErrors.whatsAppNumber = "WhatsApp number must be 11 digits";

//     if (currentStep === 2) {
//       if (!formData.frontID) newErrors.frontID = "Front ID image is required";
//       if (!formData.backID) newErrors.backID = "Back ID image is required";
//     }

//     if (currentStep === 3 && userType === "engineer") {
//       if (!formData.engineersUnionCard)
//         newErrors.engineersUnionCard = "Engineers Union Card image is required";
//       if (!formData.militaryServiceStatus)
//         newErrors.militaryServiceStatus = "Military Service Status image is required";
//       if (!formData.graduationCertificate)
//         newErrors.graduationCertificate = "Graduation Certificate image is required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   }, [formData, currentStep, userType]);



//   const handleSubmit = async () => {
//     if (!validateForm()) return;
//     setIsSubmitting(true);
//     try {
//       const response = await axios.post("https://your-backend-api.com/submit", {
//         ...formData,
//         userType,
//       });
//       console.log("Data sent successfully:", response.data);
//     } catch (error) {
//       console.error("Error sending data:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <>
//             <h2 className="text-lg font-semibold mb-4 text-center">Upload contact</h2>
//               <FormField
//               label="personal Image"
//               name="personalImage"
//               type="file"
//               error={errors.frontID}
//             />
//  <FormField
//               label="Enter your PROFILE"
//               name="PROFILE"
//               type="textarea"
//               error={errors.backID}
//             />
     
//             <FormField
//               label="Choose your location"
//               name="location"
//               type="select"
//               options={LOCATIONS}
//               value={formData.location}
//               error={errors.location}
//             />
//             <FormField
//               label="Enter phone number"
//               name="phoneNumber"
//               type="tel"
//               value={formData.phoneNumber}
//               error={errors.phoneNumber}
//             />
        
//           </>
//         );
//       case 2:
//         return (
//           <>
//             <h2 className="text-lg font-semibold mb-4">Upload your ID card images (front & back)</h2>
//             <FormField
//               label="Front ID card image"
//               name="frontID"
//               type="file"
//               error={errors.frontID}
//             />
//             <FormField
//               label="Back ID card image"
//               name="backID"
//               type="file"
//               error={errors.backID}
//             />
//           </>
//         );
//       case 3:
//         return userType === "engineer" ? (
//           <>
//             <h2 className="text-lg font-semibold mb-4">Upload engineer verification documents</h2>
//             <FormField
//               label="insert multiple image show your experience"
//               name="engineersUnionCard"
//               type="file"
//               multiple
//               error={errors.engineersUnionCard}
//             />
           
//           </>
//         ) : null;
//       default:
//         return null;
//     }
//   };

//   const handleNext = () => {
//     if (validateForm()) {
//       setCurrentStep((prev) => prev + 1);
//     }
//   };

//   const handlePrevious = () => {
//     setCurrentStep((prev) => prev - 1);
//   };

//   const handleSkip = () => {
//     navigate("/"); 
//   };

//   return (
//     <div className="max-w-2xl min-h-screen flex flex-col mx-auto py-10 px-10">
//       <div className="">
//         <Stepper
//           activeStep={currentStep - 1}
//           steps={steps.map((label) => ({ label }))}
//           styleConfig={{
//             activeBgColor: "#115e59",
//             completedBgColor: "#10b981",
//             inactiveBgColor: "#6b7280",
//             activeColor: "#115e59",
//           }}
//         />
//       </div>

//       <div className="bg-white shadow-main min-h-fit dark:bg-gray-800 py-1 rounded-lg shadow-sm px-6 flex-grow">
//         <form className="space-y-6">{renderStepContent()}</form>
//       </div>

//       <div className="flex justify-between mt-8 sticky  bg-white dark:bg-gray-800 ">
//       <Button
//           onClick={handleSkip} 
//           text="Skip"
//           variant="outline"
//         />
//         <div className="flex gap-3">

//      <Button
//           onClick={handlePrevious}
//           text="Previous"
//           disabled={currentStep === 1}
//           className="btn btn-secondary"
//         />
//         <Button
//           onClick={currentStep === steps.length ? handleSubmit : handleNext}
//           text={currentStep === steps.length ? "Finish" : "Next"}
//           className="btn btn-primary"
//           disabled={isSubmitting}
//         />
      

//         </div>
   
//       </div>
//     </div>
//   );
// }

// function FormField({ label, name, type, value, onChange, error, options ,multiple  }) {
//   return (
//     <div className="form-control">
//       <label className="label">
//         <span className="label-text">{label}</span>
//       </label>
//       {type === "select" ? (
//         <select
//           name={name}
//           className="select select-bordered w-full"
//           value={value}
//           onChange={onChange}

//         >
//           <option disabled value="">
//             Choose your location
//           </option>
//           {options.map((option, index) => (
//             <option key={index} value={option}>
//               {option}
//             </option>
//           ))}
//         </select>
//       ) : (
//         <input
//           type={type}
//           name={name}
//           className={`input input-bordered w-full ${
//             type === "file" ? "file-input" : ""
//           }`}
//           value={value}
//           onChange={onChange}
//           accept={type === "file" ? "image/*" : undefined}
//           multiple={multiple}
//         />
//       )}
//       {error && <span className="text-error">{error}</span>}
//     </div>
//   );
// }
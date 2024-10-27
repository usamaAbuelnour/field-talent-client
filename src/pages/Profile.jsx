/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState, useCallback } from "react";
import {
  User,
  Mail,
  MapPin,
  Pencil,
  MapPinCheck,
  Check,
  AlertCircle,
} from "lucide-react";
import axios from "axios";
import Button from "../components/uiComponents/Button";
import Timeline from "../components/profileComponents/Timeline ";
import Loading from "../components/uiComponents/Loading";

function Profile({ token }) {
  const [isLoading, setIsLoading] = useState();
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [personalIMAGE, setPersonalIMAGE] = useState(
    "personalEngineerImage.png"
  );
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState({
    personalInfo: {
      name: "loading.....",
      email: "loading.....",
      governorate: "loading.....",
      profileOverview: "loading.....",
    },
    skills: ["loading....."],
    jobExperience: [],
    education: {
      graduationFrom: "loading.....",
      graduationYear: "loading.....",
      specialization: "loading.....",
      grade: "loading.....",
      finalProject: "loading.....",
      projectGrade: "loading.....",
    },
    verificationState: null,
  });

  const fetchEngineerData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://field-talent.vercel.app/engineers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const myData = response.data;
      console.log(myData);

      if (myData.engineerId) {
        setUser({
          personalInfo: {
            name: `${myData.firstName} ${myData.lastName}`,
            email: myData.email,
            governorate: myData.engineerId.governorate || "Egypt",
            profileOverview:
              myData.engineerId.profileOverview || "YOUR profile Overview",
            personalImage: myData.engineerId.personalImage,
          },
          skills: myData.engineerId.skills || [
            "skill 1",
            "skill 2",
            "skill 3",
            "skill 4",
            "skill 5",
          ],
          jobExperience: myData.engineerId.workExperience || [],
          verificationState: myData.verificationState,

          education: {
            graduationFrom:
              myData.education?.graduationFrom || " cairo University (example)",
            graduationYear:
              myData.education?.graduationYear || "2020 (example)",
            specialization:
              myData.education?.specialization || "Computer Science (example)",
            grade: myData.education?.grade || "good (example)",
            finalProject:
              myData.education?.finalProject ||
              "Blockchain-Based Voting System (example)",
            projectGrade:
              myData.education?.projectGrade || "very good (example)",
          },
        });
        if (myData.engineerId.personalImage) {
          setPersonalIMAGE(myData.engineerId.personalImage);
        }
      } else {
        setUser({
          personalInfo: {
            name: `${myData.firstName} ${myData.lastName}`,
            email: myData.email,
            governorate: "example:cairo",
            profileOverview: "profile Overview show her after ",
          },
          skills: ["profile Overview show her after"],
          jobExperience: [],
          verificationState: myData.verificationState,
          education: {
            graduationFrom: " University",
            graduationYear: " like 2020",
            specialization: "example :civil",
            grade: "example: very good",
            finalProject: " example : structure design",
            projectGrade: "example : very good",
          },
        });
      }
      console.log(myData, user);
    } catch (error) {
      setErrorMessage("Error fetching user data. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    window.scrollTo(0, 0);
  
    fetchEngineerData();
  }, [fetchEngineerData]);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("personalImage", selectedImage);

    setIsUploading(true);
    try {
      const response = await axios.post(
        "https://field-talent.vercel.app/engineers/personalImage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPersonalIMAGE(response.data);

      handleClose();
    } catch (error) {
      setErrorMessage("Error uploading image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  const renderverificationState = () => {
    if(user.verificationState){
    switch (user.verificationState.status) {
      case "pending":
        return (
          <div className="text-yellow-500  flex items-center justify-center">
            <AlertCircle size={20} className="mr-2" />
            Verification pending
          </div>
        );
      case "rejected":
        return (
          <div className="text-red-500  flex items-center justify-center">
            <AlertCircle size={20} className="mr-2" />
            Verification rejected. { user.verificationState && user.verificationState.remarks}.
          </div>
        );
      default:
        return null;
    }}
  };
  if (isLoading) {
    return <Loading />;
  }
console.log(user)
  return (
    <>
      <div className="relative pt-20 mb-10 min-h-screen bg-base-200 dark:bg-dark text-text dark:text-light-dark">
        <header className="px-4 sm:px-6 lg:px-20">
          <div className="flex flex-col lg:flex-row justify-center lg:gap-4 ">
            <div className="relative  flex justify-center items-center ">
              <div className="relative   ">
                <img
                  className="w-36 h-36 rounded-full border-4 border-main shadow-lg object-cover "
                  src={personalIMAGE}
                  alt={`${user.personalInfo.name}'s Avatar`}
                />
                <Pencil
                  className="text-white absolute -right-1 bottom-10 bg-main rounded-full p-1 cursor-pointer"
                  size={26}
                  onClick={() => setShowModal(true)}
                />
                { user.verificationState && user.verificationState.status === "accepted"  && (
                  <div className="flex gap-1 absolute top-0 right-0">
                    <Check
                      className="bg-accent text-white rounded-full p-1"
                      size={24}
                    />
                  </div>
                )}
              </div>
            </div>
            <section
              className="flex 
               flex-col space-y-1 lg:space-y-3 justify-center items-center "
            >
              <h3 className="text-xl font-semibold text-main dark:text-accent flex items-center">
                <User className="inline mr-2 text-accent dark:text-s-light" />
                <span className="break-words">
                  {user.personalInfo.name || "engineer name"}
                </span>
              </h3>
              <div className="flex  gap-2">
                <div className="flex items-center text-text dark:text-s-light">
                  <Mail className="mr-2 text-accent dark:text-s-light" />
                  <span className="break-words">
                    {user.personalInfo.email || "N/A"}
                  </span>
                </div>
                <div className="flex items-center text-text dark:text-s-light">
                  <MapPin className="mr-2 text-accent dark:text-s-light" />
                  <span className="break-words">
                    {user.personalInfo.governorate || "N/A"}
                  </span>
                </div>
              </div>
              {renderverificationState()}
            </section>
          </div>
          <div className="flex justify-center my-5 gap-4">
            {user.verificationState && user.verificationState.status !== "accepted" && user.verificationState.status !== "pending" && (
              <Button
                to="/verification"
                text="Verify your account"
                variant="fill"
                size="sm"
              />
            )}
                        {
              user.verificationState === null &&
              <Button
              to="/verification"
              text="Verify your account"
              variant="fill"
              size="sm"
            />
            }
            <Button
              to="/AddProfileData"
              text="Update your profile"
              variant={
                user.verificationState && user.verificationState.status === "accepted" ? "fill" : "outline"
              }
              size="sm"
            />
          </div>
        </header>
        <hr className="w-11/12 mx-auto border-s-light dark:border-main" />
        <div className="flex flex-col lg:flex-row mt-8 px-4 sm:px-6 lg:px-20">
          <aside className="lg:min-w-64 lg:sticky top-10 right-10 mb-8 lg:mb-0 p-6 bg-base-100 dark:bg-dark shadow-lg rounded-lg lg:max-h-[calc(100vh-40px)] overflow-y-auto">
            <div>
              <section className="mb-10">
                <h4 className="text-lg font-bold text-main dark:text-accent mb-4">
                  Profile Overview
                </h4>
                <p className="text-sm text-text dark:text-light-dark break-words">
                  {user.personalInfo.profileOverview}
                </p>
              </section>

              <section className="mb-10">
                <h4 className="text-lg font-bold text-main dark:text-accent mb-4">
                  Location
                </h4>
                <div className="flex items-center">
                  <MapPinCheck
                    size={18}
                    className="mr-2 text-main dark:text-accent"
                  />
                  <p className="text-lg break-words">
                    {user.personalInfo.governorate}
                  </p>
                </div>
              </section>

              <section>
                <h4 className="text-lg font-bold text-main dark:text-accent mb-4">
                  Skills
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-text dark:text-light-dark">
                  {user.skills.map((skill) => (
                    <li key={skill} className="break-words">
                      {skill}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </aside>

          <main className="grow lg:ml-8">
            <div className="experience dark:bg-main-dark mt-10">
              <h1 className="text-main dark:text-accent text-center text-3xl sm:text-4xl mb-6">
                Experience
              </h1>
              {user.jobExperience.length > 0 ? (
                <Timeline
                  items={user.jobExperience.map((job) => ({
                    date:
                      job.startDate && job.finishDate
                        ? `${job.startDate} - ${job.finishDate}`
                        : job.date || "Date not specified",
                    title: job.name || "Job Title Not Specified",
                    description: job.description || "No description available",
                  }))}
                />
              ) : (
                <p className="text-center text-gray-500">
                  No job experience added yet.
                </p>
              )}
            </div>

            <section className="education mt-10 bg-white dark:bg-main-dark p-6 rounded-lg shadow-lg">
              <h1 className="text-center text-3xl font-bold text-main dark:text-accent mb-6">
                Education
              </h1>
              <div className="flex flex-col lg:flex-row items-center lg:items-start">
                <div className="w-full lg:w-2/3 space-y-4 text-sm sm:text-base text-text dark:text-light-dark">
                  <p className="font-medium break-words">
                    <span className="font-semibold text-lg">
                      {" "}
                      Graduation from:
                    </span>
                    <span className="text-main font-medium">
                      {user.education.graduationFrom}
                    </span>
                  </p>
                  <p className="font-medium break-words">
                    <span className="font-semibold text-lg">
                      {" "}
                      Graduation Year:
                    </span>
                    <span className="text-main font-medium">
                      {user.education.graduationYear}
                    </span>
                  </p>
                  <p className="font-medium break-words">
                    <span className="font-semibold text-lg">
                      {" "}
                      Specialization:
                    </span>
                    <span className="text-main font-medium">
                      {user.education.specialization}
                    </span>
                  </p>
                  <p className="font-medium break-words">
                    <span className="font-semibold text-lg">Grade:</span>
                    <span className="text-main font-medium">
                      {user.education.grade}
                    </span>
                  </p>
                  <p className="font-medium break-words">
                    <span className="font-semibold text-lg">
                      {" "}
                      Final Project:
                    </span>
                    <span className="text-main font-medium">
                      {user.education.finalProject}
                    </span>
                  </p>
                  <p className="font-medium break-words">
                    <span className="font-semibold text-lg">
                      {" "}
                      Project Grade:{" "}
                    </span>
                    <span className="text-main font-medium">
                      {user.education.projectGrade}
                    </span>
                  </p>
                </div>
                <img
                  src="Learning-cuate.svg"
                  className="hidden lg:block lg:w-1/3 mt-6 lg:mt-0"
                  alt="Learning illustration"
                />
              </div>
            </section>
          </main>
        </div>
      </div>

      {showModal && (
        <dialog className="modal" open>
          <div className="modal-box">
            <h2 className="font-bold text-lg mb-4">Upload Personal Image</h2>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full mb-4"
            />
            <div className="modal-action">
              <button
                className="btn btn-primary"
                onClick={handleUpload}
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Upload"}
              </button>
              <button className="btn" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}

export default Profile;

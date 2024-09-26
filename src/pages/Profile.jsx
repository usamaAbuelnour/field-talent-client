import { useState } from 'react';
import { User, Mail, MapPin, Pencil, MapPinCheck } from "lucide-react";
import axios from 'axios';

function Profile() {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const user = {
    personalInfo: {
      imageUrl: "personPhoto.jpg",
      name: "Mostapha Yasser",
      email: "mostaphyasser18@gmail.com",
      location: "Cairo, Egypt",
      profileOverview: "Civil Engineer with 5+ years of experience in structural design project management and site supervision",
    },
    skills: [
      "cad", "revet", "sap", "fishing work", "Structural Design",
      "AutoCAD", "Project Management", "Site Supervision", "Construction Safety",
    ],
    jobExperience: [
      {
        date: "Jan 2021 - Dec 2021",
        title: "Frontend Developer",
        description: "Worked with React and Angular to create responsive and dynamic user interfaces for web applications.",
      },
      {
        date: "Jan 2022 - Present",
        title: "Full Stack MERN Developer",
        description: "Developed scalable web applications using MongoDB, Express.js, React, and Node.js. Integrated smart contracts and worked on blockchain projects.",
      },
    ],
    education: {
      graduationFrom: "Cairo University",
      graduationYear: "2020",
      specialization: "Computer Science",
      grade: "good",
      finalProject: "Blockchain-Based Voting System",
      projectGrade: "very good",
    },
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('personalImage', selectedImage);

    setIsUploading(true);
    try {
      await axios.post('https://field-talent.vercel.app/engineers/personalImage', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Image uploaded successfully');
      handleClose(); 
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  return (
    <>
      <div className="relative pt-20 mb-10 min-h-screen bg-base-200 dark:bg-dark text-text dark:text-light-dark">
        <header className="px-6 lg:px-20 mb-10">
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="relative avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user.personalInfo.imageUrl} alt="User Avatar" />
              </div>
              <a onClick={() => setShowModal(true)}>
                <Pencil className="absolute top-0 -right-5 cursor-pointer mr-1 text-main dark:text-accent" size={16} />
              </a>
            </div>
            <div>
              <h3 className="m-2 lg:m-5 text-2xl font-semibold text-main dark:text-accent">
                <User className="inline mr-2 text-accent dark:text-s-light" />
                <span>{user.personalInfo.name}</span>
              </h3>
              <div className="m-2 lg:m-5 flex items-center text-text dark:text-s-light">
                <Mail className="mr-2 text-accent dark:text-s-light" />
                <span>Email: {user.personalInfo.email}</span>
              </div>
              <div className="m-2 lg:m-5 flex items-center text-text dark:text-s-light">
                <MapPin className="mr-2 text-accent dark:text-s-light" />
                <span>Location: {user.personalInfo.location}</span>
              </div>
            </div>
          </div>
        </header>
        <hr className="w-3/4 mx-auto border-s-light" />
        <div className="flex flex-col lg:flex-row mt-8 px-5">
          <aside className="w-full lg:sticky top-10 right-10 lg:min-w-32 mb-8 lg:mb-0 p-6 bg-base-100 dark:bg-dark shadow-lg rounded-lg">
            <section className="mb-10">
              <h4 className="text-lg font-bold text-main dark:text-accent">Profile Overview</h4>
              <p className="text-sm w-32 text-text dark:text-light-dark">{user.personalInfo.profileOverview}</p>
            </section>
            <section className="mb-10">
              <h4 className="mb-2 text-lg font-bold text-main dark:text-accent">Location</h4>
              <div className="flex items-center">
                <MapPinCheck size={18} className="mr-2 text-main dark:text-accent" />
                <p className="text-lg">{user.personalInfo.location}</p>
              </div>
            </section>
            <section>
              <h4 className="text-lg mb-5 font-bold flex gap-2 text-main dark:text-accent">Skills</h4>
              <ul className="list-disc list-inside flex flex-col gap-3 text-sm text-text dark:text-light-dark">
                {user.skills.map((skill) => <li key={skill}>{skill}</li>)}
              </ul>
            </section>
          </aside>

          <main className="grow ml-0 lg:pb-10 lg:ml-8">
            <div className="experience dark:bg-main-dark mt-10">
              <h1 className="text-main dark:text-accent text-center text-4xl m-3">Experience</h1>
              <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
                {user.jobExperience.map((job, index) => (
                  <li key={job.title}>
                    <div className="timeline-middle">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className={`${index % 2 !== 0 ? "timeline-end" : "timeline-start"} mb-10 md:text-end`}>
                      <time className="font-mono italic">{job.date}</time>
                      <div className="text-lg font-black">{job.title}</div>
                      {job.description}
                    </div>
                    <hr />
                  </li>
                ))}
              </ul>
            </div>

            <section className="education text-center flex mt-10 bg-white dark:bg-main-dark p-6 rounded-lg shadow-md">
              <div className="w-full lg:w-4/6">
                <h1 className="text-center text-3xl font-bold text-main dark:text-accent">Education</h1>
                <div className="mt-5 space-y-4 text-lg text-text dark:text-light-dark leading-relaxed">
                  <p className="font-medium">Graduation from {user.education.graduationFrom}</p>
                  <p>{user.education.specialization}</p>
                  <p className="italic">Graduation Date: {user.education.graduationYear}</p>
                  <p>Grade: {user.education.grade}</p>
                  <p>
                    Final Project:
                    <span className="font-semibold">{user.education.finalProject}</span>
                  </p>
                  <p>
                    Project Grade:
                    <span className="text-main dark:text-accent font-bold">{user.education.projectGrade}</span>
                  </p>
                </div>
              </div>
              <img src="Learning-cuate.svg" className="hidden lg:block lg:w-2/6" alt="Learning illustration" />
            </section>
          </main>
        </div>
      </div>

      {/* Image Upload Modal */}
      {showModal && (
        <dialog className="modal" open>
          <div className="modal-box">
            <h2 className="font-bold text-lg">Upload Personal Image</h2>
            <input type="file" accept="image/*" onChange={handleImageChange} className="my-4" />
            <div className="modal-action">
              <button className="btn" onClick={handleUpload} disabled={isUploading}>
                {isUploading ? 'Uploading...' : 'Upload'}
              </button>
              <button className="btn" onClick={handleClose}>Close</button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}

export default Profile;
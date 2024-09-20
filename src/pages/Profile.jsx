/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { User, Mail, MapPin, Pencil, MapPinCheck, Plus } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Select from "react-select";

import { useState } from "react";

function Profile() {
  const mainColor = "#3490dc";
  const whiteColor = "#ffffff";
  const user = {
    personalInfo: {
      imageUrl: "personPhoto.jpg",
      name: "Mostapha Yasser",
      email: "mostaphyasser18@gmail.com",
      location: "Cairo, Egypt",
      profileOverview:
        "Civil Engineer with 5+ years of experience in structural design project management and site supervision ",
    },
    skills: [
      "cad",
      "revet",
      "sap",
      "fishing work",
      "Structural Design",
      "AutoCAD",
      "Project Management",
      "Site Supervision",
      "Construction Safety",
    ],
    portfolioImages: {
      before: [
        "https://example.com/before-image1.jpg",
        "https://example.com/before-image2.jpg",
      ],
      after: [
        "https://example.com/after-image1.jpg",
        "https://example.com/after-image2.jpg",
      ],
    },
    jobExperience: [
     
      {
        date: "Jan 2021 - Dec 2021",
        title: "Frontend Developer",
        description:
          "Worked with React and Angular to create responsive and dynamic user interfaces for web applications.",
      },
      {
        date: "Jan 2022 - Present",
        title: "Full Stack MERN Developer",
        description:
          "Developed scalable web applications using MongoDB, Express.js, React, and Node.js. Integrated smart contracts and worked on blockchain projects.",
      },
      {
        date: "Jan 2021 - Dec 2021",
        title: "Frontend Developer",
        description:
          "Worked with React and Angular to create responsive and dynamic user interfaces for web applications.",
      },
    ],
    slides: [
      {
        url: "https://scontent.fcai22-1.fna.fbcdn.net/v/t1.6435-9/136825801_3749030028537769_6572915212363177294_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=13d280&_nc_ohc=7G-m0I6P6_MQ7kNvgFRq_ZI&_nc_ht=scontent.fcai22-1.fna&_nc_gid=AsxMnhnpIM1rWG8MKN1Y09G&oh=00_AYAI4JlDMo8ZDKcX7S3wv-d1fX3PbE4WSqT4kVxyXkUZcw&oe=6712C0BF",
      },
      {
        url: "https://scontent.fcai22-4.fna.fbcdn.net/v/t1.6435-9/136972279_3749031121870993_2578192872088088597_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=13d280&_nc_ohc=ypvN9N5H_OIQ7kNvgFICOa9&_nc_ht=scontent.fcai22-4.fna&_nc_gid=AXiffzd3PPS4xvIBGIEeHQ9&oh=00_AYA-zXcKyyEHfwxEqjLtEWLNDPYE_kmJS7lUnyuOa3AUYQ&oe=6712C77F",
      },
      {
        url: "https://scontent.fcai22-4.fna.fbcdn.net/v/t1.6435-9/136965044_3749031038537668_5911035214270310776_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=13d280&_nc_ohc=Ys7FcbsYuKkQ7kNvgFWh4Eo&_nc_ht=scontent.fcai22-4.fna&oh=00_AYCMWIWf2pRhf0vvdWfGNCCs9qs6ppliBVX6DS8RUt731w&oe=6712DFB2",
      },

      {
        url: "https://www.facebook.com/photo?fbid=3749030865204352&set=pcb.3749035115203927",
      },
      {
        url: "https://www.facebook.com/photo?fbid=3749030651871040&set=pcb.3749035115203927",
      },
    ],
    education:
      {graduationFrom:"cairo university",
        graduationYear: "2020",
        specialization: "Computer Science",
        grade: "A",
        finalProject: "Blockchain-Based Voting System",
        projectGrade: "A+",
      },
    
  };

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? user.slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === user.slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
  return (
    <>
      <div className="relative pt-20 mb-10 min-h-screen bg-base-200 dark:bg-dark text-text dark:text-light-dark">
        <header className="px-6 lg:px-20 mb-10">
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="relative avatar">
              <div className=" w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user.personalInfo.imageUrl} alt="User Avatar" />
              </div>
              <a href="#updatePersonalImage">
                <Pencil
                  className=" absolute top-0 -right-5 cursor-pointer  mr-1  text-main dark:text-accent "
                  size={16}
                />
              </a>
            </div>

            <div>
              <h3 className="m-2 lg:m-5 text-2xl font-semibold text-main dark:text-accent">
                <User className="inline mr-2 text-accent dark:text-s-light" />
                <span>{user.personalInfo.name} </span>
              </h3>

              <div className="m-2 lg:m-5 flex items-center text-text dark:text-s-light">
                <Mail className="mr-2 text-accent dark:text-s-light" />
                <span>Email:{user.personalInfo.email} </span>
              </div>
              <div className="m-2 lg:m-5 flex items-center text-text dark:text-s-light">
                <MapPin className="mr-2 text-accent dark:text-s-light" />
                <span>location:{user.personalInfo.location}</span>
              </div>
            </div>
          </div>
        </header>

        <hr className="w-3/4 mx-auto border-s-light" />

        <div className="flex flex-col lg:flex-row mt-8 px-5">
          <aside className="w-full lg:sticky top-10 right-10 lg:min-w-32 mb-8 lg:mb-0 p-6 bg-base-100 dark:bg-dark shadow-lg rounded-lg">
            <section className="mb-10">
              <h4 className="text-lg font-bold text-main dark:text-accent">
                Profile Overview
              </h4>
              <p className="text-sm w-32 text-text dark:text-light-dark ">
                {user.personalInfo.profileOverview}
              </p>

              <a href="#ProfileOverview">
                <Pencil
                  className="mr-1  text-main dark:text-accent "
                  size={16}
                />
              </a>
            </section>

            <section className="mb-10 ">
              <h4 className="mb-2 text-lg font-bold text-main dark:text-accent">
                Location
              </h4>
              <div className="flex items-center">
                <MapPinCheck
                  size={18}
                  className="mr-2 text-main dark:text-accent"
                />
                <p className="text-lg">{user.personalInfo.location}</p>
                <a href="#locationUpdate">
                  <Pencil
                    className="mr-1  text-main dark:text-accent "
                    size={16}
                  />
                </a>
              </div>
            </section>

            <section>
              <h4 className="text-lg mb-5 font-bold flex gap-2 text-main dark:text-accent">
                <a href="#skillsUpdate">
                  <Pencil className="mr-1 dark:text-accent" size={16} />
                </a>
                skills
              </h4>
              <ul className="list-disc list-inside flex  flex-col gap-3 text-sm  text-text dark:text-light-dark">
                {user.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </section>
          </aside>

          <main className="grow ml-0 lg:pb-10 lg:ml-8">
            <div className="max-w-[1400px] h-[780px] dark:bg-main-dark w-full m-auto py-16 px-4 relative group">
              <a href="#updateProjectPhoto" className="flex gap-2">
                <Plus
                  className="
                   text-xl cursor-pointer  mr-1  text-main dark:text-accent "
                  size={20}
                />
                <span>Add Before And after</span>
              </a>
              <div
                style={{
                  backgroundImage: `url(${user.slides[currentIndex].url})`,
                }}
                className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
              ></div>
              <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                <ChevronLeft onClick={prevSlide} size={30} />
              </div>
              <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                <ChevronRight onClick={nextSlide} size={30} />
              </div>
              <div className="flex top-4 justify-center py-2">
                {user.slides.map((slide, slideIndex) => (
                  <div
                    key={slideIndex}
                    onClick={() => goToSlide(slideIndex)}
                    className="text-2xl cursor-pointer"
                  ></div>
                ))}
              </div>
            </div>

            <div className="experience dark:bg-main-dark mt-10">
              <h1 className="text-main dark:text-accent text-center text-4xl m-3">
                experience
              </h1>
              <a href="#project" className="flex">
                <Plus
                  className="
                   text-xl cursor-pointer  mr-1  text-main dark:text-accent "
                  size={20}
                />
                <span> Add job</span>
              </a>
              <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
                {user.jobExperience.map((job,index) => (
                  <li key={job}>
                    <div className="timeline-middle">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className={`${index%2 !== 0?"timeline-end":"timeline-start"} mb-10 md:text-end`}>
                      <time className="font-mono italic">{job.date}</time>
                      <div className="text-lg font-black">{job.title}</div>
                      {job.description}
                    </div>
                    <hr />
                  </li>
                ))}
              

            </ul>
            </div>

            <section className="education text-center flex  mt-10 bg-white  dark:bg-main-dark p-6 rounded-lg shadow-md ">
              <div className=" w-full  lg:w-4/6">
                <h1 className="text-center text-3xl font-bold text-main dark:text-accent">
                  Education
                </h1>
                <a href="#education" className="flex gap-2">
                  <Pencil
                    className="
                   text-xl cursor-pointer  mr-1  text-main dark:text-accent "
                    size={20}
                  />
                  <span>update eduction </span>
                </a>
                <div className="mt-5 space-y-4 text-lg text-text dark:text-light-dark leading-relaxed">
                  <p className="font-medium">
                    Graduation from {user.education.graduationFrom}
                  </p>
                  <p>Civil Engineering</p>
                  <p className="italic">Graduation Date: {user.education.graduationYear}</p>
                  <p>Grade: {user.education.grade}</p>
                  <p>
                    Final Project:
                    <span className="font-semibold">{user.education.finalProject}</span>
                  </p>
                  <p>
                    Project Grade:
                    <span className="text-main dark:text-accent font-bold">
                      {user.education.projectGrade}
                    </span>
                  </p>
                </div>
                <img src="" alt="" />
              </div>
              <img
                src="Learning-cuate.svg"
                className="hidden     lg:block  lg:w-2/6"
                alt="Learning-cuate.svg"
              />
            </section>
          </main>
        </div>
      </div>

      <div className="modal" role="dialog" id="updatePersonalImage">
        <div className="modal-box text-center  dark:bg-main-dark">
          <h3 className="text-lg font-bold mb-10 dark:text-text-dark ">
            update personal picture{" "}
          </h3>
          <input
            type="file"
            className="file-input file-input-bordered
          file-input-success w-full max-w-xs dark:bg-opacity-20 dark:text-text-dark"
          />
          <input type="image" src="" alt="" />
          <div className="modal-action">
            <a href="#" className="dark:text-accent">
              close
            </a>
          </div>
        </div>
      </div>
      <div className="modal" role="dialog" id="ProfileOverview">
        <div className="modal-box text-center  dark:bg-main-dark">
          <h3 className="text-lg font-bold mb-10 dark:text-text-dark ">
            update Profile Overview
          </h3>
          <textarea
            className="textarea textarea-accent"
            placeholder="update Profile Overview"
          ></textarea>

          <div className="modal-action">
            <a href="#" className="dark:text-accent">
              close
            </a>
          </div>
        </div>
      </div>
      <div className="modal" role="dialog" id="locationUpdate">
        <div className="modal-box text-center  dark:bg-main-dark">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">update location</span>
            </div>
            <select className="select select-bordered">
              <option disabled selected>
                Pick one
              </option>
              <option>cairo </option>
              <option>eloubor</option>
              <option>egypt</option>
              <option> egy</option>
              <option>eloubor </option>
            </select>
          </label>

          <div className="modal-action">
            <a href="#" className="dark:text-accent">
              close
            </a>
          </div>
        </div>
      </div>
      <div className="modal" role="dialog" id="skillsUpdate">
        <div className="modal-box text-center dark:bg-main-dark">
          <h3 className="text-lg font-bold mb-10 dark:text-text-dark">
            Update Skills
          </h3>
          <Select
            className="w-full sm:w-60"
            options={options}
            placeholder="All skills"
            isMulti
            styles={{
              control: (provided) => ({
                ...provided,
                borderColor: mainColor,
                boxShadow: "none",
                "&:hover": {
                  borderColor: mainColor,
                },
              }),
              menu: (provided) => ({
                ...provided,
                borderRadius: "0.375rem",
                borderColor: mainColor,
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor:
                  state.isSelected || state.isFocused ? mainColor : "white",
                color:
                  state.isSelected || state.isFocused ? whiteColor : mainColor,
                "&:hover": {
                  backgroundColor: mainColor,
                  color: whiteColor,
                },
              }),
              multiValue: (provided) => ({
                ...provided,
                backgroundColor: mainColor,
                color: whiteColor,
              }),
              multiValueLabel: (provided) => ({
                ...provided,
                color: whiteColor,
              }),
              multiValueRemove: (provided) => ({
                ...provided,
                color: whiteColor,
                ":hover": {
                  backgroundColor: "red",
                  color: whiteColor,
                },
              }),
            }}
          />
          <div className="modal-action">
            <button
              className="dark:text-accent"
              onClick={() => {
                // Logic to close the modal
              }}
            ></button>
            <a href="#"> Close</a>
          </div>
        </div>
      </div>
      <div className="modal" role="dialog" id="updateProjectPhoto">
        <div className="modal-box text-center  dark:bg-main-dark">
          <h3 className="text-lg font-bold mb-10 dark:text-text-dark ">
            update personal picture
          </h3>
          <input
            type="file"
            className="file-input file-input-bordered
          file-input-success w-full max-w-xs dark:bg-opacity-20 dark:text-text-dark"
          />
          <input type="image" src="" alt="" />
          <div className="modal-action">
            <a href="#" className="dark:text-accent">
              close
            </a>
          </div>
        </div>
      </div>
      <div className="modal" role="dialog" id="project">
        <div className="modal-box text-center  dark:bg-main-dark">
          <h3 className="text-lg font-bold mb-10 dark:text-text-dark ">
            add project details
          </h3>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">What is job tittle?</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <textarea
            className="textarea textarea-accent"
            placeholder="add job detail"
          ></textarea>

          <div className="modal-action">
            <a href="#" className="dark:text-accent">
              close
            </a>
          </div>
        </div>
      </div>
      <div className="modal" role="dialog" id="education">
        <div className="modal-box text-center  dark:bg-main-dark">
          <h3 className="text-lg font-bold mb-10 dark:text-text-dark ">
            Add education details
          </h3>

          <label className="form-control w-full max-w-xs mb-2">
            <div className="label">
              <span className="label-text">
                What university did you graduate from?
              </span>
            </div>
            <select className="select select-error w-full max-w-xs">
              <option>El shrouk</option>
              <option>cairo</option>
              <option> ALEXANDRIA</option>
              <option>Port Said</option>
            </select>
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">
                What Is your Engineering specialization ?
              </span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">
                What is your Cumulative grade ?
              </span>
            </div>
            <select className="select select-error w-full max-w-xs">
              <option>Acceptable </option>
              <option>Good </option>
              <option>Very Good</option>
              <option>Excellent</option>
            </select>
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">What is your PROJECT NAME?</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">What is your PROJECT GRADE?</span>
            </div>
            <select className="select select-error w-full max-w-xs">
              <option>Acceptable </option>
              <option>Good </option>
              <option>Very Good</option>
              <option>Excellent</option>
            </select>
          </label>

          <div className="modal-action">
            <a href="" className="dark:text-accent">
              close
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;

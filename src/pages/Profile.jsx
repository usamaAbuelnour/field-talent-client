/* eslint-disable react/prop-types */
import { User, Mail, MapPin, Pencil, MapPinCheck } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useState } from "react";
function Profile({ user }) {
  const slides = [
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
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
  return (
    <div className="pt-20 mb-10 min-h-screen bg-base-200 dark:bg-dark text-text dark:text-light-dark">
      <header className="px-6 lg:px-20 mb-10">
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="personphotp.jpg" alt="User Avatar" />
            </div>
          </div>
          <div>
            <h3 className="m-2 lg:m-5 text-2xl font-semibold text-main dark:text-accent">
              <User className="inline mr-2 text-accent dark:text-s-light" />
              {user.name}
            </h3>
            <div className="m-2 lg:m-5 flex items-center text-text dark:text-s-light">
              <Mail className="mr-2 text-accent dark:text-s-light" />
              {user.email}
            </div>
            <div className="m-2 lg:m-5 flex items-center text-text dark:text-s-light">
              <MapPin className="mr-2 text-accent dark:text-s-light" /> Egypt
            </div>
          </div>
        </div>
      </header>

      <hr className="w-3/4 mx-auto border-s-light" />

      <div className="flex flex-col lg:flex-row mt-8 px-5">
        <aside className="w-full lg:min-w-32 mb-8 lg:mb-0 p-6 bg-base-100 dark:bg-dark shadow-lg rounded-lg">
          <section className="mb-10">
            <h4 className="text-lg font-bold text-main dark:text-accent">
              Profile Overview
            </h4>
            <p className="text-sm text-text dark:text-light-dark w-auto">
              Civil Engineer with 5+ years of experience in structural design,
              project management, and site supervision.
            </p>
            <button className="mt-2 btn btn-outline btn-accent btn-sm">
              <Pencil className="mr-1  text-main dark:text-accent " size={16} />{" "}
              Edit
            </button>
          </section>

          <section className="mb-10">
            <h4 className="mb-2 text-lg font-bold text-main dark:text-accent">
              Location
            </h4>
            <div className="flex items-center">
              <MapPinCheck
                size={18}
                className="mr-2 text-main dark:text-accent"
              />
              <p className="text-lg">Egypt, Elbour</p>
              <Pencil
                size={15}
                className="ml-2 text-main dark:text-accent cursor-pointer"
              />
            </div>
          </section>

          <section>
            <h4 className="text-lg mb-5 font-bold text-main dark:text-accent">
              Skills
            </h4>
            <ul className="list-disc list-inside flex  flex-col gap-3 text-sm  text-text dark:text-light-dark">
              <li>Structural Design</li>
              <li>AutoCAD</li>
              <li>Project Management</li>
              <li>Site Supervision</li>
              <li>Construction Safety</li>
            </ul>
            <button className="mt-2 btn btn-outline btn-accent btn-sm">
              <Pencil className="mr-1 dark:text-accent" size={16} /> Edit
            </button>
          </section>
        </aside>

        <main className="grow ml-0 lg:pb-10 lg:ml-8">
          <div className="max-w-[1400px] h-[780px] dark:bg-main-dark w-full m-auto py-16 px-4 relative group">
            <div
              style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
              className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
            ></div>
            <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
              <ChevronLeft onClick={prevSlide} size={30} />
            </div>
            <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
              <ChevronRight onClick={nextSlide} size={30} />
            </div>
            <div className="flex top-4 justify-center py-2">
              {slides.map((slide, slideIndex) => (
                <div
                  key={slideIndex}
                  onClick={() => goToSlide(slideIndex)}
                  className="text-2xl cursor-pointer"
                >
                  {/* <RxDotFilled /> */}
                </div>
              ))}
            </div>
          </div>
          <div className="experience dark:bg-main-dark mt-10">
            <h1 className="text-main dark:text-accent text-center text-4xl m-3">experience</h1>
            <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
              <li>
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
                <div className="timeline-start mb-10 md:text-end">
                  <time className="font-mono italic">1984</time>
                  <div className="text-lg font-black">
                    First Macintosh computer
                  </div>
                  The Apple Macintosh—later rebranded as the Macintosh 128K—is
                  the original Apple Macintosh personal computer. It played a
                  pivotal role in establishing desktop publishing as a general
                  office function. The motherboard, a 9 in (23 cm) CRT monitor,
                  and a floppy drive were housed in a beige case with integrated
                  carrying handle; it came with a keyboard and single-button
                  mouse.
                </div>
                <hr />
              </li>
              <li>
                <hr />
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
                <div className="timeline-end mb-10">
                  <time className="font-mono italic">1998</time>
                  <div className="text-lg font-black">iMac</div>
                  iMac is a family of all-in-one Mac desktop computers designed
                  and built by Apple Inc. It has been the primary part of Apples
                  consumer desktop offerings since its debut in August 1998, and
                  has evolved through seven distinct forms
                </div>
                <hr />
              </li>

            </ul>
          </div>
          <section className="education text-center flex  mt-10 bg-white  dark:bg-main-dark p-6 rounded-lg shadow-md ">
            <div className=" w-full  lg:w-4/6">
              <h1 className="text-center text-3xl font-bold text-main dark:text-accent">
                Education
              </h1>
              <div className="mt-5 space-y-4 text-lg text-text dark:text-light-dark leading-relaxed">
                <p className="font-medium">Graduation from Cairo University</p>
                <p>Civil Engineering</p>
                <p className="italic">Graduation Date: 2021</p>
                <p>Grade: Good</p>
                <p>
                  Final Project:{" "}
                  <span className="font-semibold">Water Desalination</span>
                </p>
                <p>
                  Project Grade:{" "}
                  <span className="text-main dark:text-accent font-bold">
                    Excellent
                  </span>
                </p>
              </div>
              <img src="" alt="" />
            </div>
            <img src="Learning-cuate.svg" className="hidden     lg:block  lg:w-2/6" alt="Learning-cuate.svg" />
          </section>{" "}
        </main>
      </div>
    </div>
  );
}

export default Profile;

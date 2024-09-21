/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import {
  Building2,
  PaintBucket,
  Lightbulb,
  Zap,
  BookOpen,
  Cog,
} from "lucide-react";
import Button from "../components/uiComponents/Button";
import Section from "../components/HomePageCommpenet/Section";
import AboutUsSection from "../components/HomePageCommpenet/AboutUsSection";
import { useEffect } from "react";

const categories = [
  {
    title: "Finishing Works",
    description: "Expert solutions for all finishing needs.",
    icon: PaintBucket,
  },
  {
    title: "Concrete Construction",
    description: "Quality concrete services for every project.",
    icon: Building2,
  },
  {
    title: "Consultation",
    description: "Professional advice and project guidance.",
    icon: Lightbulb,
  },
];

const services = [
  {
    title: "Quick Connections",
    description:
      "Find and connect with finishing engineers quickly and efficiently.",
    icon: Zap,
  },
  {
    title: "Expert Consulting",
    description:
      "Consult with professional engineers to get expert advice for your projects.",
    icon: BookOpen,
  },
  {
    title: "Comprehensive Services",
    description:
      "From start to finish, we offer comprehensive services to ensure your project is completed to the highest standards.",
    icon: Cog,
  },
];

function Home({ isDarkMode, handleRedirectingUrl }) {
  handleRedirectingUrl("/");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main
      className={`
 container mx-auto my-12 px-6 py-14 `}
    >
      {" "}
      <svg
        id="sw-js-blob-svg"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {" "}
        <defs>
          {" "}
          <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
            {" "}
            <stop
              id="stop1"
              stop-color="rgba(17, 94, 89, 0.73)"
              offset="0%"
            ></stop>{" "}
            <stop
              id="stop2"
              stop-color="rgba(31, 251, 150.393, 1)"
              offset="100%"
            ></stop>{" "}
          </linearGradient>{" "}
        </defs>{" "}
        <path
          fill="url(#sw-gradient)"
          d="M15,-11.9C18.9,-1.9,21.2,5.8,18.4,10.6C15.6,15.4,7.8,17.2,-2,18.4C-11.9,19.5,-23.8,20.1,-28.8,14C-33.8,8,-31.8,-4.6,-25.9,-15.8C-19.9,-27.1,-10,-36.9,-2.2,-35.6C5.5,-34.3,11.1,-21.9,15,-11.9Z"
          width="100%"
          height="100%"
          transform="translate(50 50)"
          stroke-width="0"
          style="transition: 0.3s;"
          stroke="url(#sw-gradient)"
        ></path>{" "}
      </svg>
      <div className="hero flex flex-col  md:flex-row justify-between items-center mb-12">
        <div className="about text-center md:text-left p-6 md:p-14 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-main dark:text-accent ">
            Field Talent
          </h1>
          <p className="mb-6 text-lg text-black leading-relaxed dark:text-text-dark">
            Welcome to Field Talent! Your one-stop platform to connect quickly
            with professional finishing engineers. Whether you need expert
            advice or looking to hire a skilled engineer, Field Talent makes the
            process seamless and efficient.
          </p>
          <div className="card-actions justify-center md:justify-start">
            <Button to="/showjobs" text="Show Jobs" variant="fill" size="lg" />
          </div>
        </div>
        {isDarkMode ? (
          <img
            src="feildtalentlogodark.png"
            alt="Field Talent Logo"
            className="img-fluid w-full md:w-1/2 mt-8 md:mt-0 rounded-lg shadow-lg"
          />
        ) : (
          <img
            src="feildtalentlogo.png"
            alt="Field Talent Logo"
            className="img-fluid w-full md:w-1/2 mt-8 md:mt-0 rounded-lg shadow-lg"
          />
        )}
      </div>
      <hr className="my-12 border-gray-200" />
      <Section title="Our Categories" items={categories} />
      <hr className="my-12 border-gray-200" />
      <Section title="Our Services" items={services} />
      <hr className="my-12 border-gray-200" />
      <AboutUsSection />
    </main>
  );
}

export default Home;

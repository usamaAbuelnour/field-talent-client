/* eslint-disable react/prop-types */

import Button from "../components/Button";
import { Building2, PaintBucket, Lightbulb, Zap, BookOpen, Cog } from 'lucide-react';
import Section from '../components/Section';
import AboutUsSection from '../components/AboutUsSection';
import { useEffect } from "react";

const categories = [
  {
    title: "Finishing Works",
    description: "Expert solutions for all finishing needs.",
    icon: PaintBucket
  },
  {
    title: "Concrete Construction",
    description: "Quality concrete services for every project.",
    icon: Building2
  },
  {
    title: "Consultation",
    description: "Professional advice and project guidance.",
    icon: Lightbulb
  }
];

const services = [
  {
    title: "Quick Connections",
    description: "Find and connect with finishing engineers quickly and efficiently.",
    icon: Zap
  },
  {
    title: "Expert Consulting",
    description: "Consult with professional engineers to get expert advice for your projects.",
    icon: BookOpen
  },
  {
    title: "Comprehensive Services",
    description: "From start to finish, we offer comprehensive services to ensure your project is completed to the highest standards.",
    icon: Cog
  }
];


function Home() {



  useEffect(()=>{
    window.screenTop
  }
    
    ,[])



    
  return (
    <main className="container mx-auto my-12 px-6 py-14">
      <div className="hero flex flex-col md:flex-row justify-between items-center mb-12">
        <div className="about text-center md:text-left p-6 md:p-14 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-main">
            Field Talent
          </h1>
          <p className="mb-6 text-lg leading-relaxed text-gray-700">
            Welcome to Field Talent! Your one-stop platform to connect quickly
            with professional finishing engineers. Whether you need expert
            advice or looking to hire a skilled engineer, Field Talent makes the
            process seamless and efficient.
          </p>
          <div className="card-actions justify-center md:justify-start">
            <Button
              to="/showjobs"
              text="Show Jobs"
              variant="fill"
              size="lg"
             
            />
          </div>
        </div>
        <img
          src="feildtalentlogo.png"
          alt="Field Talent Logo"
          className="img-fluid w-full md:w-1/2 mt-8 md:mt-0 rounded-lg shadow-lg"
        />
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
/* eslint-disable react/prop-types */
import { Info, Headphones, Users } from "lucide-react";
import AboutCard from "./AboutCard";
function AboutUsSection() {
  return (
    <section className="py-20 container mx-auto  px-6 ">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 relative dark:text-accent">
          About Us
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-main"></span>
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AboutCard
              icon={Info}
              title="Our Mission"
              description="Field Talent is dedicated to connecting clients with top-notch finishing engineers. We're here to make your vision a reality, whether you need project management or design consultation."
            />
            <AboutCard
              icon={Headphones}
              title="Expert Consultation"
              description="Our platform enables you to consult with experienced engineers, ensuring you make informed decisions for your projects. Get the expertise you need, when you need it."
            />
            <AboutCard
              icon={Users}
              title="Growing Community"
              description="Join our thriving community of professionals and clients. Collaborate, learn, and grow with Field Talent's expanding network of industry experts."
            />
            <div className=" dark:bg-main dark:bg-opacity-25 border dark:border-accent dark:text-text-dark  bg-white p-8 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4 text-main dark:text-text-dark ">
                Why Choose Us?
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Vetted, professional engineers</li>
                <li>Seamless project management</li>
                <li>Tailored solutions for your needs</li>
                <li>Ongoing support and guidance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUsSection;

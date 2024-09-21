/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const FooterLink = ({ href, children }) => (
  <a href={href} className="text-gray-300 hover:text-white transition-colors duration-300">
    {children}
  </a>
);

const SocialIcon = ({ Icon, href }) => (
  <a href={href} className="text-gray-300 hover:text-white transition-colors duration-300">
    <Icon size={24} />
  </a>
);

function Footer() {
  return (
    <div className='relative'>
      <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 390" xmlns="http://www.w3.org/2000/svg" className="transition duration-300 ease-in-out delay-150">
        <path d="M 0,400 L 0,150 C 238.5,165.5 477,181 717,181 C 957,181 1198.5,165.5 1440,150 L 1440,400 L 0,400 Z" stroke="none" strokeWidth="0" fill="#115e59" fillOpacity="1" className="transition-all duration-300 ease-in-out delay-150 path-0 "></path>
        </svg> 
      <footer className="bg-main absolute md:top-52 top-24 w-full text-white">

        <div className="container mx-auto px-4 ">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Field Talent</h3>
              <p className="text-gray-300">Connecting clients with top-notch finishing engineers.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><FooterLink href="/">Home</FooterLink></li>
                <li><FooterLink href="/about">About Us</FooterLink></li>
                <li><FooterLink href="/services">Our Services</FooterLink></li>
                <li><FooterLink href="/jobs">Job Listings</FooterLink></li>
                <li><FooterLink href="/contact">Contact Us</FooterLink></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Mail size={18} className="mr-2" />
                  <FooterLink href="mailto:info@fieldtalent.com">info@fieldtalent.com</FooterLink>
                </li>
                <li className="flex items-center">
                  <Phone size={18} className="mr-2" />
                  <FooterLink href="tel:+1234567890">+1 (234) 567-890</FooterLink>
                </li>
                <li className="flex items-center">
                  <MapPin size={18} className="mr-2" />
                  <span className="text-gray-300">123 Main St, City, Country</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <SocialIcon Icon={Facebook} href="https://facebook.com" />
                <SocialIcon Icon={Twitter} href="https://twitter.com" />
                <SocialIcon Icon={Instagram} href="https://instagram.com" />
                <SocialIcon Icon={Linkedin} href="https://linkedin.com" />
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-teal-700 text-center">
            <p className="text-gray-300">&copy; {new Date().getFullYear()} Field Talent. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;

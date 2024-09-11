import Button from '../components/Button'; // Assuming the Button component is in the same directory

function Home() {
  return (
    <main className="container mx-auto my-12 px-6 py-14 ">
      <div className="hero flex flex-col md:flex-row justify-between items-center mb-12">
        <div className="about text-center md:text-left p-6 md:p-14 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-main">Field Talent</h1>
          <p className="mb-6 text-lg leading-relaxed">
            Welcome to Field Talent! Your one-stop platform to connect quickly
            with professional finishing engineers. Whether you need expert
            advice or looking to hire a skilled engineer, Field Talent makes the
            process seamless and efficient.
          </p>
          <div className="card-actions justify-center md:justify-start">
            <Button 
              to="/login" 
              text="Learn More" 
              variant="fill" 
              size="lg" 
              className="text-xl"
            />
          </div>
        </div>
        <img
          src="feildtalentlogo.png"
          alt="Field Talent Logo"
          className="img-fluid w-full md:w-1/2 mt-8 md:mt-0 rounded-lg shadow-lg"
        />
      </div>

      <hr className="my-12 border-main" />

      <div className="about-us my-12 bg-gray-100 p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-8 text-center text-main">
          <i className="fas fa-info-circle mr-2"></i> About Us
        </h2>
        <p className="text-center mb-4">
          <i className="fas fa-hammer mr-2 text-main"></i> Field Talent is dedicated to
          connecting clients with top-notch finishing engineers. Whether you
          need help with project management or consulting on design and
          materials, we are here to make your vision a reality.
        </p>
        <p className="text-center">
          <i className="fas fa-headset mr-2 text-main"></i> Our platform also allows you to
          consult with experienced engineers, ensuring you make informed
          decisions for your projects.
        </p>
      </div>

      <hr className="my-12 border-main" />

      <div className="services my-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-main">
          <i className="fas fa-concierge-bell mr-2"></i> Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="stat bg-main text-white text-center p-6 rounded-lg shadow-md">
            <h3 className="font-extrabold text-xl mb-4">Quick Connections</h3>
            <p>
              Find and connect with finishing engineers quickly and efficiently.
            </p>
          </div>

          <div className="stat bg-white text-main text-center p-6 rounded-lg shadow-md border border-main">
            <h3 className="font-extrabold text-xl mb-4">Expert Consulting</h3>
            <p>
              Consult with professional engineers to get expert advice for your
              projects.
            </p>
          </div>

          <div className="stat bg-main text-white text-center p-6 rounded-lg shadow-md">
            <h3 className="font-extrabold text-xl mb-4">Comprehensive Services</h3>
            <p>
              From start to finish, we offer comprehensive services to ensure
              your project is completed to the highest standards.
            </p>
          </div>
        </div>
      </div>

      <hr className="my-12 border-main" />

      <div className="cta-section text-center my-12">
        <h2 className="text-3xl font-bold mb-6 text-main">Ready to Get Started?</h2>
        <Button 
          to="/login" 
          text="Join Field Talent Today" 
          variant="fill" 
          size="lg" 
          className="text-xl"
        />
      </div>
    </main>
  );
}

export default Home;

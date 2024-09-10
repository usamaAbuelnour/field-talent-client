import { Link } from 'react-router-dom'; 

const NotFound = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gray-100">
      
      <div className="text-center  lg:w-1/2 p-6">
        <h1 className="text-6xl font-bold text-gray-800 ">404</h1>
        <p className="mt-4 text-xl lg:text-3xl  lg:my-20 text-gray-600">Oops! Page not found.</p>
        <p className="mt-2 text-gray-500  lg:text-2xl">The page you are looking for doesnt exist.</p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
        >
          Go Home
        </Link>
      </div>
      <div className="flex-shrink-0 lg:w-1/2 p-6">
        <img
          src="Lost Tourist-big.png" 
          alt="Page Not Found"
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};
export default NotFound
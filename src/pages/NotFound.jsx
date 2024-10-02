/* eslint-disable react/prop-types */
import Button from "../components/uiComponents/Button";
function NotFound() {
  
  return (
    <div className="flex flex-col py-24 px-10 lg:flex-row items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 dark:from-main dark:to-accent  p-8">
      <div className="text-center lg:text-left lg:w-1/2 lg:pr-12">
        <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r dark:text-accent  from-main to-teal-200 ">
          404
        </h1>
        <p className="mt-4 text-2xl lg:text-4xl font-bold text-gray-800 dark:text-white">
          Oops! You have gone off course
        </p>
        <p className="mt-4 text-xl text-gray-600 max-w-md mx-auto lg:mx-0 dark:text-text-dark">
          The page you are looking for has drifted into space. Lets get you back
          to familiar territory.
        </p>
        <div className="mt-8 space-y-4 lg:space-y-0 lg:space-x-4">
          <Button
            to={"/"}
            text="Go Home"
            variant="fill"
            size="lg"
            className="w-full lg:w-auto"/>
                    
        </div>
      </div>
      <div className="lg:w-1/2 mt-12 lg:mt-0">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
          <img
            src="Astronaut-big.png"
            alt="Lost in Space"
            className="relative z-10 w-full max-w-lg mx-auto rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
}

export default NotFound;

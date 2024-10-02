/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Button from "./Button";
import Nodata from "../../../public/Nodata.svg"

function NoPage({title,description,buttonText,buttonTo}) {
    return (
        <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gradient-to-r from-green-100 to-green-600 dark:from-main dark:to-accent-dark p-8 ">
          <div className="text-center lg:text-left lg:w-1/2 lg:pr-12">
            <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-main to-main-dark dark:text-accent ">
              {title}
            </h1>
            <p className="mt-4 text-2xl lg:text-4xl font-bold text-gray-800 dark:text-text-dark">
            {description}
            </p>
            <div className="mt-8 space-y-4 lg:space-y-0 lg:space-x-4">
              <Button
                to={buttonTo}
                text={buttonText}
                variant="fill"
                size="lg"
                className="w-full lg:w-auto"
              />
            </div>
          </div>
          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-teal-50 dark:from-main-dark dark:to-main  rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
              <img
                src={Nodata}
                alt=""
                className="relative z-10 w-full max-w-lg mx-auto rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
    );
}

export default NoPage;
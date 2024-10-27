/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import apiService from "../Api/AxiosServiceConfiguration";
import { Check, UserSearch, BriefcaseBusiness } from "lucide-react";
import Button from "../components/uiComponents/Button";

const schema = yup
  .object({
    firstName: yup.string().required("First Name is a required field!!"),
    lastName: yup.string().required("Last Name is a required field!!"),
    email: yup
      .string()
      .required("Email is required")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Enter valid email"
      ),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password can be at most 20 characters")
      .required("Password is a required field"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is a required field"),
  })
  .required();

export default function Registration({
  verificationStatus,
  isUserLoggedIn,
  handleLogin,
  redirectingUrl,
}) {
  const navigate = useNavigate();
  const [dataError, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [currentStage, setCurrentStage] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (isUserLoggedIn && verificationStatus) {
      navigate(redirectingUrl, { replace: true });
    }
  }, [isUserLoggedIn, navigate, redirectingUrl, verificationStatus]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    if (isLoading) return;

    data.type = selectedType;

    try {
      setIsLoading(true);
      const response = await apiService.registerUser(data);
      let userType = "";

      if (response.data.hasOwnProperty("engineerId")) {
        userType = "engineer";
      } else if (response.data.hasOwnProperty("clientId")) {
        userType = "client";
      }
       handleLogin(
        response.data.token,
        response.data.name,
        response.data.email,
        userType,
        response.data.verificationState
      );

      navigate("/verification", { replace: true });

     

    } catch (error) {
      setError(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const moveToStageTwo = () => {
    if (selectedType) {
      setCurrentStage(2);
    }
  };

  return (
    <div className="hero max-h-fit min-w-fit container pt-10">
      {currentStage === 1 && (
        <div className="stageOne min-h-screen p-6 lg:p-14">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center mb-8 sm:mb-10 text-main dark:text-accent font-bold">
            Join as a Client or Engineer
          </h1>

          <div className="flex flex-col lg:flex-row w-full space-y-4 lg:space-y-0 lg:space-x-4">
            <div
              className={`card relative text-lg sm:text-xl md:text-2xl lg:text-3xl bg-base-300 border-2 p-4 sm:p-5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-center justify-center w-full lg:w-1/2
      hover:scale-105 hover:bg-slate-100 dark:hover:bg-main-dark ${
        selectedType === "engineer" ? "border-accent" : "border-gray-500"
      }`}
              onClick={() => setSelectedType("engineer")}
              aria-label="Select Engineer"
            >
              <BriefcaseBusiness
                size={32}
                className="absolute top-2 left-2 dark:text-accent"
              />
              <Check
                className={`absolute top-2 right-2  rounded-full text-white ${
                  selectedType === "engineer"
                    ? "block bg-accent text-white"
                    : "bg-light-dark"
                }`}
              />
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl p-4 sm:p-6 lg:p-8 text-center dark:text-text-dark">
                I am an Engineer looking for work as talent
              </p>
            </div>

            <div className="divider lg:divider-horizontal md:text-xl m-6 lg:m-10 dark:text-accent">
              OR
            </div>

            <div
              className={`card bg-base-300 border-2 text-lg sm:text-xl md:text-2xl lg:text-3xl -4 sm:p-5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-center justify-center w-full lg:w-1/2
      hover:scale-105 hover:bg-slate-100 dark:hover:bg-main-dark ${
        selectedType === "client" ? "border-accent" : "border-gray-500"
      }`}
              onClick={() => setSelectedType("client")}
              aria-label="Select Client"
            >
              <UserSearch
                size={32}
                className="absolute top-2 left-2 dark:text-accent"
              />
              <Check
                className={`absolute top-2 right-2 rounded-full text-white ${
                  selectedType === "client"
                    ? "block bg-accent text-white"
                    : "bg-light-dark"
                }`}
              />
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl p-4 sm:p-6 lg:p-8 text-center dark:text-text-dark">
                I am a Client hiring talent for projects
              </p>
            </div>
          </div>

          <div className="text-center mt-8 sm:mt-10 lg:mt-12">
            <Button
              variant="fill"
              size="lg"
              text={
                selectedType === "engineer"
                  ? "Apply as Engineer"
                  : selectedType === "client"
                  ? "Join as Client"
                  : "Create Account"
              }
              className="text-lg sm:text-xl lg:text-3xl "
              disabled={!selectedType}
              onClick={moveToStageTwo}
            />
          </div>

          <p className="text-center text-sm sm:text-base mt-4 dark:text-white">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 dark:text-accent">
              Login here
            </Link>
          </p>
        </div>
      )}

      {currentStage === 2 && (
        <div className="hero-content stageTwo min-w-full flex-row-reverse mt-0">
          <div className="hidden md:block md:w-full  mx-5 text-center relative">
            <img
              src="Registraion.svg"
              alt="Register illustration"
              className="mb-0"
            />
          </div>
          <div className="card w-full bg-s-light shadow-2xl  dark:bg-main-dark dark:bg-opacity-10">
            <form className="card-body " onSubmit={handleSubmit(onSubmit)}>
              <h1 className="text-main text-center text-3xl   md:text-4xl font-bold dark:text-white">
                Register Now
              </h1>
              <div className="flex justify-between gap-2">
                <div className="form-control w-full">
                  <label htmlFor="firstName" className="label">
                    <span className="label-text dark:text-white">
                      First Name
                    </span>
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="Enter your first name"
                    autoComplete="given-name"
                    {...register("firstName")}
                    className={`input input-bordered w-full ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="form-control w-full">
                  <label htmlFor="lastName" className="label">
                    <span className="label-text dark:text-white">
                      Last Name
                    </span>
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Enter your last name"
                    autoComplete="family-name"
                    {...register("lastName")}
                    className={`input input-bordered w-full ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="form-control">
                <label htmlFor="email" className="label">
                  <span className="label-text dark:text-white">Email</span>
                </label>
                <input
                  id="email"
                  placeholder="Email"
                  autoComplete="email"
                  {...register("email")}
                  className={`input input-bordered w-full ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="form-control">
                <label htmlFor="password" className="label">
                  <span className="label-text dark:text-white">Password</span>
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter a strong password"
                  autoComplete="new-password"
                  {...register("password")}
                  className={`input input-bordered w-full ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="form-control">
                <label htmlFor="confirmPassword" className="label">
                  <span className="label-text dark:text-white">
                    Confirm Password
                  </span>
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  {...register("confirmPassword")}
                  className={`input input-bordered w-full ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {dataError && (
                <p className="mt-1 text-sm text-red-600 text-center">
                  {dataError}
                </p>
              )}

              <div className="form-control mt-6">
                <Button
                  variant="fill"
                  size="lg"
                  text={isLoading ? "Registering..." : "Register"}
                  type="submit"
                  disabled={isLoading}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

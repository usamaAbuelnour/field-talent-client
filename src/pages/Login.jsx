/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../components/uiComponents/Button";
import apiService from '../Api/Axios Service Configuration';
const schema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Enter vaild email")
    ,
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password can be at most 20 characters")
    .required("Password is required"),
}).required();

export default function Login({ handleLogin, isUserLoggedIn, redirectingUrl}) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [dataError,setError]=useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    window.scrollTo(0,0)

    if (isUserLoggedIn) {
      navigate(redirectingUrl, { replace: true });
    }``
  }, [isUserLoggedIn, navigate,redirectingUrl]);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      const response = await apiService.loginUser(data);

      handleLogin(response.data.token, response.data.name, response.data.email);
      navigate(redirectingUrl, { replace: true });
    } catch (error) {
      console.error("Login failed:", error);
      setError(error.response.data)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" hero min-h-fit text-lg container py-14 dark:bg-transparent">
      <div className="hero-content min-w-full flex-row-reverse">
        <div className="hidden md:block md:w-full mx-5 text-center relative">
          <img src="login.svg" alt="Login image" className="mb-0 dark:text-transparent " />
        </div>
        <div className="card w-full bg-s-light shadow-2xl  dark:bg-main-dark dark:bg-opacity-20">
          <form className="card-body space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-main text-center text-4xl md:text-5xl font-bold dark:text-white">Login Now</h1>

            <div className="form-control ">
              <label htmlFor="email" className="label">
                <span className="label-text dark:text-white">Email</span>
              </label>
              <input
                id="email"
                placeholder="Enter your email"
                {...register("email")}
                className={`input input-bordered w-full ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div className="form-control">
              <label htmlFor="password" className="label">
                <span className="label-text dark:text-white">Password</span>
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
                className={`input input-bordered w-full ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
             
            </div>

            {dataError && (
                <p className="mt-1 text-sm text-red-600 text-center">{dataError}</p>
              )}
            <div className="form-control mt-6">
              <Button
                type="submit"
                variant="fill"
                text={isLoading ? "Logging in..." : "Login"}
                className=" text-xl dark:text-white "
              />
            </div>


            <p className="text-center text-sm mt-4 dark:text-white">
              Create new account?{" "}
              <Link to="/registration" className="text-blue-600 dark:text-accent">
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
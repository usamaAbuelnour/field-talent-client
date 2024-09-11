/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";


import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useEffect } from "react";



const schema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password can be at most 20 characters")
    .required("Password is required"),
}).required();

export default function Login({handleLogin ,isUserLoggedIn}) {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });


  useEffect(() => {
    if (isUserLoggedIn) {
      navigate('/', { replace: true });
    }
  }, [isUserLoggedIn, navigate]);
     


  const onSubmit = async (data) => {
    try {
      const response = await axios.post("https://auto-gear.vercel.app/login", data);
      

    console.log(response.data.token,response.data.name,response.data.email)
    {handleLogin (response.data.token,response.data.name,response.data.email)}
      console.log("Login successful:", {...response.data});
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="hero min-h-fit text-lg container py-14">
      <div className="hero-content min-w-full flex-row-reverse">
        <div className="hidden md:block md:w-full mx-5 text-center relative">
          <img src="login.svg" alt="Login illustration" className="mb-0" />
        </div>
        <div className="card w-full bg-s-light shadow-2xl">
          <form className="card-body space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-center text-4xl  md:text-5xl  font-bold">Login Now</h1>

            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                type="email"
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
                <span className="label-text">Password</span>
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
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
              
            </div>
            <div className="form-control mt-6">
              <Button type="submit" text="login"/>
            </div>
            <p className="text-center text-sm mt-4">
              Create new account? <Link to="/registration" className="text-blue-600">Register here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
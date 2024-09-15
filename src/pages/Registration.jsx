/* eslint-disable react/prop-types */
/* eslint-disable no-constant-condition */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";



import Button from "../components/Button";

const schema = yup.object({
  firstName: yup
    .string()
    .required("First Name is a required field!!"),
  lastName: yup
    .string()
    .required("Last Name is a required field!!"),
  email: yup
    .string()
    .required("Email is required")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Enter vaild email")
,
  
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password can be at most 20 characters")
    .required("Password is a required field"),
}).required();

export default function Registraion({isUserLoggedIn,handleLogin}) {
  const navigate = useNavigate();
  const [dataError,setError]=useState("")


  

  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {   

    if (isUserLoggedIn) {
      navigate('/', { replace: true });
      console.log("isUserLoggedIn",isUserLoggedIn)

    }
  }, [isUserLoggedIn, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true)
      const response = await axios.post("https://field-talent.vercel.app/register", data);
      console.log(data)
      {handleLogin (response.data.token,response.data.name,response.data.email)}
      navigate("/");
      console.log("isUserLoggedIn",isUserLoggedIn)


      console.log("Registration successful:", response.data);
    } catch (error) {
      setError(error.response.data)
    }finally{
      setIsLoading(false)

    }
  };

  return (
    <div className="hero max-h-fit min-w-fit container pt-10">
      <div className="hero-content min-w-full flex-row-reverse">
        <div className="hidden md:block md:w-full mx-5 text-center relative">
          <img src="Registraion.svg" alt="Register illustration" className="mb-0" />
        </div>
        <div className="card w-full bg-s-light shadow-2xl">
          <form className="card-body space-y-1" onSubmit={handleSubmit(onSubmit)}>
            <h1 className=" text-main text-center text-3xl md:text-5xl font-bold">Register Now</h1>

            <div className="form-control">
              <label htmlFor="firstName" className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="Enter your first name"
                {...register("firstName")}
                className={`input input-bordered w-full ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
              )}
            </div>

            <div className="form-control">
              <label htmlFor="lastName" className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Enter your last name"
                {...register("lastName")}
                className={`input input-bordered w-full ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
              )}
            </div>

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
              
            {dataError && (
                <p className=" text-sm text-red-600 text-center ">{dataError}</p>
              )}
              <Button
                type="submit"
                variant="fill"
                text={isLoading ? "Logging in..." : "Register"}
                className="text-xl"
              />
            
            </div>

            <p className="text-center text-sm mt-4">
              Already have an account? <Link to="/login" className="text-blue-600">Login here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";

const schema = yup.object({
  firstName: yup
    .string()
    .required("First Name is a required field!!"),
  lastName: yup
    .string()
    .required("Last Name is a required field!!"),
  email: yup
    .string()
    .required("Email is a required field!!"),
  
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password can be at most 20 characters")
    .required("Password is a required field"),
}).required();

export default function Registraion() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("https://auto-gear.vercel.app/register", data);
      console.log("Registration successful:", response.data);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="hero min-h-fit container">
      <div className="hero-content min-w-full flex-row-reverse">
        <div className="w-full mx-5 text-center relative">
          <img src="Registraion.svg" alt="Register illustration" className="mb-0" />
        </div>
        <div className="card w-full bg-s-light shadow-2xl">
          <form className="card-body space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-center text-xl lg:text-5xl font-bold">Register Now</h1>

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
              <button type="submit" className="btn bg-main w-full hover:text-dark hover:font-bold">
                Register
              </button>
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

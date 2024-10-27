import { CalendarDays } from "lucide-react";
const ClientDetails = ({ user }) => {
  return (
    <div className=" dark:-dark dark:bg-opacity-25   dark:text-white mt-16  p-2  bg-gradient-to-r from-green-50  to-slate-50 border rounded-md dark:border-main   border-x-0 mx-2  md:mx-7 dark:bg-gradient-to-r dark:from-main  dark:to-main-dark md:w-fit">
      <div className=" md:flex mx-auto md:w-fit">
      <span className="text-slate-600 text-lg font-semibold dark:text-accent-dark">About Client </span>
          <div className="md:flex md:flex-col  justify-center md:gap-1 items-center md:pt-1 inline-block md:ml-1">
            <div className="w-1 h-1  bg-gradient-to-r from-green-50  to-main rounded-full animate-spin inline-block  pr-1 mx-1 mb-1  md:mb-0 "></div>
            <div className="w-1 h-1 bg-gradient-to-r from-green-50  to-accent rounded-full animate-spin  inline-block mb-1 md:mb-0"></div>

          </div>
        <div className="flex    gap-1 sm:mr-2 md:mr-1 ">
          

          <p className="  text-slate-600 sm:text-sm md:text-lg  md:pl-1 dark:text-accent-dark"> Name :</p>
          <p className="sm:text-sm md:text-lg  dark:text-accent">{user.firstName} {user.lastName}</p>
        </div>
        <div className="flex gap-1 md:ml-3 ">
          <CalendarDays size={25} className="pt-2 px-0 hidden md:inline-block" />
          <p className="  text-slate-600 sm:text-sm md:text-lg  dark:text-accent-dark">Join :</p>
          <p className="sm:text-sm md:text-lg  dark:text-accent">{new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
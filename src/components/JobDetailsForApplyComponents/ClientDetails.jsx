import {CalendarDays } from "lucide-react";
const ClientDetails = ({ user }) => {
  return (
    <div className=" dark:-dark dark:bg-opacity-25   dark:text-white mt-16  p-2  bg-gradient-to-r from-green-50  to-slate-50 border rounded-md   border-x-0 mx-7 dark:bg-gradient-to-r dark:from-main  dark:to-main-dark w-fit">
  <div className=" md:flex mx-auto w-fit">

      <div  className="flex gap-1 sm:mr-2 md:mr-1 ">
        <span className="text-slate-600 text-lg font-semibold dark:text-accent-dark">About Client </span>
        <div class="flex flex-col  justify-center gap-1 items-center pt-1">
  <div class="w-1 h-1  bg-gradient-to-r from-green-50  to-main rounded-full animate-spin inline-block  pr-1"></div>
  <div class="w-1 h-1 bg-gradient-to-r from-green-50  to-accent rounded-full animate-spin  inline-block"></div>

</div>

        <p className="  text-slate-600 sm:text-sm md:text-lg  pl-1 dark:text-accent-dark"> Name :</p>
        <p className="sm:text-sm md:text-lg  dark:text-accent">{user.firstName} {user.lastName}</p>
      </div>
      <div  className="flex gap-1 ml-3 ">
      <CalendarDays size={23} className="pt-2"/>
        <p className="  text-slate-600 sm:text-sm md:text-lg  dark:text-accent-dark">Join :</p>
        <p className="sm:text-sm md:text-lg  dark:text-accent">{new Date(user.createdAt).toLocaleDateString()}</p>
      </div>
      </div>
    </div>
  );
};

export default ClientDetails ;
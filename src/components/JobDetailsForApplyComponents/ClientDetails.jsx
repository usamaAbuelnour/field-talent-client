
const ClientDetails = ({ user }) => {
  return (
    <div className=" dark:-dark dark:bg-opacity-25   dark:text-white mt-16  p-2  bg-gradient-to-r from-green-50  to-slate-50 border rounded-md   border-x-0 mx-7 dark:bg-gradient-to-r dark:from-main  dark:to-main-dark">
  <div className=" md:flex mx-auto w-fit">

      <div  className="flex gap-1 sm:mr-2 md:mr-4 ">

        <p className="font-semibold  text-slate-600 sm:text-sm md:text-xl  lg:text-xl dark:text-accent-dark">Client Name:</p>
        <p className="sm:text-sm md:text-xl lg:text-xl dark:text-accent">{user.firstName} {user.lastName}</p>
      </div>
      <div  className="flex gap-1 ml-3 ">
        <p className="font-semibold  text-slate-600 sm:text-sm md:text-xl lg:text-xl dark:text-accent-dark">Joined:</p>
        <p className="sm:text-sm md:text-xl lg:text-xl dark:text-accent">{new Date(user.createdAt).toLocaleDateString()}</p>
      </div>
      </div>
    </div>
  );
};

export default ClientDetails ;
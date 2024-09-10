import HomeIcon from "../icons/HomeIcon";
import { Link } from "react-router-dom";
export default function NavBar() {
  const AreUserLogin = false;
  return (
    <div className=" bg-dark shadow-sm w-full">
      <div className="navbar px-8">
        <div className="flex-1 w-fit justify-start align-text-bottom">
          <Link to="/" className="flex gap-2  text-white bg-transparent btn-sm text-2xl">
            <HomeIcon />
            Home
          </Link>
          
          <Link to="/addpost" label="posts"  className="mx-4 text-white bg-transparent text-xs lg:text-xl">
          Add job
          </Link>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              {AreUserLogin ? (
                <>

                  <li>
                    <a>Logout</a>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/login">
                    login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

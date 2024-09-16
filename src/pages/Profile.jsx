/* eslint-disable react/prop-types */
import { User, Mail, MapPin } from "lucide-react";

function Profile({ user }) {
  return (
    <div className="pt-20 mb-10 min-h-screen bg-base-200">
      <header className="px-20">
        <div className="flex items-center space-x-4">
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <div>
            <h3 className="m-5 text-2xl font-semibold text-main">
              <User className="inline mr-2 text-accent" />
              {user.name}
            </h3>
            <div className="m-5 flex items-center text-text dark:text-light-dark">
              <Mail className="mr-2 text-accent" />
              {user.email}
            </div>
            <div className="m-5 flex items-center text-text dark:text-light-dark">
              <MapPin className="mr-2 text-accent" /> Egypt
            </div>
          </div>
        </div>
      </header>
      <hr className="w-3/4 mx-auto " />

      <div className="flex mt-8 px-10">
        <aside className="w-1/4 p-4 bg-base-100 shadow-lg rounded-lg">
          <section className="mb-6">
            <h4 className="text-lg font-bold text-main">Profile Overview</h4>
            <p className="text-sm text-text dark:text-light-dark">
              Civil Engineer with 5+ years of experience in structural design,
              project management, and site supervision.
            </p>
          </section>

          <section>
            <h4 className="text-lg font-bold text-main">Skills</h4>
            <ul className="list-disc list-inside text-sm text-text dark:text-light-dark">
              <li>Structural Design</li>
              <li>AutoCAD</li>
              <li>Project Management</li>
              <li>Site Supervision</li>
              <li>Construction Safety</li>
            </ul>
          </section>
        </aside>

        <main className="grow ml-8">
          <article className="bg-base-100 p-6 rounded-lg shadow-lg">
            <figure>
              <img
                src="personphotp.jpg"
                alt="Civil engineering project"
                className="object-cover h-48 w-96 mx-auto"
              />
              <figcaption className="text-sm text-text dark:text-light-dark mt-2">
                Civil engineering work or client content
              </figcaption>
            </figure>
          </article>
          <div className="show jops">
            {" "}
            <section className="mt-8">
              <h4 className="text-lg font-bold text-main">Project Section 1</h4>
              <p className="text-sm text-text dark:text-light-dark">
                Description of engineering project or client content.
              </p>
            </section>
            <section className="mt-8">
              <h4 className="text-lg font-bold text-main">Project Section 2</h4>
              <p className="text-sm text-text dark:text-light-dark">
                Details about another aspect of the project.
              </p>
            </section>
            <section className="mt-8">
              <h4 className="text-lg font-bold text-main">Project Section 3</h4>
              <p className="text-sm text-text dark:text-light-dark">
                Additional information related to the engineering work.
              </p>
            </section>
          </div>
          <section className="eduction"></section>

        </main>
      </div>
    </div>
  );
}

export default Profile;

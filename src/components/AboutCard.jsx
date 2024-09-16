/* eslint-disable react/prop-types */

function AboutCard({ icon: Icon, title, description }) {
    return (
       < div className="bg-white dark:bg-main dark:bg-opacity-25 border dark:text-text-dark dark:shadow dark:border-accent p-8 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
        <div className="flex items-center mb-4">
          <Icon className="w-10 h-10 text-main mr-4 dark:text-accent" />
          <h3 className="text-2xl font-semibold text-gray-800  dark:text-text-dark">{title}</h3>
        </div>
        <p className="text-gray-700 leading-relaxed  dark:text-text-dark">{description}</p>
      </div>    );
}

export default AboutCard;
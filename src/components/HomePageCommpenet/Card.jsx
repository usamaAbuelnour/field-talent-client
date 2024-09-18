/* eslint-disable react/prop-types */

function Card({ title, description, icon: Icon, inverted = false }) {
    return (
      <div className={`p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl ${
        inverted ? 'bg-main text-white' : 'bg-white  text-text dark:text-text-dark dark:bg-main dark:bg-opacity-20   hover:border-main'
      }`}>
        <Icon className={`w-12 h-12 mx-auto mb-4 ${inverted ? 'text-white' : 'text-accent'}`} />
        <h3 className="font-bold text-xl mb-2 dark:text-text-dark">{title}</h3>
        <p className={inverted ? 'text-teal-50 dark:text-text-dark' : 'text-gray-600 dark:text-text-dark'}>{description}</p>
      </div>
    );
}

export default Card;

/* eslint-disable react/prop-types */

function AboutCard({ icon: Icon, title, description }) {
    return (
       < div className="bg-white p-8 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
        <div className="flex items-center mb-4">
          <Icon className="w-10 h-10 text-main mr-4" />
          <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
        </div>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>    );
}

export default AboutCard;
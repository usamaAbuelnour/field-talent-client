import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronRight, NotebookPen, PaintRoller, HardHat, Flag } from 'lucide-react';
import data from '../../public/jobs.json';
import Loading from '../components/uiComponents/Loading';

const CategoryDetails = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const foundCategory = data.categories.find(cat => cat.id === parseInt(categoryId));
    setCategory(foundCategory);
  }, [categoryId]);

  useEffect(() => {
    if (category) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === category['img categories'].length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [category]);

  if (!category) {
    return <Loading />;
  }

  const getCategoryIcon = (categoryName) => {
    switch (categoryName) {
      case 'Civil Engineering Consultations':
        return <NotebookPen className="w-8 h-8 text-main dark:text-accent" />;
      case 'Concrete Works':
        return <HardHat className="w-8 h-8 text-main dark:text-accent " />;
      case 'Finishing Works':
        return <PaintRoller  className="w-8 h-8 text-main dark:text-accent" />;
      default:
        return <HardHat className="w-8 h-8 text-main dark:text-accent" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6  rounded-lg shadow-lg mt-16 ">
      <div className=" items-center mb-6 flex justify-center">
        {getCategoryIcon(category.name)}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold ml-4 text-main dark:text-accent">{category.name}</h1>
      </div>
      
      <div className="mb-8 relative h-48 sm:h-56 lg:h-64 overflow-hidden rounded-lg ">
        {category['img categories'].map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Category image ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-8 dark:text-white">{category.description}</p>

      <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4 text-main flex justify-center items-center dark:text-accent">
        <Flag className="mr-2" size={24} />
        Available Services
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {category.services.map((service, index) => (
          <div key={index} className="bg-white dark:bg-main-dark dark:bg-opacity-20 p-3 sm:p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-[#115e59] flex flex-col h-full">
            <div className="h-40 sm:h-48 overflow-hidden rounded-t-lg mb-3 sm:mb-4">
              {service['img service'] && (
                <img 
                  src={service['img service']} 
                  alt={service.name} 
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 text-main flex items-start dark:text-accent">
              <ChevronRight className="mr-2 flex-shrink-0 mt-1" size={20} />
              <span>{service.name}</span>
            </h3>
            <p className="text-xs sm:text-sm lg:text-base text-gray-600 mb-2 flex-grow dark:text-white">{service.description}</p>
            <p className="text-xs sm:text-sm italic text-gray-500 mt-2 dark:text-white ">{service.additional_info}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryDetails;
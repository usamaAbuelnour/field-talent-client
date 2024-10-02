/* eslint-disable react/prop-types */
import Select from 'react-select';
import CustomOption from './CustomOption';

const FilterJobs = ({ 
  locationOptions, 
  categoryOptions, 
  serviceOptions, 
  selectedLocation, 
  setSelectedLocation, 
  selectedCategory, 
  setSelectedCategory, 
  selectedServices, 
  setSelectedServices 
}) => {
  const mainColor = '#115e59';
  const whiteColor = '#ffffff';

  const locationOptionsWithAll = [{ value: '', label: 'All Locations' }, ...locationOptions];
  const categoryOptionsWithAll = [{ value: '', label: 'All Categories' }, ...categoryOptions];

  const handleLocationChange = (selectedOption) => {
    setSelectedLocation(selectedOption && selectedOption.value !== '' ? selectedOption : null);
  };

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption && selectedOption.value !== '' ? selectedOption : null);
  };

  const handleServiceChange = (selectedOptions) => {
    setSelectedServices(selectedOptions || []);
  };

  return (
    <div className="flex flex-col items-center mb-8 ">
      <div className="flex flex-wrap justify-center gap-2 mb-4 w-full max-w-4xl">
        <Select
          className="w-full sm:w-60"
          options={locationOptionsWithAll}
          value={selectedLocation}
          onChange={handleLocationChange}
          placeholder="All Locations"
          styles={{
            control: (provided) => ({
              ...provided,
              borderColor: mainColor,
              boxShadow: 'none',
              '&:hover': {
                borderColor: mainColor,
              },
            }),
            menu: (provided) => ({
              ...provided,
              borderRadius: '0.375rem',
              borderColor: mainColor,
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isSelected || state.isFocused ? mainColor : 'white',
              color: state.isSelected || state.isFocused ? whiteColor : mainColor,
              '&:hover': {
                backgroundColor: mainColor,
                color: whiteColor,
              },
            }),
          }}
        />

        <Select
          className="w-full sm:w-60"
          options={categoryOptionsWithAll}
          value={selectedCategory}
          onChange={handleCategoryChange}
          placeholder="All Categories"
          styles={{
            control: (provided) => ({
              ...provided,
              borderColor: mainColor,
              boxShadow: 'none',
              '&:hover': {
                borderColor: mainColor,
              },
            }),
            menu: (provided) => ({
              ...provided,
              borderRadius: '0.375rem',
              borderColor: mainColor,
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isSelected || state.isFocused ? mainColor : 'white',
              color: state.isSelected || state.isFocused ? whiteColor : mainColor,
              '&:hover': {
                backgroundColor: mainColor,
                color: whiteColor,
              },
            }),
          }}
        />

        <Select
          className="w-full sm:w-60"
          options={serviceOptions} 
          value={selectedServices}
          onChange={handleServiceChange}
          placeholder="All Services"
          isMulti
          components={{ Option: CustomOption }}
          styles={{
            control: (provided) => ({
              ...provided,
              borderColor: mainColor,
              boxShadow: 'none',
              '&:hover': {
                borderColor: mainColor,
              },
            }),
            menu: (provided) => ({
              ...provided,
              borderRadius: '0.375rem',
              borderColor: mainColor,
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isSelected || state.isFocused ? mainColor : 'white',
              color: state.isSelected || state.isFocused ? whiteColor : mainColor,
              '&:hover': {
                backgroundColor: mainColor,
                color: whiteColor,
              },
            }),
            multiValue: (provided) => ({
              ...provided,
              backgroundColor: mainColor,
              color: whiteColor,
            }),
            multiValueLabel: (provided) => ({
              ...provided,
              color: whiteColor,
            }),
            multiValueRemove: (provided) => ({
              ...provided,
              color: whiteColor,
              ':hover': {
                backgroundColor: "red",
                color: whiteColor,
              },
            }),
          }}
        />
      </div>
    </div>
  );
};

export default FilterJobs;

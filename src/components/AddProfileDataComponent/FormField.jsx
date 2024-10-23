/* eslint-disable react/prop-types */

function FormField({ label, name, type, value, onChange, options, error, maxSelections }) {
  const handleMultiselectChange = (selectedOption) => {
    let newValue;
    if (Array.isArray(value)) {
      if (value.includes(selectedOption)) {
        newValue = value.filter(item => item !== selectedOption);
      } else {
        newValue = [...value, selectedOption].slice(0, maxSelections);
      }
    } else {
      newValue = [selectedOption];
    }
    
    onChange({
      target: {
        name,
        value: newValue,
      },
    });
  };

  const renderInput = () => {
    switch (type) {
      case "select":
        return (
          <select
            name={name}
            className="select select-bordered w-full dark:bg-main dark:text-white"
            value={value || ""}
            onChange={onChange}
          >
            <option disabled value="">
               {label}
            </option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case "multiselect":
        return (
          <div className="flex flex-wrap gap-3">
            {options.map((option, index) => (
              <button
                key={index}
                type="button"
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors dark:bg-main dark:text-white ${
                  Array.isArray(value) && value.includes(option)
                    ? 'bg-main text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => handleMultiselectChange(option)}
                disabled={Array.isArray(value) && value.length >= maxSelections && !value.includes(option)}
              >
                {option}
              </button>
            ))}
          </div>
        );
      case "textarea":
        return (
          <textarea
            name={name}
            className="textarea textarea-bordered w-full dark:bg-main dark:text-white"
            value={value || ""}
            onChange={onChange}
          />
        );
      case "file":
        return (
          <input
            type="file"
            name={name}
            className="file-input file-input-bordered w-full dark:bg-main dark:text-white"
            onChange={onChange}
            accept="image/*"
          />
        );
      default:
        return (
          <input
            type={type}
            name={name}
            className="input input-bordered w-full dark:bg-main dark:text-white"
            value={value || ""}
            onChange={onChange}
          />
        );
    }
  };

  return (
    <div className="form-control ">
      <label className="label " htmlFor={name}>
        <span className="label-text dark:text-white ">{label}</span>
      </label>
      {renderInput()}
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
      {type === "multiselect" && maxSelections && (
        <span className="text-sm mt-1 text-gray-600  dark:text-white">
          اختر حتى {maxSelections} {maxSelections !== 1 ? 'خيارات' : 'خيار'}
        </span>
      )}
    </div>
  );
}

export default FormField

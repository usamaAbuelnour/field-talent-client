/* eslint-disable react/prop-types */
function FormField({ label, name, type, value, onChange, options, error, maxSelections }) {
  const handleMultiselectChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    if (maxSelections && selectedOptions.length > maxSelections) {
      onChange({
        target: {
          name,
          value: selectedOptions.slice(0, maxSelections)
        }
      });
    } else {
      onChange(e);
    }
  };

  const renderInput = () => {
    switch (type) {
      case "select":
        return (
          <select
            name={name}
            className="select select-bordered w-full"
            value={value}
            onChange={onChange}
          >
            <option disabled value="">
              Choose your {label.toLowerCase()}
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
          <select
            name={name}
            className="select select-bordered w-full"
            multiple
            value={value}
            onChange={handleMultiselectChange}
          >
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case "textarea":
        return (
          <textarea
            name={name}
            className="textarea textarea-bordered w-full"
            value={value}
            onChange={onChange}
          />
        );
      case "file":
        return (
          <input
            type="file"
            name={name}
            className="file-input file-input-bordered w-full"
            onChange={onChange}
            accept="image/*"
          />
        );
      default:
        return (
          <input
            type={type}
            name={name}
            className="input input-bordered w-full"
            value={value}
            onChange={onChange}
          />
        );
    }
  };

  return (
    <div className="form-control">
      <label className="label" htmlFor={name}>
        <span className="label-text">{label}</span>
      </label>
      {renderInput()}
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
      {type === "multiselect" && maxSelections && (
        <span className="text-sm mt-1">
          Select up to {maxSelections} option{maxSelections !== 1 ? 's' : ''}
        </span>
      )}
    </div>
  );
}

export default FormField;



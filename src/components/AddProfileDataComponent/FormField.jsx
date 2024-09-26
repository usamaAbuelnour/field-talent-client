/* eslint-disable react/prop-types */
function FormField({ label, name, type, value, onChange, options }) {
    return (
      <div className="form-control">
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        {type === "select" ? (
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
        ) : (
          <input
            type={type}
            name={name}
            className={`input input-bordered w-full ${
              type === "file" ? "file-input" : ""
            }`}
            value={type === "file" ? undefined : value}
            onChange={onChange}
            accept={type === "file" ? "image/*" : undefined}
          />
        )}
      </div>
    );
  }
  
  export default FormField;
  
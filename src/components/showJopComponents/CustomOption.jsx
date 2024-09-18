/* eslint-disable react/prop-types */

const CustomOption = (props) => {
  return (
    <div
      {...props.innerProps}
      className={`flex items-center p-2 ${props.isSelected ? 'bg-main text-white' : 'bg-white text-main'}`}
    >
      <input
        type="checkbox"
        checked={props.isSelected}
        readOnly
        className="mr-2"
      />
      <label>{props.data.label}</label>
    </div>
  );
};

export default CustomOption;

import React from "react";

const InputFood = ({placeholder, type,value,onChange}) => {
  return (
    <input
      id="input-food"
      className="w-full h-10 bg-[#292929] text-white px-3 rounded-[12px] outline-none"
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
    />
  );
};

export default InputFood;

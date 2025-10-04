import React, { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { IoChevronDown } from "react-icons/io5";

const Select = ({ city, setCity, handleKeyDown, recent }) => {
  const [showOptions, setShowOptions] = useState(false);
  const optionRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionRef.current && !optionRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={optionRef}
      className="md:w-1/4 relative"
    >
      <div
        className={`flex items-center border border-gray-300 rounded-md px-3 py-2 cursor-pointer  `}
        onClick={() => setShowOptions(!showOptions)}
      >
        <BsSearch className=" mr-2"/>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full outline-none text-sm text-gray-100 bg-transparent capitalize"
        />
        {recent.length>0 && <IoChevronDown className="text-gray-500" />}
      </div>
      {showOptions && (
        <div className="absolute z-50 mt-1 w-full bg-gray-800 text-white border border-gray-500 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {recent?.filter((ele) => ele.toLowerCase().includes(city.toLowerCase())).map((ele, index) => (
            <div
              key={index}
              onClick={() => {
                setCity(ele);
                setShowOptions(false);
              }}
              className="px-4 py-2 hover:bg-blue-500  capitalize cursor-pointer text-sm"
            >
              {ele}
            </div>
          ))}
          {recent?.filter((ele) => ele.toLowerCase().includes(city.toLowerCase())).length === 0 && (
            <div className="px-4 py-2 text-gray-500 text-sm">No recent results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Select;

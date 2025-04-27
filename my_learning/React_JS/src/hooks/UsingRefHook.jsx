import React, { useEffect, useRef } from "react";

const UsingRefHook = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    // inputRef.current.focus();
    inputRef.current.select();
  }, []);

  return (
    <div className=" bg-black text-white ">
      <div className="border-2 border-red-500 p-6 rounded-lg shadow-lg max-w-md mx-auto m-1 ">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          useRef Hook
        </h1>
        <input
          type="text"
          value={"Bhanu Pratap"}
          ref={inputRef}
          className="w-full p-3 text-red-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Type something..."
        />
      </div>
    </div>
  );
};

export default UsingRefHook;

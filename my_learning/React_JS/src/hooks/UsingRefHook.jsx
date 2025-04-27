import React, { useEffect, useRef } from "react";

const UsingRefHook = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    // inputRef.current.focus();
    inputRef.current.select();
  }, []);

  return (
    <div className="border-2 border-red-500 p-6 rounded-lg bg-gray-50 shadow-lg max-w-md mx-auto mt-10">
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
  );
};

export default UsingRefHook;

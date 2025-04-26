import React, { useRef } from "react";

function UncontrolledComponent() {
  const inputRef = useRef(null); // Create a ref to hold the input DOM element

  const handleFocus = () => {
    inputRef.current.select(); // Selects all text in the input field
    console.log(inputRef.current.value);
    alert("text selected and printed in console");
  };

  return (
    <div className="ml-3 mt-3 mb-3 bg-slate-200 px-2 py-2 rounded text-red-500">
      <h1>UnControlledComponent</h1>
      <input
        className="border border-gray-300 p-2 rounded w-full"
        type="text"
        ref={inputRef}
        placeholder="Enter your name"
      />
      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        onClick={handleFocus}
      >
        Select Text
      </button>
    </div>
  );
}

export default UncontrolledComponent;

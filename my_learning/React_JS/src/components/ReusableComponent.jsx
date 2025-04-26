import React from "react";

const ReusableComponent = ({ name, color }) => {
  const colorClass = {
    green: "bg-green-500",
    red: "bg-red-500",
    yellow: "bg-yellow-500",
  };

  return (
    <div>
      <button
        className={`${colorClass[color]} text-white font-bold py-2 px-4 rounded`}
      >
        {name}
      </button>
    </div>
  );
};

export default ReusableComponent;

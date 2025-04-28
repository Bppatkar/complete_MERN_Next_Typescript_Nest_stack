import React from "react";

const ReusableComponent = ({ name, color }) => {
  const colorClass = {
    green: "bg-green-500",
    red: "bg-red-500",
    yellow: "bg-yellow-500",
  };

  return (
    <div className="mt-1.5 mx-auto w-fit">
      <div className="items-center gap-2 w-1/6 ml-14 mt-3 mb-3">
        <button
          className={`${colorClass[color]} text-white font-bold py-2 px-4 rounded`}
        >
          {name}
        </button>
      </div>
    </div>
  );
};

export default ReusableComponent;

import React, { useEffect, useState } from "react";

const UsingEffect = () => {
  const [count, setCount] = useState(0);

  // useEffect(() => {
  //   console.log("useEffect run");
  //   document.title = `You clicked ${count} times`;
  // }, [count]); // Only re-run the effect if count changes

  useEffect(() => {
    console.log("useEffect run");
    document.title = `You clicked ${count} times`;
  }, []); // only run onces when webpage load

  // useEffect(() => {
  //   console.log("useEffect run");
  //   document.title = `You clicked ${count} times`;
  // }); // run on every render

  return (
    <div className=" text-center mt-1.5 w-3xs mx-auto">
      <p>
        You clicked <span className="text-red-500">{count}</span> times
      </p>
      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        onClick={() => setCount(count + 1)}
      >
        Click me
      </button>
    </div>
  );
};

export default UsingEffect;

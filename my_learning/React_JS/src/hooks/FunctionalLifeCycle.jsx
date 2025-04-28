import { useEffect, useRef } from "react";

function FunctionalLifecycle() {
  console.log("Component render");
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      console.log("Component did update");
    } else {
      console.log("Component did mount");
      isMounted.current = true;
    }

    return () => {
      if (isMounted.current) {
        console.log("Component will update (cleanup)");
      } else {
        console.log("Component will unmount");
      }
    };
  }); // No dependency array

  return (
    <div className="bg-black text-white text-center font-bold text-2xl mb-2">
      <h1>Function LifeCycle </h1>
      <div className="bg-slate-600 mt-4 m-2">
        <h2>
          Functional components log the render phase from the function body
        </h2>
        <h2>Class components separate render() from lifecycle methods</h2>
        <h2>
          Both approaches provide equivalent functionality but with different
          syntax
        </h2>
      </div>
      <div className="flex justify-center">
        <img 
          src="./useEffect.jpg" 
          className="w-[400px] h-auto object-contain" 
          alt="useEffect lifecycle"
        />
      </div>
    </div>
  );
}

export default FunctionalLifecycle;

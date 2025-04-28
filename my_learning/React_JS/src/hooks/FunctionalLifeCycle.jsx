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

  return <div className="bg-black text-white text-center font-bold text-2xl mb-2">Functional Component</div>;
}

export default FunctionalLifecycle;

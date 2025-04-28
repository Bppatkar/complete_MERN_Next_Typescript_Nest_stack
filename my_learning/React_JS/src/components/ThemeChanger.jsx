import React from "react";
import UseLocalStorage from "../hooks/custom_hook/UseLocalStorage";

const ThemeChanger = () => {
  const [theme, setTheme] = UseLocalStorage("theme", "dark");
  const [count, setCount] = UseLocalStorage("count", 0);
  const handleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else setTheme("dark");
  };
  const handleCount = () => {
    setCount((c) => c + 1);
  };
  return (
    <div>
      <h1 className="text-2xl font-bold text-center">
        Custome Hook UseLocalStorage
      </h1>
      <h1 className="text-red-500  font-bold text-4xl text-center m-4">
        {theme}
      </h1>
      <button
        className=" bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300 flex mx-auto "
        onClick={handleTheme}
      >
        ThemeChanger
      </button>
      <hr className="my-6 border-gray-600" />
      <h1 className="text-green-500  font-bold text-4xl text-center m-4">{count}</h1>
      <button className=" bg-cyan-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300 flex mx-auto " onClick={handleCount}>Counter</button>
    </div>
  );
};

export default ThemeChanger;

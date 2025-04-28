import { useState } from "react";
import "./App.css";
import Profile from "./components/Profile.jsx";
import Login from "./components/Login.jsx";
// import Profile from "./components/ClassBased.jsx";
import Counter from "./components/Counter.jsx";
import Props from "./components/Props.jsx";
import ControlledComponent from "./components/ControlledComponent.jsx";
import UnControlledComponent from "./components/UnControlledComponent.jsx";
import ReusableComponent from "./components/ReusableComponent.jsx";
import UsingEffect from "./hooks/usingEffect.jsx";
import FetchingAPI from "./hooks/FetchAPI.jsx";
import UsingRefHook from "./hooks/UsingRefHook.jsx";
import UsingMemo from "./hooks/UsingMemo.jsx";
import UsingCallback from "./hooks/UsingCallback.jsx";
import UsingReducer from "./hooks/UsingReducer.jsx";
import DataComponent from "./hooks/custom_hook/DataComponent.jsx";
import FunctionalLifeCycle from "./hooks/FunctionalLifeCycle.jsx";

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  return (
    <div className="bg-black text-white h-screen">
      <h1 className="text-3xl font-bold underline text-blue-600 text-center">
        Bhanu Pratap
      </h1>
      <hr className="border-t border-blue-500 my-4" />

      <Profile />
      <hr className="border-t border-green-500 my-4" />

      <Counter />
      <hr className="border-t border-yellow-500 my-4" />
      
      <Props name="Bhanu" />
      <hr className="border-t border-purple-500 my-4" />

      {isUserLoggedIn ? <Props name="Conditional Rendering" /> : <Login />}
      <hr className="border-t border-pink-500 my-4" />

      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded text-center flex items-center justify-center mx-auto"
        onClick={() => setIsUserLoggedIn(!isUserLoggedIn)}
      >
        Change Component
      </button>
      <hr className="border-t border-red-500 my-4" />

      <ControlledComponent />
      <hr className="border-t border-indigo-500 my-4" />
      
      <UnControlledComponent />
      <hr className="border-t border-teal-500 my-4" />

      <div className="flex gap-2 p-4">
        <ReusableComponent name={"Save"} color={"green"} />
        <ReusableComponent name={"Cancle"} color={"yellow"} />
        <ReusableComponent name={"Delete"} color={"red"} />
      </div>
      <hr className="border-t border-orange-500 my-4" />

      {/* Rest of your components with colored hr lines */}
      <UsingEffect />
      <hr className="border-t border-amber-500 " />

      <FetchingAPI />
      <hr className="border-t border-lime-500 " />

      <UsingRefHook />
      <hr className="border-t border-emerald-500 " />

      <UsingMemo />
      <hr className="border-t border-rose-500 " />

      <UsingCallback />
      <hr className="border-t border-violet-500 " />

      <UsingReducer />
      <hr className="border-t border-fuchsia-500 " />

      <DataComponent url="https://jsonplaceholder.typicode.com/users" />
      <hr className="border-t border-sky-500 " />

      <FunctionalLifeCycle />
      <hr className="border-t border-cyan-500 " />
    </div>
  );
}

export default App;

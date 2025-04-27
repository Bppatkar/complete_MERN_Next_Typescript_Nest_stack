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

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  return (
    <div className="bg-black text-white h-screen">
      <h1 className="text-3xl font-bold underline text-blue-600">
        Bhanu Pratap
      </h1>
      <Profile />
      <br />

      {/* <Profile /> */}
      <Counter />
      <br />
      <Props name="Bhanu" />
      <br />

      {isUserLoggedIn ? <Props name="Conditional Rendering" /> : <Login />}
      <br />

      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsUserLoggedIn(!isUserLoggedIn)}
      >
        Chage Component
      </button>
      <br />

      <ControlledComponent />
      <br />
      <UnControlledComponent />
      <br />
      <ReusableComponent name={"Save"} color={"green"} />
      <ReusableComponent name={"Cancle"} color={"yellow"} />
      <ReusableComponent name={"Delete"} color={"red"} />

      <UsingEffect />
      <br />

      <FetchingAPI />
      <br />

      <UsingRefHook />
    </div>
  );
}

export default App;

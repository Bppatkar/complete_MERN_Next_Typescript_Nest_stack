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

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  return (
    <div className="bg-black text-white h-screen">
      <h1 className="text-3xl font-bold underline text-blue-600">
        Bhanu Pratap
      </h1>
      <Profile />
      <hr align="left" width="100%;" />

      {/* <Profile /> */}
      <Counter />
      <hr align="left" width="100%;" />
      <Props name="Bhanu" />
      <hr align="left" width="100%;" />

      {isUserLoggedIn ? <Props name="Conditional Rendering" /> : <Login />}
      <hr align="left" width="100%;" />

      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsUserLoggedIn(!isUserLoggedIn)}
      >
        Chage Component
      </button>
      <hr align="left" width="100%;" />

      <ControlledComponent />
      <hr align="left" width="100%;" />
      <UnControlledComponent />
      <hr align="left" width="100%;" />
      <ReusableComponent name={"Save"} color={"green"} />
      <ReusableComponent name={"Cancle"} color={"yellow"} />
      <ReusableComponent name={"Delete"} color={"red"} />

      <UsingEffect />
      <hr align="left" width="100%;" />

      <FetchingAPI />
      <hr align="left" width="100%;" />

      <UsingRefHook />
      <hr align="left" width="100%;" />

      <UsingMemo />
      <hr align="left" width="100%;" />

      <UsingCallback />
      <hr align="left" width="100%;" />

      <UsingReducer />
      <hr align="left" width="100%;" />

      <DataComponent url="https://jsonplaceholder.typicode.com/users" />
    </div>
  );
}

export default App;

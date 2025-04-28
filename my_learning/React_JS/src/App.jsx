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
import UsingEffect from "./hooks/UsingEffect.jsx"; // ✅ corrected filename casing
import FetchingAPI from "./hooks/FetchAPI.jsx";
import UsingRefHook from "./hooks/UsingRefHook.jsx";
import UsingMemo from "./hooks/UsingMemo.jsx";
import UsingCallback from "./hooks/UsingCallback.jsx";
import UsingReducer from "./hooks/UsingReducer.jsx";
import DataComponent from "./hooks/custom_hook/DataComponent.jsx";
import FunctionalLifeCycle from "./hooks/FunctionalLifeCycle.jsx";
import ThemeChanger from "./components/ThemeChanger.jsx";
import HigherOrder from "./components/HigherOrder.jsx";

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold underline text-blue-600 text-center mb-8">
        Bhanu Pratap
      </h1>

      {/* All sections inside one grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Profile Section */}
        <CardWrapper>
          <Profile />
        </CardWrapper>

        {/* Counter Section */}
        <CardWrapper>
          <Counter />
        </CardWrapper>

        {/* Props Section */}
        <CardWrapper>
          <Props name="Bhanu" />
        </CardWrapper>

        {/* Conditional Rendering Section */}
        <CardWrapper>
          {isUserLoggedIn ? <Props name="Conditional" /> : <Login />}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded mt-4 w-full"
            onClick={() => setIsUserLoggedIn(!isUserLoggedIn)}
          >
            Toggle Component
          </button>
        </CardWrapper>

        {/* Controlled Form */}
        <CardWrapper>
          <ControlledComponent />
        </CardWrapper>

        {/* UnControlled Form */}
        <CardWrapper>
          <UnControlledComponent />
        </CardWrapper>

        {/* Reusable Buttons */}
        <CardWrapper>
          <div className="flex flex-wrap gap-3">
            <ReusableComponent name={"Save"} color={"green"} />
            <ReusableComponent name={"Cancel"} color={"yellow"} />
            <ReusableComponent name={"Delete"} color={"red"} />
          </div>
        </CardWrapper>

        {/* useEffect Example */}
        <CardWrapper>
          <UsingEffect />
        </CardWrapper>

        {/* Fetching API */}
        <CardWrapper>
          <FetchingAPI />
        </CardWrapper>

        {/* useRef Example */}
        <CardWrapper>
          <UsingRefHook />
        </CardWrapper>

        {/* useMemo Example */}
        <CardWrapper>
          <UsingMemo />
        </CardWrapper>

        {/* useCallback Example */}
        <CardWrapper>
          <UsingCallback />
        </CardWrapper>

        {/* useReducer Example */}
        <CardWrapper>
          <UsingReducer />
        </CardWrapper>

        {/* Custom Hook Example */}
        <CardWrapper>
          <DataComponent url="https://jsonplaceholder.typicode.com/users" />
        </CardWrapper>

        {/* Functional Lifecycle Example */}
        <CardWrapper>
          <FunctionalLifeCycle />
        </CardWrapper>

        {/* Custom Hook Example 2 */}
        <CardWrapper>
          <ThemeChanger />
        </CardWrapper>

        <CardWrapper>
          <HigherOrder />
        </CardWrapper>
      </div>
    </div>
  );
}

// Small reusable CardWrapper component
function CardWrapper({ children }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg  flex flex-col justify-between hover:scale-105 transition-transform duration-300">
      {children}
    </div>
  );
}

export default App;

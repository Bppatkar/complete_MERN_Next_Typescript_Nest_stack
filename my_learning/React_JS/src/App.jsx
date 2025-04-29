import { useState } from "react";
import "./App.css";
import Profile from "./components/Profile.jsx";
// import Profile from "./components/ClassBased.jsx";
import Login from "./components/Login.jsx";
import Counter from "./components/Counter.jsx";
import Props from "./components/Props.jsx";
import ControlledComponent from "./components/ControlledComponent.jsx";
import UnControlledComponent from "./components/UnControlledComponent.jsx";
import ReusableComponent from "./components/ReusableComponent.jsx";
import UsingEffect from "./hooks/UsingEffect.jsx";
import FetchingAPI from "./hooks/FetchAPI.jsx";
import UsingRefHook from "./hooks/UsingRefHook.jsx";
import UsingMemo from "./hooks/UsingMemo.jsx";
import UsingCallback from "./hooks/UsingCallback.jsx";
import UsingReducer from "./hooks/UsingReducer.jsx";
import DataComponent from "./hooks/custom_hook/DataComponent.jsx";
import FunctionalLifeCycle from "./hooks/FunctionalLifeCycle.jsx";
import ThemeChanger from "./components/ThemeChanger.jsx";
import HigherOrder from "./components/HigherOrder.jsx";
import Pages from "./Pages/Pages.jsx";
import Starting from "./context_api/Starting.jsx";
import ReduxLearn from "./react_redux/ReduxLearn.jsx";
import RtkLearning from "./redux_toolkit/RtkLearning.jsx";

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-amber-400">
        Complete React.js By Bhanu Pratap
        <span className="block text-sm font-normal text-gray-400 mt-2">
          All Important Topics/Covered
        </span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Profile Section */}
        <CardWrapper title="Profile Component">
          <Profile />
        </CardWrapper>

        {/* Counter Section */}
        <CardWrapper title="Counter Component">
          <Counter />
        </CardWrapper>

        {/* Props Section */}
        <CardWrapper title="Props Example">
          <Props name="Bhanu" />
        </CardWrapper>

        {/* Conditional Rendering Section */}
        <CardWrapper title="Conditional Rendering">
          {isUserLoggedIn ? <Props name="Conditional" /> : <Login />}
          <button
            className="mt-4 w-full bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded transition-colors"
            onClick={() => setIsUserLoggedIn(!isUserLoggedIn)}
          >
            Toggle Component
          </button>
        </CardWrapper>

        {/* Controlled Form */}
        <CardWrapper title="Controlled Component">
          <ControlledComponent />
        </CardWrapper>

        {/* UnControlled Form */}
        <CardWrapper title="Uncontrolled Component">
          <UnControlledComponent />
        </CardWrapper>

        {/* Reusable Buttons */}
        <CardWrapper title="Reusable Components">
          <div className="flex flex-wrap gap-3 justify-center">
            <ReusableComponent name={"Save"} color={"green"} />
            <ReusableComponent name={"Cancel"} color={"yellow"} />
            <ReusableComponent name={"Delete"} color={"red"} />
          </div>
        </CardWrapper>

        {/* useEffect Example */}
        <CardWrapper title="useEffect Hook">
          <UsingEffect />
        </CardWrapper>

        {/* Fetching API */}
        <CardWrapper title="API Fetching">
          <FetchingAPI />
        </CardWrapper>

        {/* useRef Example */}
        <CardWrapper title="useRef Hook">
          <UsingRefHook />
        </CardWrapper>

        {/* useMemo Example */}
        <CardWrapper title="useMemo Hook">
          <UsingMemo />
        </CardWrapper>

        {/* useCallback Example */}
        <CardWrapper title="useCallback Hook">
          <UsingCallback />
        </CardWrapper>

        {/* useReducer Example */}
        <CardWrapper title="useReducer Hook">
          <UsingReducer />
        </CardWrapper>

        {/* Custom Hook Example */}
        <CardWrapper title="Custom Hook">
          <DataComponent url="https://jsonplaceholder.typicode.com/users" />
        </CardWrapper>

        {/* Functional Lifecycle Example */}
        <CardWrapper title="Functional Lifecycle">
          <FunctionalLifeCycle />
        </CardWrapper>

        {/* Theme Changer */}
        <CardWrapper title="Theme Changer">
          <ThemeChanger />
        </CardWrapper>

        {/* Higher Order Component */}
        <CardWrapper title="Higher Order Component">
          <HigherOrder />
        </CardWrapper>

        {/* React Router DOM */}
        <CardWrapper title="React Router">
          <Pages />
        </CardWrapper>

        {/* Context API */}
        <CardWrapper title="Context API">
          <Starting />
        </CardWrapper>

        {/* React Redux */}
        <CardWrapper title="React_Redux">
          <ReduxLearn />
        </CardWrapper>

        {/* React Redux Toolkit */}
        <CardWrapper title="React_Redux_Toolkit">
          <RtkLearning />
        </CardWrapper>
      </div>
    </div>
  );
}

function CardWrapper({ children, title }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-700">
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-orange-500">{title}</h3>
      )}
      <div className="flex-1">{children}</div>
    </div>
  );
}

export default App;

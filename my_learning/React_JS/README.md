# Topic we are going to cover here is React JS.

    - Virtual DOM
    - what is JSX
    - what is components
    - Component Composition/Decomposition
    - what is states/props
    - React Hooks
    - Custome Hooks
    - React Router
    - Context API
    - Error Boundaries
    - Lazy Loading
    - Redux
    - Redux Toolkit

---

## Lec 1 [React JSX]

    - what is JSX
    - why JSX
    - jsx is not html
    - Embeding javascript in jsx
    - jsx must have one parent element
    - jsx attributes class
    - self closing tags
    - stlying in jsx

```text
    - JSX - JavaScript XML [with the help of jsx, we can create UI in React_JS easily]
    - In JSX, we can write HTML code inside JS [but remember it is not HTML code, it is looking like HTML (because internally React JS using Babel which is a transpiler, to convert JSX to JS) which can understand browser]
    - We can embed JS code inside JSX using {}
    - JSX support only one parent element [<></> "fragement" or in div we can add multiple elements]
    - JSX attribute class is written as className , and JSX use camelCase for attribute name instead of kebab-case for instance :- not "click" use "onClick"
    - JSX supporting self closing tags like <img /> or <input /> or <App/>

```

## Lec 2 [React Components]

```text
    -  Components are the building blocks of React apps. They are reusable pieces of UI that can be composed to create complex user interfaces.
    -  Components are functions that take props (properties) as input and return JSX (or other UI elements) as output.
    -  Components start with a capital letter and are written in PascalCase.

    ### There are two types of components in React:

    - Function-based components: These are simple functions that return JSX.
    - Class-based components: These are classes that extend React.Component and use the render() method to return JSX.


    - we can reuse components by using props and props are passed to components as an object and we can access props in components using this.props in class based components and props in function based Components
```

```text
If there is a constructor() function in your component, this function will be called when the component gets initiated.

The constructor function is where you initiate the component's properties.

In React, component properties should be kept in an object called state.
```

```js
class Car extends React.Component {
  constructor() {
    super();
    this.state = { color: "red" };
  }
  render() {
    return <h2>I am a {this.state.color} Car!</h2>;
  }
}
```

```text
Props : Another way of handling component properties is by using props.
```

```js
//Use an attribute to pass a color to the Car component, and use it in the render() function:
class Car extends React.Component {
  render() {
    return <h2>I am a {this.props.color} Car!</h2>;
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Car color="red" />);
```

```js
// If your component has a constructor function, the props should always be passed to the constructor and also to the React.Component via the super() method.
class Car extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <h2>I am a {this.props.model}!</h2>;
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Car model="Mustang" />);
```

```text
Using the state Object:-Refer to the state object anywhere in the component by using the this.state.propertyname syntax:
```

```js
class Car extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964,
    };
  }
  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
          It is a {this.state.color}
          {this.state.model}
          from {this.state.year}.
        </p>
      </div>
    );
  }
}
```

```text
Changing the state Object:-To change a value in the state object, use the this.setState() method.

When a value in the state object changes, the component will re-render, meaning that the output will change according to the new value(s).
```

```js
class Car extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964,
    };
  }
  changeColor = () => {
    this.setState({ color: "blue" });
  };
  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
          It is a {this.state.color}
          {this.state.model}
          from {this.state.year}.
        </p>
        <button type="button" onClick={this.changeColor}>
          Change color
        </button>
      </div>
    );
  }
}
```

## Lec 3 [Component Composition/Decomposition]

```text
   - In Component Composition we work on Open/Closed Principle (OCP) by combining small, reusable components to form larger, more complex components.

   - In Component Decomposition, we work on Single Responsibility Principle (SRP) by breaking down a complex component into smaller, more manageable components, means that each component is responsible for a specific task or piece of functionality.

   ### In simple words
      - Component Composition: Breaking down a complex component into smaller, more manageable components.
      - Component Decomposition: Building a complex component from smaller, more manageable components.
```

```JS

const Profile =()=>{
  return <div>Profile</div>
}
const About = () => {
  return <div>About</div>
}

const Other = () => {
  return <div>Other</div>
}



const App = () => {
  return (
    <div>
    <Profile/>
    <About/>
    <Other/>
    </div>
  )
}

export default App
```

## Lec 4 [State]

It is a built in object that is used to contain data or information about the component. It is used to store the current state of the component and to update the state of the component.
We can mutate the state by using the setState() method. The setState() method is used to update the state of the component. [it simply means state is mutable in react]

Counter.jsx

```js
// we are using a hook here called useState to create a state variable called count and a function called setCount

const Counter = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    if (count > 0) setCount((prevCount) => prevCount - 1);
  };

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={handleIncrement}>+</button>
      <button onClick={handleDecrement}>-</button>
    </div>
  );
};
```

## Lec 5 [Props]

We use props to pass data from a parent component to a child component. Props are read-only and cannot be modified.
By using Props we can build reusable and dynamic component

```js
const Props = (props) => {
  return <div>{props.name}</div>;
};

const App = () => {
  return (
    <div>
      <Props name="Bhanu" />
    </div>
  );
};
```

## Lec 6 [Conditional Rendering]

Conditional rendering is a technique in React that allows you to render different components based on certain conditions.

```js
const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  return <div>{loggedIn ? <Profile /> : <Login />}</div>;
};
```

## Lec 7 [React Event]

```text
Event handling in React is a way to respond to user interactions with the component. It allows you to handle events such as clicks, key presses, mouse moves, and more.
and in react events are called handlers and they are used to handle events and update the state of the component based on the event. and they written in camelCase like onClick, onSubmit, etc.
```

```js
const Profile = () => {
  const handleClick = () => {
    console.log("Button clicked");
  };
  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
};
```

If you want to pass a parameter to the event handler, so u have to use an callback function, so itreturns the handler with the parameter as an argument.

```js
const Profile = () => {
  const handleClick = (event) => {
    console.log("Button clicked", " ", event);
  };
  return (
    <div>
      <button onClick={() => handleClick("hello")}>Click Me</button>
    </div>
  );
};
```

## Lec 8 [Controlled Components]

Controlled Components: -
Controlled components are form elements (like input, textarea, or select) that are managed by React state. This means that the value of the form element is set and updated through React state, making React the "single source of truth" for the form data.

when to use this Controlled component - when u want to do any proccessing or validation or any type of calculation on the value of the form element and want to update the state of the component based on the value of the form element

```js
function ControlledComponent() {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value.toUpperCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("A name was submitted: " + value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>ControlledComponent</h1>
      <label>
        Name:
        <input
          placeholder="Enter Name"
          type="text"
          value={value}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ControlledComponent;
```

## Lec 9 [Uncontrolled Components]

Uncontrolled Components : -
Uncontrolled components in React manage their own state internally rather than relying on React state. This approach is useful for simple forms where you don't need to manipulate the input data through React state updates.
[in simple words when user fill all inputs in form then we got control over the from means, we dont have control on each and every key press or any event]

when to use this Uncontrolled component - when u dont want to do any proccessing or validation or any type of calculation

```js
import React, { useRef } from "react";

function UncontrolledInput() {
  const inputRef = useRef(null);

  const handleSubmit = () => {
    alert("Input Value: " + inputRef.current.value);
  };

  return (
    <>
      <h1>UncontrolledInput</h1>
      <input type="text" ref={inputRef} placeholder="Enter your name" />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}
```

## Lec 10 [Hooks] (useEffect)

useEffect is a hook in React that allows you to perform side effects in your component, such as fetching data from an API, updating the document title [means DOM manipulation], or subscribing or taking services to a WebSocket connection.

```js
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
    <div>
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
```

## Lec 11 [Fetching API using useEffect]

```js
const [products, setProducts] = useState([]);
const fetchProduct = async () => {
  try {
    const url = "https://fakestoreapi.com/products/";
    const response = await fetch(url);
    const data = await response.json();
    setProducts(data);
  } catch (error) {
    console.warn(error.message);
  }
};

useEffect(() => {
  fetchProduct();
}, []);
```

## Lec 12 [useRef hook]

When you want to play with DOM and and manipulate the DOM the u can use uesRef

useRef is a hook in React that allows you to create a mutable reference to a value in a component. It returns an object with a current property, which can be used to access the value of the reference.

```js
const UsingRefHook = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    // inputRef.current.focus();
    inputRef.current.select();
  }, []);

  return (
    <div className="border-2 border-red-500 p-6 rounded-lg bg-gray-50 shadow-lg max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        useRef Hook
      </h1>
      <input
        type="text"
        value={"Bhanu Pratap"}
        ref={inputRef}
        className="w-full p-3 text-red-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Type something..."
      />
    </div>
  );
};
```

## Lec 13 [useMemo hook]

The `useMemo` hook in React is used to optimize performance by memoizing the `result of a calculation`. It `returns a memoized value` and `only recomputes the value` when one of its dependencies has changed.

- `useMemo` is a valuable tool in the React , which is designed to `optimize performance by memoizing the result` of a calculation or expensive computation.

`when to use useMemo hook` - when u have expensive calculation or expensive computations or data transformations within a functional component that are being unnecessarily recomputed on every render
[because we know , in functional component whenever state and props are getting changed it create re-render of component and that is not good for performance of our webpage , so we use useMemo hook to prevent that unnecessary re-render]

`Benifit of useMemo hoook`

- Avoiding unnecessary re-renders /recalculations
- optimize rendering performance
- enhancing user experience
- efficiently managing derived data

```js
const UsingMemo = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);
  const calculation = expensiveCalc(count);

  const increment = () => {
    setCount((c) => c + 1);
  };

  const addTodo = () => {
    setTodos((t) => [...t, "new todo"]);
  };

  return (
    <div className="bg-black text-white">
      <div className="p-6 bg-black text-white rounded-lg shadow-lg max-w-md mx-auto ">
        <h1 className="text-2xl font-bold text-center mb-6">Using Memo Hook</h1>
        <h4>Open console log</h4>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Todos:</h2>
          {todos.length > 0 ? (
            todos.map((todo, index) => (
              <div key={index} className="text-gray-300 mb-2">
                {todo}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No todos added yet.</p>
          )}
          <button
            onClick={addTodo}
            className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition-colors duration-300 mt-4"
          >
            Add Todo
          </button>
        </div>

        <div className="text-center">
          <p className="text-lg mb-4">
            Count: <span className="font-bold">{count}</span>
          </p>
          <button
            onClick={increment}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
          >
            Increment
          </button>
        </div>
        <hr className="my-6 border-gray-600" />
        <div>
          <h2 className="text-xl font-semibold mb-4 text-center">
            Performing Expensive Calculation
          </h2>
          <p className="text-lg text-center text-green-400">{calculation}</p>
        </div>
      </div>
    </div>
  );
};

// very expensive calculation
const expensiveCalc = (num) => {
  console.log("Performing Expensive Calculation....");
  for (let i = 0; i < 1000000000; i++) {
    num += 1;
  }
  return num;
};
```

In that code there is a problem that is whenever we are calling addTodo function it is re-rendering the component, or that addTodo function is not connected by the count variable or state, and that is not good for performance of our webpage , so we use useMemo hook to prevent that unnecessary re-render

useMemo(()=>{},[]) => useMemo returns a memoized value and only recomputes the value when one of its dependencies has changed.

so we use tha dependencies array for count variable like when that count variable get any change then it will re-render the component not on todo or every time

only adding one line - `useMemo(() => expensiveCalc(count), [count]);`

```js
const UsingMemo = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);
  const calculation = useMemo(() => expensiveCalc(count), [count]);

  const increment = () => {
    setCount((c) => c + 1);
  };

  const addTodo = () => {
    setTodos((t) => [...t, "new todo"]);
  };

  return (
    <div className="bg-black text-white">
      <div className="p-6 bg-black text-white rounded-lg shadow-lg max-w-md mx-auto ">
        <h1 className="text-2xl font-bold text-center mb-6">Using Memo Hook</h1>
        <h4>Open console log</h4>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Todos:</h2>
          {todos.length > 0 ? (
            todos.map((todo, index) => (
              <div key={index} className="text-gray-300 mb-2">
                {todo}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No todos added yet.</p>
          )}
          <button
            onClick={addTodo}
            className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition-colors duration-300 mt-4"
          >
            Add Todo
          </button>
        </div>

        <div className="text-center">
          <p className="text-lg mb-4">
            Count: <span className="font-bold">{count}</span>
          </p>
          <button
            onClick={increment}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
          >
            Increment
          </button>
        </div>
        <hr className="my-6 border-gray-600" />
        <div>
          <h2 className="text-xl font-semibold mb-4 text-center">
            Performing Expensive Calculation
          </h2>
          <p className="text-lg text-center text-green-400">{calculation}</p>
        </div>
      </div>
    </div>
  );
};

// very expensive calculation
const expensiveCalc = (num) => {
  console.log("Performing Expensive Calculation....");
  for (let i = 0; i < 1000000000; i++) {
    num += 1;
  }
  return num;
};
```

## Lec 14 [useCallback hook]

The `useCallback` hook returns a memoized callback function. It helps to prevent unnecessary re-creations of functions when components re-render, especially useful when passing callbacks to child components that rely on referential equality.

```js
function ButtonComponent({ onClick }) {
  return <button onClick={onClick}>Click Me</button>;
}

function ParentComponent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <ButtonComponent onClick={handleClick} />
    </div>
  );
}
```

## Lec 15 [useReducer hook]

const [state, dispatch] = useReducer(reducer, initialArg, init?)

The `useReducer` hook is used for managing complex state logic in React components. It works similar to `useState`, but is more suitable for state that involves multiple sub-values or when the next state depends on the previous one.

```js
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </div>
  );
}
```

One More example

```js
import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "incremented_age": {
      return {
        name: state.name,
        age: state.age + 1,
      };
    }
    case "changed_name": {
      return {
        name: action.nextName,
        age: state.age,
      };
    }
  }
  throw Error("Unknown action: " + action.type);
}

const initialState = { name: "Taylor", age: 42 };

export default function Form() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleButtonClick() {
    dispatch({ type: "incremented_age" });
  }

  function handleInputChange(e) {
    dispatch({
      type: "changed_name",
      nextName: e.target.value,
    });
  }

  return (
    <>
      <input value={state.name} onChange={handleInputChange} />
      <button onClick={handleButtonClick}>Increment age</button>
      <p>
        Hello, {state.name}. You are {state.age}.
      </p>
    </>
  );
}
```

```text
State is read-only. Don’t modify any objects or arrays in state:
```

```js
function reducer(state, action) {
  switch (action.type) {
    case 'incremented_age': {
      // 🚩 Don't mutate an object in state like this:
      state.age = state.age + 1;
      return state;
    }
```

```text
Instead, always return new objects from your reducer:
```

```js
function reducer(state, action) {
  switch (action.type) {
    case 'incremented_age': {
      // ✅ Instead, return a new object
      return {
        ...state,
        age: state.age + 1
      };
    }
```

## Lec 16 [Custom Hook]

Custom hooks are a way to extract and reuse stateful logic in React. They allow you to share logic between components without duplicating code, leading to more readable and maintainable codebases.

```js
import { useState, useEffect } from "react";

function useFetchData(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
      setLoading(false);
    }
    fetchData();
  }, [url]);

  return { data, loading };
}

function DataComponent({ url }) {
  const { data, loading } = useFetchData(url);

  if (loading) return <p>Loading...</p>;
  return <div>Data: {JSON.stringify(data)}</div>;
}
```

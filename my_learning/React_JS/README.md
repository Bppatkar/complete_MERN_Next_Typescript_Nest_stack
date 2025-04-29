![image](https://github.com/user-attachments/assets/c463154f-63cc-4e5a-827c-76254ff97faf)

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

 There are two types of components in React:

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

## Lec 4 [State ]

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

## Lec 5 [Prop ]

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

`useEffect` is one of the most important React Hooks that allows you to perform side effects in functional components. It combines the functionality of multiple class component lifecycle methods into a single API.

## Table of Contents

1.  [Basic Syntax](#basic-syntax)
2.  [Dependency Array](#dependency-array)
3.  [Lifecycle Comparison](#lifecycle-comparison)
4.  [Complete Lifecycle Flow](#lifecycle-flow)
5.  [Cleanup Function](#cleanup-function)
6.  [Common Use Cases](#common-use-cases)
7.  [Best Practices](#best-practices)
8.  [Complete Examples](#complete-examples)

## Basic Syntax <a name="basic-syntax"></a>

The basic syntax of `useEffect` is:

```jsx
useEffect(() => {
  // Side effect code here
  return () => {
    // Cleanup code here (optional)
  };
}, [dependencies]);
```

### Dependency Array <a name="dependency-array"></a>

The behavior changes based on what you pass to the dependency array:

1. Run on every render (no array)

```js
useEffect(() => {
  console.log("Runs after EVERY render");
});
```

2. Run only once on mount (empty array)

```js
useEffect(() => {
  console.log("Runs ONLY on first render");
}, []);
```

3. Run when dependencies change

```js
useEffect(() => {
  console.log("Runs when count changes");
}, [count]);
```

### Lifecycle Comparison <a name="lifecycle-comparison"></a>

Class Component Lifecycle

```js
class LifecycleDemo extends React.Component {
  componentDidMount() {
    console.log("Component did mount");
    // Output when component mounts:
    // "Component render"
    // "Component did mount"
  }

  componentDidUpdate() {
    console.log("Component did update");
    // Output when component updates:
    // "Component render"
    // "Component did update"
  }

  componentWillUnmount() {
    console.log("Component will unmount");
    // Output when component unmounts:
    // "Component will unmount"
  }

  render() {
    console.log("Component render");
    return <div>Class Component</div>;
  }
}
```

Functional Component Equivalent

```js
function FunctionalLifecycle() {
  console.log("Component render");
  // Initial render output:
  // "Component render"
  // "Component did mount" (from useEffect)

  // componentDidMount + componentWillUnmount
  useEffect(() => {
    console.log("Component did mount");
    // This runs after initial render

    return () => {
      console.log("Component will unmount");
      // This runs when component unmounts
    };
  }, []);

  // componentDidUpdate
  useEffect(() => {
    console.log("Component did update");
    // Output on updates:
    // "Component render"
    // "Component did update"
  });

  return <div>Functional Component</div>;
}
```

```js
import { useEffect } from "react";

function FunctionalLifecycle() {
  console.log("Component render");

  // Combined lifecycle useEffect
  useEffect(() => {
    // This block runs for both mount and updates
    console.log("Component did mount/update");

    // Cleanup function - runs before next effect and on unmount
    return () => {
      console.log("Cleanup (runs before update or on unmount)");

      // You can check if this is unmount vs update cleanup
      // using a ref or other method if needed
    };
  }); // No dependency array means it runs on every render

  return <div>Functional Component</div>;
}
```

```text
However, this approach has some important caveats:

1. Mount vs Update Detection: The same effect runs for both mount and updates
2. Unmount Detection: The cleanup runs both before updates AND on unmount
3. Performance: Runs on every render (like componentDidUpdate)

If you need to distinguish between mount/update/unmount in a single useEffect, you can use a ref:
```

```js
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

  return <div>Functional Component</div>;
}
```

```text
Key points about this combined approach:

  - The effect runs after every render (mount and updates)
  - The cleanup runs before the next effect (updates) or on unmount
  - We use a ref to track whether it's the first mount
  - You lose some of the optimization benefits of separate effects

The React team generally recommends using multiple useEffect calls for separate concerns, but this pattern can be useful in some cases where you need tightly coupled lifecycle logic.

For most cases, it's clearer to use separate useEffect hooks as shown in your original example.
```

### Complete Lifecycle Flow <a name="lifecycle-flow"></a>

#### Mounting Phase (Initial Render)

1. Class Component

```text
"Component render"
"Component did mount"
```

2. Functional Component

```text
"Component render"
"Component did mount"
```

#### Updating Phase (State/Props Chane)

1. Class Component

```text
"Component render"
"Component did update"
```

2. Functional Component

```text
"Component render"
"Component did update"
```

#### Unmounting Phase

1. Class Component

```text
"Component will unmount"
```

2. Functional Component

```text
"Component will unmount" (from useEffect cleanup)
```

##### Key Differences:

- Functional components log the render phase from the function body
- Class components separate render() from lifecycle methods
- Both approaches provide equivalent functionality but with different syntax

### Cleanup Function <a name="cleanup-function"></a>

The cleanup function runs:

- Before the component unmounts
- Before re-running the effect (if dependencies change)

```js
useEffect(() => {
  const timer = setInterval(() => {
    console.log("Timer tick");
  }, 1000);

  return () => {
    clearInterval(timer); // Cleanup the timer
  };
}, []);
```

### Common Use Cases <a name="common-use-cases"></a>

1. Data Fetching

```js
useEffect(() => {
  const fetchData = async () => {
    const response = await fetch("/api/data");
    const data = await response.json();
    setData(data);
  };

  fetchData();
}, []); // Empty array = run once on mount
```

2. Event Listeners

```js
useEffect(() => {
  const handleResize = () => {
    setWindowSize(window.innerWidth);
  };

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);
```

3. DOM Manipulation

```js
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]); // Update title when count changes
```

### Best Practices <a name="best-practices"></a>

1. Declare all dependencies - Include all variables used inside the effect in the dependency array
2. Split concerns - Use multiple useEffect hooks for unrelated logic
3. Clean up resources - Always return cleanup functions for subscriptions, timers, etc.
4. Optimize performance - Only include necessary dependencies to avoid unnecessary re-runs
5. Handle async carefully - Either use an async function inside the effect or use .then() syntax

### Complete Examples <a name="complete-examples"></a>

Counter With Document Title Update

```js
import { useState, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Effect ran - count changed");
    document.title = `Count: ${count}`;

    return () => {
      console.log("Cleanup for count change");
    };
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}
```

API Data Fetching Example

```js
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    return () => {
      // Cancel any ongoing requests if component unmounts
    };
  }, [userId]); // Re-run when userId changes

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>No user found</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
}
```

### Conclusion

`useEffect` is a powerful hook that handles side effects in React functional components. By understanding its dependency array and cleanup mechanism, you can effectively manage component lifecycle events, data fetching, subscriptions, and more.

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


```

## Lec 14 [useCallback hook]

when learning useCallback hook one thing keep in mind premetive and non-premetive value
for instance

```js
//premitive
const a = 10;
const b = 20;

console.log(a === b);

const str1 = "abc";
const str2 = "abc";
console.log(str1 === str2);
```

```js
function sumFunc(){
  return (a+b) => a+b;
}

// non-premiive/Reference
const func1 = sumFunc();
const func2 = sumFunc();

console.log(func1(2,2));
console.log(func2(2,2));
console.log(func1 === func2);
```

The `useCallback` hook in React is used to optimize performance by memoizing `callback functions`. It ensures that the same function instance is returned unless its dependencies change. This is particularly useful when passing callbacks to child components that rely on referential equality.

`When to use useCallback`:

- When you have a `function that is being passed as a prop to child components`.
- When the c`hild components rely on` referential equality to `avoid unnecessary re-renders`.

`Benefits of useCallback:`

- Prevents unnecessary re-creation of functions.
- Optimizes rendering performance.
- Ensures referential equality for callback functions.

```js
const UsingCallback = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);

  const increment = () => {
    setCount((c) => c + 1);
  };

  const addTodo = () => {
    setTodos((t) => [...t, "new todo"]);
  };

  return (
    <div className="p-6 bg-gray-800 text-white rounded-lg shadow-lg max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">
        Using Callback Hook
      </h1>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Todos:</h2>
        <Todo todos={todos} addTodo={addTodo} />
      </div>
      <hr className="my-6 border-gray-600" />
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
    </div>
  );
};
```

```js
import { memo } from "react";

const Todos = ({ addtodo, todos }) => {
  console.log("child render");
  return (
    <>
      <h2>Todo</h2>
      {todos.map((todo, index) => {
        return <p key={index}>{todo}</p>;
      })}
      <button onClick={addtodo}>Add</button>
    </>
  );
};

export default memo(Todos);
```

---

## changes

### we use useMemo when we want to memoize a value, and useCallback when we want to memoize a function based on the dependencies array

---

```js
const addTodo = useCallback(() => {
  setTodos((t) => [...t, "new todo"]);
}, [todos]);
```

## Lec 15 [useReducer hook]

const [state, dispatch] = useReducer(reducer, initialArg, init?)

The `useReducer` hook in React is used for managing complex state logic. It is an alternative to useState and is particularly useful when the state depends on the previous state or involves multiple sub-values.

`When to use useReducer:`

- When you have complex state logic.
- When the next state depends on the previous state.
- When you want to centralize state management in a reducer function.

  `Benefits of useReducer:`

- Simplifies state management for complex logic.
- Makes state transitions predictable.
- Encourages separation of concerns by moving logic to a reducer function.
- Useful for managing multiple related state variables.

```js
const initialState = { count: 0, todos: [] };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    case "decrement":
      return { ...state, count: state.count - 1 };
    case "add_todo":
      return {
        ...state,
        todos: [...state.todos, `New Todo ${state.todos.length + 1}`],
      };
    default:
      throw new Error(`Unknown action:  + ${action.type}`);
  }
}

const UsingReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="p-6 bg-gray-800 text-white rounded-lg shadow-lg max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">
        Using Reducer Hook
      </h1>

      {/* Todos Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Todos:</h2>
        {state.todos.length > 0 ? (
          state.todos.map((todo, index) => (
            <div key={index} className="text-gray-300 mb-2">
              {todo}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No todos added yet.</p>
        )}
        <button
          onClick={() => dispatch({ type: "add_todo" })}
          className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition-colors duration-300 mt-4"
        >
          Add Todo
        </button>
      </div>

      <hr className="my-6 border-gray-600" />

      {/* Count Section */}
      <div className="text-center">
        <p className="text-lg mb-4">
          Count: <span className="font-bold">{state.count}</span>
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => dispatch({ type: "increment" })}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
          >
            Increment
          </button>
          <button
            onClick={() => dispatch({ type: "decrement" })}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 transition-colors duration-300"
          >
            Decrement
          </button>
        </div>
      </div>
    </div>
  );
};
```

```text [IMP]
State is read-only. Don’t modify any objects or arrays in state:
Instead, always return new objects from your reducer:
```

```text
### Where to Make Changes:

1. **Initial State**:

   - Define the `initialState` object to include all the state variables you want to manage (e.g., `count` and `todos`).

2. **Reducer Function**:

   - Create a `reducer` function that defines how the state transitions based on the `action.type`.

3. **Dispatching Actions**:

   - Use the `dispatch` function to trigger state transitions by passing an action object (e.g., `{ type: "increment" }`).

4. **UI Updates**:
   - Update the UI to reflect the current state (`state.count` and `state.todos`).

---

### Changes in Code:

- **Todos Section**:

  - Added a button to dispatch the `add_todo` action.
  - Displayed the list of todos from `state.todos`.

- **Count Section**:
  - Added buttons to dispatch the `increment` and `decrement` actions.
  - Displayed the current count from `state.count`.

---

### Summary:

The `useReducer` hook is a powerful tool for managing complex state logic in React. It simplifies state transitions, makes them predictable, and encourages clean code by separating logic into a reducer function. This example demonstrates how to manage both `count` and `todos` using `useReducer`.

```

## Lec 16 [Custom Hook]

Custom hooks are a way to extract and reuse stateful logic in React. They allow you to share logic between components without duplicating code, leading to more readable and maintainable codebases.

Key Points:

- Why Custom Hooks?

* To avoid duplicating logic across multiple components.
* To encapsulate reusable logic in a single place.
  -To make components cleaner and more focused on UI.

- Naming Convention:

* It is a React convention that custom hooks must start with the word use (e.g., useFetchData, useAuth).
* The name should follow camelCase.

How to Create a Custom Hook:

-A custom hook is simply a JavaScript function that uses React hooks (like useState, useEffect, etc.).
-It can return values, objects, or functions to be used in components.

```js
import { useEffect, useState } from "react";

const UseDataFetchByMe = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default UseDataFetchByMe;
```

## Lec 17 [Custom Hook] (useLocalStorage)

```js
import { useState } from "react";

const UseLocalStorage = (key, defaultValue) => {
  const [localStorageValue, setLocalStorageValue] = useState(() => {
    try {
      const val = localStorage.getItem(key);
      if (val) {
        return JSON.parse(val);
      } else {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (error) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
  });

  const setLocalStorage = (valueOrFunc) => {
    let newValue;
    if (typeof valueOrFunc === "function") {
      newValue = valueOrFunc(localStorageValue);
    } else {
      newValue = valueOrFunc;
    }
    localStorage.setItem(key, JSON.stringify(newValue));
    // now mainting the state from value
    setLocalStorageValue(newValue);
  };
  return [localStorageValue, setLocalStorage];
};

export default UseLocalStorage;
```

## Lec 18 [ HOC ] (Higher Order Component)

HOC function takes React Component as an argument and returns with some enhancements.

```text
watch code written inside HigherOrder.jsx file
```

## Lec 19 [ Virtual DOM ]

### What is DOM?

The Document Object Model (DOM) is a programming interface for web documents. It represents the page so that programs can change the document structure, style, and content. The DOM represents the document as nodes and objects, allowing programming languages to interact with the page.

### What Makes DOM Manipulation Slow?

DOM manipulation can be slow because it often involves re-rendering parts of the web page, which can be resource-intensive. Each change to the DOM can cause the browser to re-calculate styles, layout, and repaint, leading to performance bottlenecks, especially with large and complex documents.

### What is Virtual DOM?

The Virtual DOM is a concept where a virtual representation of the UI is kept in memory and synced with the real DOM by a library such as ReactDOM in React. This process is called reconciliation. The Virtual DOM allows React to batch updates and perform efficient diff computations to minimize direct DOM manipulations, enhancing performance.

### How Does Reconciliation Happen?

Reconciliation is the process by which React updates the DOM with the minimum number of changes. When the state of an object changes, React creates a new Virtual DOM tree, compares it with the previous one, and computes the most efficient way to update the real DOM. This diffing algorithm helps in optimizing the update process, making it faster and more efficient.

## Lec 20 [ React Router DOM ]

- npm i react-router-dom

React Router DOM is not part of the core React library. It is a separate library that provides routing capabilities for React applications.
so for that we need to install it. and i am creating pages folder inside src folder
and i am wrapping my Page.jsx file with <BrowserRouter> tag and i am creating my routes inside pages folder

## Lec 21 [ Context API ]

Solving Prop Drilling Problem

![image](https://github.com/user-attachments/assets/2b3025a5-b024-4a4b-8fd5-d54283cf641d)
![image](https://github.com/user-attachments/assets/ee3daf23-0ed0-43ba-9069-81c57c17e337)

### Context API

The Context API is a feature in React that allows you to share state across the entire app (or part of it) without having to pass props down manually at every level. It provides a way to pass data through the component tree without having to pass props down manually at every level.

#### Why Use Context API?

- **Prop Drilling Solution**: It solves the problem of prop drilling, where you need to pass data through many layers of components, even if only a few components need the data.
- **Global State Management**: It allows for better management of global state, making it easier to share data between components without prop drilling.
- **Performance Optimization**: By using context, you can avoid passing unnecessary props to components that don't need them, which can improve performance.

#### Benefits

- **Simplifies State Management**: Makes it easier to manage and share global state across an app.
- **Cleaner Code**: Reduces the need for passing props through multiple layers, leading to cleaner and more maintainable code.
- **Flexibility**: Allows for dynamic updates and easy access to shared data wherever needed.

#### Potential Problems

- **Overuse**: Using context too frequently for local state management can lead to over-engineering and complexity.
- **Performance Concerns**: `Context updates can cause re-renders of all components that consume the context`, affecting performance if not used carefully.
- **Debugging Difficulty**: It can `become challenging to track the flow of data and debug issues if the context is used extensively` in large applications.

Overall, Context API is a powerful tool to manage global state and avoid prop drilling, but it should be used judiciously to avoid potential pitfalls.

#### Steps to use Context API

1. **Create a Context:**

   First, create a new file for your context, e.g., `MyContext.js`.

   ```jsx
   import { createContext, useState } from "react";

   const MyContext = createContext();

   export const MyProvider = ({ children }) => {
     const [state, setState] = useState("Hello, World!");

     return (
       <MyContext.Provider value={{ state, setState }}>
         {children}
       </MyContext.Provider>
     );
   };

   export default MyContext;
   ```

2. **Wrap Your Application:**

   Use the provider component to wrap your application in `index.js` or the main entry file.

   ```jsx
   import React from "react";
   import ReactDOM from "react-dom";
   import App from "./App";
   import { MyProvider } from "./MyContext";

   ReactDOM.render(
     <MyProvider>
       <App />
     </MyProvider>,
     document.getElementById("root")
   );
   ```

3. **Consume the Context:**

   Use the context in any component using the `useContext` hook.

   ```jsx
   import React, { useContext } from "react";
   import MyContext from "./MyContext";

   const MyComponent = () => {
     const { state, setState } = useContext(MyContext);

     return (
       <div>
         <p>{state}</p>
         <button onClick={() => setState("New State!")}>Change State</button>
       </div>
     );
   };

   export default MyComponent;
   ```

With these steps, you can easily manage and share state across your React application using the Context API. This approach helps avoid prop drilling and makes your state management more efficient.

## Lec 22 [ React Redux (State Management Library) ]

State simply means data, so in frontend how we efficiently manage that data so that User experience is good and performance is good.

### What is React Redux?

React Redux is a predictable state management library for JavaScript applications. It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test. At its core, Redux manages your application's state in a single immutable store, making it easier to understand how and why the state changes over time. React Redux provides bindings to seamlessly integrate Redux with your React components.

### Why Use React Redux?

- **Predictable State Management**: Redux enforces a strict unidirectional data flow, making it easier to understand how state changes occur and debug issues.
- **Centralized Store**: A single source of truth (the store) makes it easier to manage the application's state and share it across components without prop drilling.
- **Improved Debugging**: Redux DevTools allows you to track every action dispatched, the resulting state changes, and even time-travel through your application's history.
- **Scalability**: Redux's structured approach makes it easier to manage state in large and complex applications.
- **Testability**: The separation of concerns (actions, reducers, store) makes it easier to write unit tests for different parts of your state management logic.
- **Middleware for Side Effects**: Redux middleware (like Redux Thunk or Redux Saga) provides a clean way to handle asynchronous operations (API calls, etc.) and other side effects.

### How Does React Redux Work?

React Redux follows a unidirectional data flow:

1.  **View (Component) Dispatches an Action**: When a user interacts with a component or when certain events occur, the component dispatches an action. An action is a plain JavaScript object describing what happened.
2.  **Action is Received by Reducer**: The action is sent to the reducer. A reducer is a pure function that takes the current state and an action as arguments and returns a new state. It's important to note that reducers should not modify the existing state; instead, they should return a new state object.
3.  **Store is Updated**: The root reducer (or combined reducers) determines how the state should change based on the action type. The store then updates its state with the new state returned by the reducer.
4.  **Components are Notified**: React Redux connects your React components to the Redux store. When the store's state changes, all connected components are notified and re-render if their props have changed.

### Key Concepts

- **Store**: The single source of truth that holds the entire application state. You can only modify the state by dispatching actions to the store.
- **Actions**: Plain JavaScript objects that describe an event that has occurred in the application. They typically have a `type` property that indicates the type of action being performed and may include other data (payload).
- **Reducers**: Pure functions that specify how the application's state changes in response to an action. They take the previous state and an action as arguments and return a new state. For complex applications, you might have multiple reducers that handle different parts of the state, which are then combined into a single root reducer.
- **Dispatch**: A function provided by the Redux store that is used to send actions to the store. Calling `dispatch(action)` is the only way to trigger a state change.
- **Selectors**: Functions that know how to extract specific pieces of data from the Redux store's state. They are often used with `mapStateToProps` to efficiently select the data a component needs.
- **Middleware**: Functions that sit between the dispatching of an action and the moment it reaches the reducer. Middleware can be used for logging, asynchronous operations, crash reporting, and more.

### Steps to use React Redux

1.  **Install Redux and React Redux:**

    First, install the necessary packages in your React project:

    ```bash
    npm install redux react-redux
    # or
    yarn add redux react-redux
    ```

2.  **Create Actions:**

    Define action types as constants and create action creator functions in a file (e.g., `actions.js`).

    ```javascript
    // actions.js
    export const INCREMENT = "INCREMENT";
    export const DECREMENT = "DECREMENT";

    export const increment = () => {
      return {
        type: INCREMENT,
      };
    };

    export const decrement = () => {
      return {
        type: DECREMENT,
      };
    };
    ```

3.  **Create Reducers:**

    Create reducer functions that handle the state updates based on the actions in a file (e.g., `reducers.js`).

    ```javascript
    // reducers.js
    import { INCREMENT, DECREMENT } from "./actions";

    const initialState = {
      count: 0,
    };

    function counterReducer(state = initialState, action) {
      switch (action.type) {
        case INCREMENT:
          return {
            ...state,
            count: state.count + 1,
          };
        case DECREMENT:
          return {
            ...state,
            count: state.count - 1,
          };
        default:
          return state;
      }
    }

    export default counterReducer;
    ```

4.  **Create the Store:**

    Create the Redux store using the `createStore` function from Redux and your root reducer (e.g., `store.js`). If you have multiple reducers, you'll need to combine them using `combineReducers`.

    ```javascript
    // store.js
    import { createStore } from "redux";
    import counterReducer from "./reducers";

    const store = createStore(counterReducer);

    export default store;
    ```

5.  **Provide the Store to Your Application:**

    Use the `<Provider>` component from `react-redux` to make the Redux store available to all connected components in your application. Wrap your root component in `index.js` or your main entry file.

    ```jsx
    // index.js
    import React from "react";
    import ReactDOM from "react-dom";
    import App from "./App";
    import { Provider } from "react-redux";
    import store from "./store";

    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById("root")
    );
    ```

6.  **Connect Components to the Store:**

    Use the `connect` higher-order component from `react-redux` to connect your React components to the Redux store. `connect` takes two optional arguments: `mapStateToProps` (to map state to component props) and `mapDispatchToProps` (to map action creators to component props).

    ```jsx
    // MyComponent.js
    import React from "react";
    import { connect } from "react-redux";
    import { increment, decrement } from "./actions";

    const MyComponent = ({ count, increment, decrement }) => {
      return (
        <div>
          <p>Count: {count}</p>
          <button onClick={increment}>Increment</button>
          <button onClick={decrement}>Decrement</button>
        </div>
      );
    };

    const mapStateToProps = (state) => {
      return {
        count: state.count,
      };
    };

    const mapDispatchToProps = (dispatch) => {
      return {
        increment: () => dispatch(increment()),
        decrement: () => dispatch(decrement()),
      };
    };

    export default connect(mapStateToProps, mapDispatchToProps)(MyComponent);
    ```

In this example:

- `mapStateToProps` receives the entire Redux store state and returns an object containing the parts of the state that the component needs (in this case, `count`). These are then passed as props to the `MyComponent`.
- `mapDispatchToProps` receives the `dispatch` function and returns an object containing functions that dispatch actions when called (in this case, `increment` and `decrement`). These are also passed as props to the `MyComponent`.

By following these steps, you can integrate React Redux into your application to manage state in a predictable and organized way, solving the prop drilling problem and providing a robust foundation for complex state management.

## Lec 23 [React Redux Toolkit]

State simply means data, so in frontend how we efficiently manage that data so that User experience is good and performance is good.

### What is React Redux Toolkit?

Redux Toolkit is a set of tools that simplifies Redux development. It is the official, opinionated, "batteries-included" toolset for efficient Redux development. It helps to avoid common pitfalls and reduces boilerplate code, making Redux easier to use. Redux Toolkit includes utilities and conventions that are recommended for modern Redux development.

### Why Use React Redux Toolkit?

- **Simplifies Redux Development**: RTK simplifies store setup, reduces boilerplate, and provides helpful utilities.
- **Reduces Boilerplate**: RTK provides functions like `createSlice` and `configureStore` to reduce the amount of code you need to write.
- **Enforces Best Practices**: RTK encourages the use of best practices and helps prevent common mistakes.
- **Includes Essential Addons**: RTK comes with Redux Thunk for handling asynchronous operations and Immer for writing immutable updates with "mutating" syntax.
- **RTK Query for Data Fetching**: RTK includes an optional data fetching and caching solution (RTK Query).

### Key Concepts and Tools

- **`configureStore()`**: A function that simplifies store setup. It sets up good defaults, automatically adds middleware, and enables the Redux DevTools Extension.
- **`createSlice()`**: A function that simplifies the creation of reducers and actions. It lets you define a "slice" of your state and automatically generates the corresponding action creators and action types.
- **`createAsyncThunk()`**: A utility that simplifies creating asynchronous logic (e.g., fetching data) that interacts with the Redux store. It automatically dispatches actions like `pending`, `fulfilled`, and `rejected`.
- **Reducers**: Functions that specify how the application's state changes in response to an action. With RTK's `createSlice`, you can write reducers that appear to "mutate" the state, but RTK uses Immer to handle immutability under the hood.
- **Actions**: Plain JavaScript objects that describe an event that has occurred in the application. RTK's `createSlice` automatically generates action creators for you.
- **Store**: The single source of truth that holds the application's state.
- **Dispatch**: A function provided by the Redux store that is used to send actions to the store.
- **Selectors**: Functions that extract specific pieces of data from the Redux store's state.
- **RTK Query**: A powerful data fetching and caching library built on top of Redux.

### How Does React Redux Toolkit Work?

Redux Toolkit streamlines the standard Redux workflow:

1.  **Component Dispatches Action**: A component dispatches an action (often created by an action creator generated by `createSlice` or `createAsyncThunk`).
2.  **Action попадает в редьюсер**: The action is handled by a reducer function within a slice. RTK allows you to write "mutating" logic, which is then converted into immutable updates.
3.  **Store Updates**: The store updates its state based on the reducer's logic.
4.  **Components are Notified**: React Redux connects components to the store, and they re-render when the relevant parts of the state change.

### Steps to Use React Redux Toolkit

1.  **Install Redux Toolkit and React Redux:**

    ```bash
    npm install @reduxjs/toolkit react-redux
    # or
    yarn add @reduxjs/toolkit react-redux
    ```

2.  **Create a Store with `configureStore()`:**

    ```javascript
    // store.js
    import { configureStore } from "@reduxjs/toolkit";
    import counterReducer from "./counterSlice"; // Import slice reducer

    export const store = configureStore({
      reducer: {
        counter: counterReducer, // Define state slice and reducer
      },
    });
    ```

3.  **Create a Slice with `createSlice()`:**

    ```javascript
    // counterSlice.js
    import { createSlice } from "@reduxjs/toolkit";

    const initialState = {
      value: 0,
    };

    export const counterSlice = createSlice({
      name: "counter",
      initialState,
      reducers: {
        increment: (state) => {
          state.value += 1;
        },
        decrement: (state) => {
          state.value -= 1;
        },
        incrementByAmount: (state, action) => {
          state.value += action.payload;
        },
      },
    });

    export const { increment, decrement, incrementByAmount } =
      counterSlice.actions; // Export actions
    export default counterSlice.reducer; // Export reducer
    ```

4.  **Provide the Store to Your Application:**

    ```jsx
    // index.js
    import React from "react";
    import ReactDOM from "react-dom/client";
    import App from "./App";
    import { Provider } from "react-redux";
    import { store } from "./store"; // Import the store

    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    ```

5.  **Connect Components to the Store:**

    ```jsx
    // MyComponent.js
    import React from "react";
    import { useSelector, useDispatch } from "react-redux";
    import { increment, decrement, incrementByAmount } from "./counterSlice"; // Import actions
    import { useState } from "react";

    const MyComponent = () => {
      const count = useSelector((state) => state.counter.value); // Access state from slice
      const dispatch = useDispatch();
      const [amount, setAmount] = useState(0);

      return (
        <div>
          <p>Count: {count}</p>
          <button onClick={() => dispatch(increment())}>Increment</button>
          <button onClick={() => dispatch(decrement())}>Decrement</button>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
          />
          <button onClick={() => dispatch(incrementByAmount(parseInt(amount)))}>
            Increment by Amount
          </button>
        </div>
      );
    };

    export default MyComponent;
    ```

    **Key Points:**

    - `useSelector` lets you extract data from the Redux store.
    - `useDispatch` returns the store's `dispatch` function, allowing you to dispatch actions.
    - You access state using `state.sliceName.property` (e.g., `state.counter.value`).

Redux Toolkit simplifies Redux development by reducing boilerplate and providing powerful tools for managing state and asynchronous logic. It is the recommended way to use Redux in modern applications.

## Comparison: Context API + useReducer vs. React Redux vs. React Redux Toolkit

| Feature          | Context API + useReducer                                                                                             | React Redux                                                                                                       | React Redux Toolkit                                                                                                    |
| ---------------- | -------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Primary Purpose  | State management within a component tree, avoids prop drilling.                                                      | Global state management, particularly in larger applications.                                                     | Simplifies Redux development, reduces boilerplate, and enforces best practices.                                        |
| Complexity       | Relatively simple for smaller applications.                                                                          | More complex, requires manual setup of store, actions, and reducers.                                              | Simplified setup with `configureStore` and `createSlice`.                                                              |
| Boilerplate      | Low.                                                                                                                 | High, especially for more complex state updates.                                                                  | Low, significantly reduced with utilities like `createSlice`.                                                          |
| State Updates    | Requires writing immutable update logic.                                                                             | Requires manual, immutable state updates.                                                                         | Simplifies immutability with Immer integration (within `createSlice`).                                                 |
| DevTools Support | Requires custom setup.                                                                                               | Requires manual configuration.                                                                                    | Automatic setup with `configureStore`.                                                                                 |
| Asynchronous Ops | Requires manual implementation (e.g., using useEffect).                                                              | Requires middleware (e.g., Redux Thunk or Redux Saga).                                                            | Includes Redux Thunk by default; `createAsyncThunk` simplifies async logic, RTK Query provides powerful data fetching. |
| Performance      | Can lead to unnecessary re-renders if context is not carefully managed.                                              | Optimized for performance by connecting specific components to only the needed parts of the store.                | Optimized by connecting components to only the relevant parts of the state.                                            |
| Scalability      | Suitable for small to medium-sized applications.                                                                     | Designed for large, complex applications.                                                                         | Designed for applications of all sizes, with features that scale well.                                                 |
| Learning Curve   | Lower.                                                                                                               | Steeper.                                                                                                          | Lower than traditional Redux.                                                                                          |
| Core Concepts    | Context, provider, consumer, `useReducer`                                                                            | Store, actions, reducers, dispatch, selectors, middleware.                                                        | Store, actions, reducers, dispatch, selectors, middleware.                                                             |
| When to Use      | - Avoid prop drilling. <br> - Manage simple global state. <br> - When performance of re-renders is strictly managed. | - Manage complex application state. <br> - Ensure predictable state updates. <br> - Work with large applications. | - All Redux use cases. <br> - Simplify Redux development. <br> - For new projects.                                     |

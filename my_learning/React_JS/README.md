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

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

````text
    -  Components are the building blocks of React apps. They are reusable pieces of UI that can be composed to create complex user interfaces.
    -  Components are functions that take props (properties) as input and return JSX (or other UI elements) as output.
    -  Components start with a capital letter and are written in PascalCase.

    ### There are two types of components in React:

    - Function-based components: These are simple functions that return JSX.
    - Class-based components: These are classes that extend React.Component and use the render() method to return JSX.


    - we can reuse components by using props and props are passed to components as an object and we can access props in components using this.props in class based components and props in function based Components
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


## Lec 4

````

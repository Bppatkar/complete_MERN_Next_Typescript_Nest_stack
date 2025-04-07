//! What is Express.js
// Express js is a minimal and flexible web application framework for nodejs
// it provide a robust set of features for building single-page, multiple-page, and hybrid web applications.
// Express js simplifies server-side coding by providing a layer of fundamental web application features.

//! **Need of Express.js**

//Express.js Simplifies Server Creation**: Helps in quickly setting up and running a web server without the need for complex coding.
//?Routing Management**: Provides a powerful routing mechanism to handle URLs and HTTP methods effectively.
//Middleware Support**: Allows the use of middleware to handle requests, responses, and any middle operations, making code modular and maintainable.
//?API Development**: Facilitates easy and efficient creation of RESTful APIs.
//Community and Plugins**: Has a large ecosystem with numerous plugins and extensions, accelerating development time.

//! Installing Express js and creating a server
// npm init --> npm i express

//? now we are using express and creating a server
/* const express = require("express");
const app = express();

let PORT = 3000;

app.listen(3000, () => {
  console.log(`server is running at port http://localhost:${PORT}`);
}); */

//! All about Middleware

//? Middleware is a function that has access to the request object (req), the response object (res), and the next middleware function in the application's request-response cycle.
// Middleware functions are typically used to perform tasks such as authentication, logging, error handling, and more.
//? Middleware functions are executed in the order they are registered in the application's request-response cycle.
// Middleware functions can modify the request and response objects, and can also pass control to the next middleware function in the chain.
//? Middleware functions are often used to handle common tasks such as authentication, logging, and error handling.

//* we use middleware in express js by using app.use() method
//? app.use() method is used to register middleware functions with the Express application.

/* const express = require("express");
const app = express();

let PORT = 3000;

app.listen(3000, () => {
  console.log(`server is running at port http://localhost:${PORT}`);
});

app.use((req,res, next)=>{console.log("First middleware",req.url, req.method); next();})
// if we don't use next(), second middleware will not work
app.use((req,res, next)=>{console.log("second middleware",req.url, req.method); }) */

//! Sending a response
/* 
const express = require("express");
const app = express();

let PORT = 3000;

app.listen(3000, () => {
  console.log(`server is running at port http://localhost:${PORT}`);
});

app.use((req,res, next)=>{console.log("First middleware",req.url, req.method); next();})

app.use((req,res, next)=>{console.log("Second middleware",req.url, req.method); res.send('<p>Sending a response from middleware</p>'); })
 */

//! Handling Routes

//* 1) Order matches
//* 2) Can not call next() after send()
//* 3) "/" matches all routes [matches everything]
//* 4) Calling res.send will end the request-response cycle means res.send implicitly calls res.end();

// app.use([path,]callback[,callback...]);
// arguments: by default '/' is path and callback is a function for instance
// with "/"
/*  app.use("/about", (req, res) => {
  res.send("<h1>About Page</h1>");
  }); */
// --------------------------------------------------------------
/* const express = require("express");
const app = express();

let PORT = 3000;

app.listen(3000, () => {
  console.log(`server is running at port http://localhost:${PORT}`);
});

// ✅ Corrected middleware and routes (should be defined BEFORE app.listen)
app.use((req, res, next) => {
  console.log("First middleware", req.url, req.method);
  next(); // Call next() BEFORE sending a response
});

// Home route - use app.get() instead of app.use() for specific routes
app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
  // ⚠️ Never call next() after res.send()
});

//* // ⚠️ WARNING: This is BAD PRACTICE (but technically works in some cases)
//* // Using "about" without a leading slash means:
//* // - It will match "/aboutabout" (path contains "about")
//* // - It will NOT match "/about" or "/about/" (unexpected behavior!)
//* // - This is confusing and should be avoided!
//* app.use("about", (req, res) => {
//*   res.send("<h1>About Page (Flawed Implementation)</h1>");
//* });

// ✅ CORRECT WAY: Always use leading slashes in Express paths
// - Matches EXACTLY "/about" and "/about/" (Express normalizes trailing slashes)
// - Does NOT match "/about123" or other variations
// - This is the standard Express routing behavior
app.use("/about", (req, res) => {
  res.send("<h1>About Page (Correct Implementation)</h1>");
});
 */

//! Correct version of code
/* const express = require("express");  
const app = express();

// Use const since PORT shouldn't change
const PORT = 3000;

// 1️⃣ General middleware - runs for all requests
app.use((req, res, next) => {
  console.log("Middleware:", req.method, req.url);
  next(); // Important to call next() to continue processing
});

// 2️⃣ Home route - proper GET handler
app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
  // Never call next() after sending response
});

// 3️⃣ Correct about route - proper GET handler
app.get("/about", (req, res) => {
  res.send("<h1>About Page</h1>");
});

// 4️⃣ Error handling middleware (should be last)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start server AFTER all routes are configured
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
}); */

//! Small Project [form input and print response from body]
//* get data from body using body parser [app.use(express.urlencoded({ extended: true }));]

/* const express = require("express");
const app = express();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  res.send(`
    <form action="/contact" method="POST">
      <input type="text" name="username" placeholder="username">
      <input type="gmail" name="gmail" placeholder="gmail">
      <button type="submit">Submit</button>
    </form>
    `);
});

app.post("/contact", (req, res) => {
  const { username, gmail } = req.body;
  // console.log(req.body); // we get undefined because data is not /parsed

  res.send(`
    <h1>Form Submitted Successfully!</h1>
    <h2>Submitted Data:</h2>
    <p>Username: ${username}</p>
    <p>Email: ${gmail}</p>
    <a href="/">Back to Form</a>
  `);
});

const PORT = 3000;
app.listen(3000, () => {
  console.log(`server is running at port http://localhost:${PORT}`);
}); */

//! Express Routing
//* you have to create separate "Routes folder" and put all the route in that folder

/* // ==========================================
// This is a combined version demonstrating how
// the code would work if split into two files:
// app.js and userRouter.js
// ==========================================

const express = require("express");
const app = express();

// ==========================================
// This section represents what would be in userRouter.js
// ==========================================
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  console.log("Home page accessed", req.url, req.method);
  res.send(`
    <h2>Welcome to Home Page</h2>
    <a href="/contact">Go to Contact Page</a>
  `);
});

userRouter.get("/contact", (req, res) => {
  console.log("Contact page accessed", req.url, req.method);
  res.send(`
    <h2>Contact Page</h2>
    <a href="/">Back to Home</a>
  `);
});

// ==========================================
// This section represents what would be in app.js
// ==========================================
// Normally you would import the router like this:
// const userRouter = require("./userRouter");

// Use the router
app.use("/", userRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); */

//! Handling 404 page
// app.use middleware use for every page because it is using .use so we put 404 page in app.use middleware

/* app.use((req, res,next) => {
res.status(404).send("<h1>404 Page Not Found</h1>"
}) */

//! common paths

/* // common paths
router.get("/about-us", (req, res) => {
  res.send("<h1>About Us</h1>");
});

router.get("/contact-us", (req, res) => {
  res.send("<h1>Contact Us</h1>");
});

// common paths is like [/api/v1/users] so we put that path somewhere else so that we can use it in other routes

app.use("/api/v1/users", router);
// it become [/api/v1/users/about-us] and [/api/v1/users/contact-us]
 */

//! Views folder [serving HTML files]
// we have to create a views folder and put all the html file in that folder [we are writing html file in res.send previously to solved that problem we put html file in views folder]

// i have created that views folder and one home.html file and i am using that file in res.send let's see how
//* we use res.sendFile method for that we have to use core module
// const path = require("path");

/* app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/home.html");
  }); */

/* const express = require("express");
const path = require("path");
const app = express();

app.get("/", (req, res) => {
  // console.log("Directory Name", __dirname);
  console.log("Complete Path", __dirname, "/views/home.html");
  res.sendFile(__dirname + "/views/home.html");
});

app.listen(3000, () => {
  console.log("server is running at port http://localhost:3000");
}); */

//? if it is in diff folder than we can write like this and use res.sendFile because we are sending html file instead res.send
// res.sendFile(path.join(__dirname, "../", "views", "home.html"));

//* why we use path.join in express js
// path.join is used to create a full path to a file or directory
// it takes multiple arguments and joins them together with the appropriate directory separator for the current operating system
// it is more efficient and less error-prone than using string concatenation to build file paths
//? example
/* const filePath = path.join(__dirname, "views", "home.html");
console.log( "filepath is: ",filePath); // output: /Users/username/project/views/home.html */

//! Different between path file
// console.log("Complete Path", __dirname, "/views/home.html");
// const filePath = path.join(__dirname, "views", "home.html");

//* they both are giving same result then which one we can use
//? The first version is just for display/debugging, while the second version creates an actual usable filesystem path that will work correctly in your application.

// means path.join version is correctly to use in our application.

//! File Helper
//* [alternative methods of path where we write path in a const variable and we can use it anywhere in our code]
//? creating a utils folder and  simple html file

/* // core module
const path = require("path");
module.exports = path.dirname(require.main.filename);

// local module
const rootDir = require("../Express_js");

userRouter.get("/", (req, res, next) => {
  console.log("File Helper", req.url, req.method);
  res.sendFile(path.join(rootDir, "utils", "simple.html"));
});
 */

//! Serving Static Files
//* if we want to add css or image or any pdf so we have to put that in "public" folder , because without public folder we cant access that static files ok
//? we are putting files in public because we clearing our intent that public folder is accessible from outside [by-default nothing is accessible from outside but we are making public by putting in public folder]
//* and for that we have to use one middleware called -"express.static"----------- "[app.use(express.static("public"));]"
//? for more details - [https://www.geeksforgeeks.org/express-js-express-static-function/]

//! Dynamic UI using EJS (Embedded JavaScript)
//* Learn more -[https://medium.com/@adarshahelvar/using-ejs-embedded-javascript-as-a-template-engine-in-node-j-8b54ac30539b]
//[like instagram or gmail - every user has diff UI](this is called dynamic UI)
// EJS stands for Embedded JavaScript. It enables the use of JavaScript to generate dynamic HTML on the server-side.
//? we have to install ejs package by "npm i ejs"
//? and we have to use these two line
//* app.set("view engine", "ejs"); // this will search ejs file automatically
//* app.set("folderName", "pathOfFolder");

//* creating index.ejs file [i am creating it in views folder as per doc link]
//TODO [code i have written below is from doc link and i tried to put all things in single ejs file so it become easy to understand , only partial folder i have to made because of from.ejs, and partial folder is use for common things like header and footer , means which things we are using multiple times and on multiple pages like utils folder]

/*  const express = require('express');
const app = express();
const path = require('path');

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Sample data
const products = [
  { id: 1, name: 'Laptop', price: 999.99, inStock: true },
  { id: 2, name: 'Smartphone', price: 699.99, inStock: false },
  { id: 3, name: 'Headphones', price: 149.99, inStock: true }
];

// Routes
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'EJS Complete Example',
    user: { name: 'John Doe', isAdmin: true },
    products,
    currentDate: new Date()
  });
});

// Add this route before app.listen()
app.post('/submit', (req, res) => {
  console.log('Form submitted:', req.body);
  // Process form data here
  res.redirect('/'); // Redirect back to home after submission
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
 
 */

//!  MVC [Modal View Controller]

//* model - represent data [manages the data and business logic]
//* view - display data [handles the display and presentation of data]
//* controller - handle data [processes user input, interacts with the modal , and update the view accordingly]
//? Routes are a part of controllers.

//?[ mvc simply means - we divide our responsibility into 3 parts because we don't want messy code so we put logic in controller and view in view folder and model in model folder]

/* 
const express = require("express");
const app = express();
const PORT = 3000;
const fs = require("fs");
const path = require("path");

//! MIDDLEWARE to parse form data
app.use(express.urlencoded({ extended: true }));

//! ===== MODEL =====
//* In real apps, you'd connect to DB here. We're using simple JS array
const users = [];

//! ===== CONTROLLER FUNCTIONS =====
//* Handles logic for routes

// Home page controller
const getHome = (req, res) => {
  res.send(`
    <h1>Home Page</h1>
    <a href="/users">View Users</a><br/>
    <a href="/add-user">Add New User</a>
  `);
};

// Display all users
const getUsers = (req, res) => {
  let html = `<h1>All Users</h1><ul>`;
  users.forEach((user, index) => {
    html += `<li>${index + 1}) ${user.name} (${user.email})</li>`;
  });
  html += `</ul><a href="/">Back to Home</a>`;
  res.send(html);
};

// Render Add User Form
const getAddUserForm = (req, res) => {
  res.send(`
    <h1>Add New User</h1>
    <form method="POST" action="/add-user">
      <input type="text" name="name" placeholder="Name" required />
      <input type="email" name="email" placeholder="Email" required />
      <button type="submit">Add User</button>
    </form>
    <a href="/">Back to Home</a>
  `);
};

// Handle form submission
const postAddUser = (req, res) => {
  const { name, email } = req.body;
  users.push({ name, email });
  res.redirect("/users");
};

// Read file from users.txt
const getUsersFromFile = (req, res) => {
  const filePath = path.join(__dirname, "users.txt");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("<h1>Error reading file</h1>");
    } else {
      res.send(`<h1>Users from File</h1><ul>${data.split("\n").map((line) => `<li>${line}</li>`).join("")}</ul><a href="/">Back to Home</a>`);
    }
  });
};

// Create new file with user data
const postCreateFile = (req, res) => {
  const { name, email } = req.body;
  const filePath = path.join(__dirname, "users.txt");
  fs.appendFile(filePath, `${name} (${email})\n`, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("<h1>Error creating file</h1>");
    } else {
      res.redirect("/users-from-file");
    }
  });
};

//! ===== ROUTES (Controller ↔️ View) =====
app.get("/", getHome);
app.get("/users", getUsers);
app.get("/add-user", getAddUserForm);
app.post("/add-user", postAddUser);
app.get("/users-from-file", getUsersFromFile);
app.post("/create-file", postCreateFile);

//! ===== 404 Handler =====
app.use((req, res) => {
  res.status(404).send("<h1>404 - Page Not Found</h1><a href='/'>Go Home</a>");
});

//! ===== SERVER START =====
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
 */

//! Dynamic Path
//? Path parameters:-  
// are variables embedded directly in the URL path to capture dynamic values, like /users/:userId where userId is replaced with the actual value when the route is accessed.

//? Query parameters:- 
//  are key-value pairs appended to the URL after the question mark [?], used to send additional information like /search?query=nodejs. where query=nodejs specifies the search term.

/* 
app.get("/:id", (req, res) => {
  const id = req.params.id;
  res.send(`<h1>Dynamic Path: ${id}</h1>`);
}); */

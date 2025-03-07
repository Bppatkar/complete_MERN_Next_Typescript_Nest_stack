import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

  const [fullName, setfullName] = useState(""); // For Registration
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [todos, setTodos] = useState([]);
  const [todoName, setTodoName] = useState("");
  const [todoDesc, setTodoDesc] = useState("");

  // Fetch todos after login
  useEffect(() => {
    if (user) {
      fetch("http://localhost:8000/api/v1/todo", { credentials: "include" })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setTodos(data.todos);
        })
        .catch(() => toast.error("Failed to fetch todos"));
    }
  }, [user]);

  // Register function
  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Registered successfully! Please login.");
        setfullName(""); // ✅ Clear input
        setEmail(""); // ✅ Clear input
        setPassword(""); // ✅ Clear input
        setIsRegistering(false);
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Registration failed!");
    }
  };

  // Login function
  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        toast.success("Logged in successfully!");
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Login failed!");
    }
  };

  // Logout function
  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/user/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        setUser(null);
        toast.success("Logged out successfully!");
      } else {
        toast.error("Logout failed!");
      }
    } catch {
      toast.error("Logout request failed!");
    }
  };

  // Add Todo function
  const addTodo = async () => {
    if (!todoName.trim() || !todoDesc.trim()) {
      toast.error("Todo name and description required!");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/v1/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name: todoName, description: todoDesc }),
      });

      const data = await res.json();
      if (res.ok) {
        setTodos([...todos, data.todo]);
        toast.success("Todo added!");
        setTodoName("");
        setTodoDesc("");
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Failed to add todo!");
    }
  };

  return (
    <div className="p-5">
      <Toaster />

      {user && (
        <div>
          <button onClick={handleLogout} style={{ float: "right" }}>
            Logout
          </button>
        </div>
      )}

      {!user ? (
        <div>
          {isRegistering ? (
            <>
              <h2>Register</h2>
              <input
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setfullName(e.target.value)}
              />
              <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleRegister}>Register</button>
              <p>
                Already have an account?{" "}
                <span
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={() => setIsRegistering(false)}
                >
                  Login here
                </span>
              </p>
            </>
          ) : (
            <>
              <h2>Login</h2>
              <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleLogin}>Login</button>
              <p>
                Don't have an account?{" "}
                <span
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={() => setIsRegistering(true)}
                >
                  Register here
                </span>
              </p>
            </>
          )}
        </div>
      ) : (
        <div>
          <h2>Welcome, {user.fullName}</h2>

          <h3>Add Todo</h3>
          <input
            placeholder="Todo Name"
            value={todoName}
            onChange={(e) => setTodoName(e.target.value)}
          />
          <input
            placeholder="Description"
            value={todoDesc}
            onChange={(e) => setTodoDesc(e.target.value)}
          />
          <button onClick={addTodo}>Add Todo</button>

          <h3>Todos</h3>
          <ul>
            {todos.map((todo) => (
              <li key={todo._id}>
                {todo.name} - {todo.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

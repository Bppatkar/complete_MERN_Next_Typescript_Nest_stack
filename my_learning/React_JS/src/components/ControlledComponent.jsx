import React, { useState } from "react";

function ControlledComponent() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setValue(value);
    if (!value.includes("@")) {
      setError("Please enter valid email");
    } else {
      setError("");
    }
  };

  return (
    <div className="ml-3 mt-3 bg-slate-200 px-2 py-2 rounded text-red-500">
      <h1>ControlledComponent</h1>
      <form>
        <input
          type="email"
          placeholder="Enter Email"
          value={value}
          onChange={handleEmailChange}
          className="border border-gray-300 p-2 rounded w-full"
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
}

// function ControlledComponent() {
//   const [value, setValue] = useState("");

//   const handleChange = (event) => {
//     setValue(event.target.value.toUpperCase());
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     alert("A name was submitted: " + value);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Name:
//         <input
//           placeholder="Enter Name"
//           type="text"
//           value={value}
//           onChange={handleChange}
//         />
//       </label>
//       <button type="submit">Submit</button>
//     </form>
//   );
// }

export default ControlledComponent;

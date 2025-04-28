import React from "react";

// const Profile = () => {
//   return <div>Profile</div>;
// };

const Profile = () => {
  const [eventText, setEventText] = React.useState("bhanu");

  const handleClick = (event) => {
    setEventText((prev) =>
      prev === "bhanu" ? `event coming ${event}` : "bhanu"
    );
  };

  return (
    <div className=" text-center mt-1.5">
      <h1>{eventText}</h1>
      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        onClick={() => handleClick("eventComing")}
      >
        Click Me
      </button>
    </div>
  );
};
export default Profile;

import React from "react";
import UseDataFetchByMe from "./UseDataFetchByMe";

const DataComponent = ({ url }) => {
  const { data, loading, error } = UseDataFetchByMe(url);

  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No data available</p>;

  const userData = Array.isArray(data) ? data[0] : data;

  return (
    <div className="bg-black text-white">
      <div className="data-container">
        <h1 className="data-title">Using Custom Hook</h1>
        <h2 className="data-section-title">User Information:</h2>
        <div>
          <p>
            <span className="data-key">Name:</span>{" "}
            <span className="data-value">{userData.name}</span>
          </p>
          <p>
            <span className="data-key">Username:</span>{" "}
            <span className="data-value">{userData.username}</span>
          </p>
          <p>
            <span className="data-key">Email:</span>{" "}
            <span className="data-value">{userData.email}</span>
          </p>
          <p>
            <span className="data-key">Phone:</span>{" "}
            <span className="data-value">{userData.phone}</span>
          </p>
          <p>
            <span className="data-key">Website:</span>{" "}
            <span className="data-value">{userData.website}</span>
          </p>
        </div>

        <div className="data-subsection">
          <h3 className="data-subsection-title">Address:</h3>
          {userData.address && (
            <p className="data-subsection-content">
              {userData.address.street}, {userData.address.suite}, {userData.address.city},{" "}
              {userData.address.zipcode}
            </p>
          )}
        </div>

        <div className="data-subsection">
          <h3 className="data-subsection-title">Company:</h3>
          {userData.company && (
            <div>
              <p className="data-subsection-content">{userData.company.name}</p>
              <p className="data-subsection-content">
                {userData.company.catchPhrase}
              </p>
              <p className="data-subsection-content">{userData.company.bs}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataComponent;

/* 
Explanation:
JSON.stringify:

Converts a JavaScript object or value (data in this case) into a JSON string.
This is useful for displaying objects or arrays as readable text.


Parameters:

data: The object or value to be converted into a JSON string.
null: A replacer function or array. Passing null means no filtering is applied, and all properties are included.
2: The number of spaces used for indentation in the resulting JSON string. This makes the output more readable (pretty-printed).


Purpose:

It formats the data object into a human-readable JSON string with proper indentation.
The result is displayed inside the <pre> tag, which preserves the formatting.
*/

/* 
Example 

if data is

{
  name: "John",
  age: 30,
  hobbies: ["reading", "coding"]
}


then JSON.stringify(data, null, 2) will return:

{
  "name": "John",
  "age": 30,
  "hobbies": [
    "reading",
    "coding"
  ]
}
*/

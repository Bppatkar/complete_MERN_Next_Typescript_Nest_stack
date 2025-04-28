import React, { useState } from "react";
const withClickTracking = (WrappedComponent) => {
  return (props) => {
    const handleClick = () => {
      props.onClick(props.trackingInfo);
    };
    return (
      <div
        onClick={handleClick}
        className="cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99]"
      >
        <WrappedComponent {...props} />
      </div>
    );
  };
};

const ButtonClick = (props) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-32">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        {props.label}
      </h3>
      <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors">
        Click Me
      </button>
    </div>
  );
};

const ButtonWithClickTracking = withClickTracking(ButtonClick);

const HigherOrder = () => {
  const [clickHistory, setClickHistory] = useState([]);

  const handleButtonClick = (info) => {
    setClickHistory([
      ...clickHistory,
      {
        id: Date.now(),
        message: info,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  };

  return (
    <div className="max-w-6xl mx-auto flex gap-8">
      {/* Left Column - Buttons */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-white mb-6">
          Higher Order Component
        </h1>
        <h3 className="text-xl font-medium text-white mb-4">Buttons:</h3>

        <div className="flex flex-wrap gap-6">
          <ButtonWithClickTracking
            label="Primary Action"
            trackingInfo="Primary button clicked"
            onClick={handleButtonClick}
          />
          <ButtonWithClickTracking
            label="Secondary Action"
            trackingInfo="Secondary button clicked"
            onClick={handleButtonClick}
          />
        </div>
      </div>

      {/* Right Column - Results */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Click Tracking Results
        </h2>
        {clickHistory.length === 0 ? (
          <p className="text-gray-500 italic">
            No clicks yet. Click the buttons to see tracking results.
          </p>
        ) : (
          <ul className="space-y-3">
            {clickHistory.map((click) => (
              <li
                key={click.id}
                className="p-3 bg-gray-50 rounded-md border border-gray-200"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">
                    {click.message}
                  </span>
                  <span className="text-sm text-gray-500">
                    {click.timestamp}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HigherOrder;

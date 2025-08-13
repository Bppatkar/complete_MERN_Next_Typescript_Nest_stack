import React, { useEffect, useState } from 'react';

const Clock = ({color}) => {
  const [time, setTime] = useState(null);

  useEffect(() => {
    let intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  });

  return (
    <>
      <h1> Clock Timer</h1>
      <h2>Current Time is : <span style={{ color: `${color}` }}>{time}</span></h2>
    </>
  );
};

export default Clock;

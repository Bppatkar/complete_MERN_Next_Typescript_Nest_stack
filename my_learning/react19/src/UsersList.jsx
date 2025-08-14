import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import UserData from './UserData.json';

const UsersList = () => {
  const navigate = useNavigate();
  const users = UserData.UserData;

  return (
    <>
      <ul>
        {users.map((user) => {
          return (
            <li key={user.id}>
              <p>Name: {user.name}</p>
              <p>Age: {user.age}</p>
              <p>Gender: {user.gender}</p>
              <button onClick={() => navigate('/edit/' + user.id)}>Edit</button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default UsersList;

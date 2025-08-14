import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserData from './UserData.json';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const foundUser = UserData.UserData.find((u) => u.id === parseInt(id));
    if (foundUser) setUser({ ...foundUser });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User to be updated:', user);
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value) : value,
    }));
  };

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Updating User : {id} </h3>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Age:
        <input
          type="number"
          name="age"
          value={user.age}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Gender:
        <input
          type="text"
          name="gender"
          value={user.gender}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Update</button>
    </form>
  );
};

export default EditUser;

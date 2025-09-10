import db from '../db/db.js';

//! creating table
async function createUsersTable() {
  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  )
  `;

  try {
    await db(createTableQuery);
    console.log('Users table created successfully');
  } catch (error) {
    console.log('Error while creating users table', error);
  }
}

//! inserting data in that table
async function insertUser(username, email) {
  const insertUserQuery = `
  INSERT INTO users (username, email)
  VALUES ($1, $2) 
  RETURNING *
  `;
  try {
    const res = await db(insertUserQuery, [username, email]);
    console.log('User inserted successfully', res.rows[0]);

    return res.rows[0];
  } catch (error) {
    console.log('Error while creating users table', error);
  }
}

//! getting data from data to ensure , inserted data is working fine or not
async function fetchAllUsers() {
  const getAllUsersFromUsersTable = 'SELECT * FROM users';
  try {
    const res = await db(getAllUsersFromUsersTable);
    console.log('Fetched all users', res);
    return res.rows;
  } catch (error) {
    console.log('Error', error);
  }
}

//!  trying to modify inserted data in table
// update --> bhanu@gmail.com to bhanuPratap@gmail.com where user name is Bhanu Pratap
async function updateUserInfo(username, newEmail) {
  const updateUserQuery = `UPDATE users
  SET email = $2
  WHERE username = $1
  RETURNING *`;

  try {
    const res = await db(updateUserQuery, [username, newEmail]);

    if (res.rows.length > 0) {
      console.log('User Updated Successfully', res.rows[0]);
      return res.rows[0];
    } else {
      console.log('No user found with given username');
      return null;
    }
  } catch (error) {
    console.log('Error while updating users table', error);
  }
}

//! trying to delete data from table
async function deleteInfo(username) {
  const deleteQuery = `
 DELETE FROM users
 WHERE username = $1
 RETURNING *
 `;

  try {
    const res = await db(deleteQuery, [username]);

    if (res.rows.length > 0) {
      console.log('User deleted successfully!', res.rows[0]);
      return res.rows[0];
    } else {
      console.log('No user found with given username');
      return null;
    }
  } catch (error) {
    console.log('Error while deleting data from table', error);
  }
}

export {      
  createUsersTable,
  insertUser,
  fetchAllUsers,
  updateUserInfo,
  deleteInfo,
};

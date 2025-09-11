import db from '../db/db.js';

//! if we want to find a user along with their post
//? so we use Inner join  that returns only the rows where there is a match in both the table
//* MIMP - we want only those users which created a post

//! Inner JOIN will only return rows where there is a match
async function getUserWithPosts() {
  const getUserWithPostsQuery = `
  SELECT users.id, users.username, posts.title
  FROM users
  INNER JOIN posts ON users.id = posts.user_id`;

  try {
    const res = await db(getUserWithPostsQuery);
    return res.rows;
  } catch (error) {
    console.error(error);
  }
}

//! LEFT JOIN returns all rows from the left table (users) with matching rows from the right table (posts), and if no match exists, NULL values are returned for post columns
async function getAllUsersAndTheirPosts() {
  const getAllUsersAndTheirPostsQuery = `
  SELECT users.id, users.username, posts.title
  FROM users
  LEFT JOIN posts ON users.id = posts.user_id`;

  try {
    const res = await db(getAllUsersAndTheirPostsQuery);
    return res.rows;
  } catch (error) {
    console.error(error);
  }
}

export { getUserWithPosts, getAllUsersAndTheirPosts };

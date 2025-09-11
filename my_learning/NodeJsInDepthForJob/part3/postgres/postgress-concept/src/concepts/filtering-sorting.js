//! WHERE clause for sorting

import db from '../db/db.js';

async function getUsersWhere(condition) {
  const getUsersQuery = `
  SELECT * FROM users
  WHERE ${condition}`;

  try {
    const res = await db(getUsersQuery);
    return res.rows;
  } catch (error) {
    console.error(error);
  }
}

async function getSortedUsers(column, order = 'ASC') {
  const getSortedUsersQuery = `
  SELECT * FROM users
  ORDER BY ${column} ${order}`;

  try {
    const result = await db(getSortedUsersQuery);
    return result.rows;
  } catch (error) {
    console.error(error);
  }
}

async function getPaginatedUsers(limit, offset) {
  const getPaginatedQuery = `
  SELECT * FROM users
  LIMIT $1 OFFSET $2`;

  try {
    const result = await db(getPaginatedQuery, [limit, offset]);
    // if we take limit 10 and offset 20 for example then it is
    // like limit [show only 10 users] and offset means start from 21 to 30
    return result.rows;
  } catch (error) {
    console.error(error);
  }
}

export { getUsersWhere, getSortedUsers, getPaginatedUsers };

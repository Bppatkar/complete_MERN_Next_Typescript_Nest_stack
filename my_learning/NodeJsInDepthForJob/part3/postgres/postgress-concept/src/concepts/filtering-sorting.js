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
    return result.rows;
  } catch (error) {
    console.error(error);
  }
}

export { getUsersWhere, getSortedUsers, getPaginatedUsers };

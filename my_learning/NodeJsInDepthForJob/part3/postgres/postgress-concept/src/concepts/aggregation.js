import db from '../db/db.js';

async function countPostsByUser() {
  const countPostsByUserQuery = `
  SELECT users.username, COUNT(posts.id) as post_count
  FROM users
  LEFT JOIN posts ON users.id = posts.user_id
  GROUP BY users.id, users.username`;

  try {
    const res = await db(countPostsByUserQuery);
    return res.rows;
  } catch (error) {
    console.error(error);
  }
}

async function averagePostsPerUser() {
  const averagePostsPerUserQuery = `
  SELECT AVG(post_count) as average_posts
  FROM(
  SELECT COUNT(posts.id) as post_count
  FROM users
  LEFT JOIN posts ON users.id = posts.user_id
  GROUP BY users.id) as user_per_counts
  `;
  try {
    const res = await db(averagePostsPerUserQuery);
    return res.rows;
  } catch (e) {
    console.error(e);
  }
}

export { countPostsByUser, averagePostsPerUser };

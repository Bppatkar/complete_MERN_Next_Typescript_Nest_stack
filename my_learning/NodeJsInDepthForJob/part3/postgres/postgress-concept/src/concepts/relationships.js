import db from '../db/db.js';

async function createPostsTable() {
  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS posts(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP)`;

  try {
    await db(createTableQuery);
    console.log('Posts table created succesfully');
  } catch (error) {
    console.error(error);
  }
}

async function insertNewPost(title, content, userId) {
  const insertPostQuery = `
  INSERT INTO posts (title, content, user_id)
  VALUES ($1, $2, $3)
  RETURNING *`;

  try {
    const result = await db(insertPostQuery, [title, content, userId]);
    return result.rows[0];
  } catch (error) {
    console.error('Error inserting post:', error);
    throw error;
  }
}

//! i am practicing to include joins in relationship
async function getPostsWithUserDetails() {
  const postWithUserDetailQuery = `
  SELECT
    p.id as post_id,
    p.title,
    p.content,
    p.created_at as post_created_at,
    u.id as user_id,
    u.username,
    u.email,
    u.created_at as user_created_at
  FROM posts p
  INNER JOIN users u ON p.user_id = u.id
  ORDER BY p.created_at DESC`;
  try {
    const result = await db(postWithUserDetailQuery);
    console.log('Posts with user details:');
    result.rows.forEach((row) =>
      console.log(`Posts: ${row.title} by ${row.username} (${row.email})`)
    );
  } catch (error) {
    console.error('Error fetching posts with user details:', error);
    throw error;
  }
}

export { createPostsTable, insertNewPost, getPostsWithUserDetails };

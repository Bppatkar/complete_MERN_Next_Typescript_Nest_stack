import {
  averagePostsPerUser,
  countPostsByUser,
} from './concepts/aggregation.js';
import {
  createUsersTable,
  deleteInfo,
  fetchAllUsers,
  insertUser,
  updateUserInfo,
} from './concepts/basic-queries.js';
import {
  getPaginatedUsers,
  getSortedUsers,
  getUsersWhere,
} from './concepts/filtering-sorting.js';
import {
  getAllUsersAndTheirPosts,
  getUserWithPosts,
} from './concepts/joins.js';
import {
  createPostsTable,
  getPostsWithUserDetails,
  insertNewPost,
} from './concepts/relationships.js';

async function testBasicQueries() {
  try {
    //! creating table
    await createUsersTable();

    //! inserting data in table [new users]
    await insertUser('Zyx', 'zxy@gmail.com');
    await insertUser('jhon Doe', 'jhon@gmail.com');
    await insertUser('Travis MClaren', 'travis123@gmail.com');
    await insertUser('Jennifer Lopez', 'jennifer@gmail.com');
    await insertUser('Zayn Malik', 'zaynmalik@gmail.com');
    console.log('All users');

    //! all inserted data
    const allUsers = await fetchAllUsers();
    console.log('Fetching all users', allUsers);

    //! update data
    const updatedUser = await updateUserInfo('Zyx', 'bp@gmail.com');
    console.log('Here is updated user', updatedUser);

    //! deleting data
    const deleteUser = await deleteInfo('Zyx');
    console.log('Deleted User ', deleteUser);
  } catch (error) {
    console.error('Error', error);
  }
}

async function testFilterAndSortQueries() {
  try {
    //! get user with a username whose username starting with z
    const zFilteredUsers = await getUsersWhere("username LIKE 'Z%' ");
    console.log('Filtered user', zFilteredUsers);

    // const sortedUsers = await getSortedUsers('created_at', 'DESC');
    const sortedUsers = await getSortedUsers('created_at', 'ASC');
    console.log('Sorted Users are', sortedUsers);

    const paginatedUsers = await getPaginatedUsers(2, 1);
    // if we take limit 2 and offset 1 for example then it is
    // like limit [show only 2 users] and offset means start from 2 to 3
    // but in our case i use deleteQuery so 2 is deleted so it's showing 3 to 4
    console.log('PaginatedUsers', paginatedUsers);
  } catch (error) {
    console.error('Error', error);
  }
}

async function testRelationshipQueires() {
  try {
    // await createPostsTable();
    // await insertNewPost('first post', 'This is my first one', 4);
    // await insertNewPost('second post', 'this is my second one', 3);
    //  const postsWithUsers = await getPostsWithUserDetails();
    // console.log('Posts with user details:', postsWithUsers);
  } catch (error) {
    console.error('Error', error);
  }
}

async function testJoinQueries() {
  try {
    const usersWithPosts = await getUserWithPosts();
    console.log(usersWithPosts);

    const allUsersWithAllPosts = await getAllUsersAndTheirPosts();
    console.log(allUsersWithAllPosts);
  } catch (error) {
    console.error(error);
  }
}

async function testAggregateQueries() {
  try {
    const postCount = await countPostsByUser();
    console.log(postCount);

    const averagePostsPerUserInfo = await averagePostsPerUser();
    console.log(averagePostsPerUserInfo);
  } catch (error) {
    console.error(error);
  }
}

async function testAllQueries() {
  // await testBasicQueries();
  // await testFilterAndSortQueries();
  // await testRelationshipQueires();
  // await testJoinQueries();
  // await testAggregateQueries();
}

testAllQueries();

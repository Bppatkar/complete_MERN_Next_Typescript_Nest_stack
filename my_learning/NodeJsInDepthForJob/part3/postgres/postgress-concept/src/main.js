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

    const sortedUsers = await getSortedUsers('created_at', 'ASC');
    console.log('Sorted Users are', sortedUsers);

    const paginatedUsers = await getPaginatedUsers(2, 1);
    console.log('PaginatedUsers', paginatedUsers);
  } catch (error) {
    console.error('Error', error);
  }
}

async function testAllQueries() {
  // await testBasicQueries();
  // await testFilterAndSortQueries();
}

testAllQueries();

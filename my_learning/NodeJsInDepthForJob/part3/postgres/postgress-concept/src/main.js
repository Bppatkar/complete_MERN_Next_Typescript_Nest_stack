import {
  createUsersTable,
  deleteInfo,
  fetchAllUsers,
  insertUser,
  updateUserInfo,
} from './concepts/basic-queries.js';

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
    console.log(allUsers);

    //! update data
    const updatedUser = await updateUserInfo('Bhanu Pratap', 'bp@gmail.com');
    console.log(updatedUser);

    //! deleting data
    const deleteUser = await deleteInfo('Bhanu Pratap');
    console.log(deleteUser);
  } catch (error) {
    console.error('Error', error);
  }
}

async function testAllQueries() {
  await testBasicQueries();
}

testAllQueries();

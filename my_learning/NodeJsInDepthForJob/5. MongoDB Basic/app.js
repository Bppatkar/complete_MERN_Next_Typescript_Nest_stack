import mongoose from 'mongoose';

const MONGOURI =
  'mongodb+srv://bhanupratappatkar777:passcheck5543@cluster0.gdb1rus.mongodb.net/';

mongoose
  .connect(MONGOURI)
  .then(() => console.log('DataBase Connect SuccessFully 🚀'))
  .catch((error) => console.error('Connection error:', error.message));

const userSchema = new mongoose.Schema(
  {
    name: 'String',
    email: 'String',
    age: 'Number',
    isActive: 'Boolean',
    tags: [String],
  },
  { timestamps: true }
);

// creating a user Modal

const User = mongoose.model('User', userSchema);

async function runQueryExamples() {
  try {
    // //! create new document
    // const newUser = await User.create({
    //   name: 'Bhanu Pratap Patkar',
    //   email: 'Bhanu@check.com',
    //   age: 26,
    //   isActive: true,
    //   tags: ['Web developer', 'MERN'],
    // });
    // // console.log('Created new User', newUser);
    // //! other way to create a user with save method
    // const secondUser = new User({
    //   name: 'Anurag Patkar',
    //   email: 'Anurag@check.com',
    //   age: 24,
    //   isActive: true,
    //   tags: ['Trader', 'HFT', 'Bussiness man'],
    // });
    // await secondUser.save();
    // // console.log('Second User is Created', secondUser);
    // //! finding all Users
    // const allUsers = await User.find({});
    // // console.log(allUsers);
    // //! finding user that isActive data is false
    // const getUserOfActiveFalse = await User.find({ isActive: true });
    // console.log('Here is a user with isActive is False', getUserOfActiveFalse);
    // //! updating user
    // const updateUser = await User.findByIdAndUpdate(
    //   newUser._id,
    //   {
    //     $set: {
    //       age: 24,
    //       isActive: false, // Combine all $set operations in one object
    //     },
    //     $push: { tags: 'Richest Person in the World' },
    //   },
    //   { new: true }
    // );
    // // console.log('new User Updated Succesfully ', updateUser);
    //! Create test users
    // const activeUser = await User.create({
    //   name: 'Active User',
    //   email: 'active@test.com',
    //   age: 30,
    //   isActive: true,
    //   tags: ['Developer'],
    // });
    // const inactiveUser = await User.create({
    //   name: 'Inactive User',
    //   email: 'inactive@test.com',
    //   age: 25,
    //   isActive: false,
    //   tags: ['Tester'],
    // });
    //! 1. First show all users
    // console.log('All Users:');
    // console.log(await User.find({}));
    //! 2. Show only active users
    // console.log('\nActive Users (isActive: true):');
    // console.log(await User.find({ isActive: true }));
    //! 3. Show only inactive users
    // console.log('\nInactive Users (isActive: false):');
    // console.log(await User.find({ isActive: false }));
    //! 4. Update the active user to inactive
    // const updatedUser = await User.findByIdAndUpdate(
    //   activeUser._id,
    //   {
    //     $set: {
    //       isActive: false,
    //       age: 31,
    //     },
    //     $push: { tags: 'Updated' },
    //   },
    //   { new: true }
    // );
    // console.log('\nUpdated User:');
    // console.log(updatedUser);
    //! 5. Verify the update by showing inactive users again
    // console.log('\nInactive Users After Update:');
    // console.log(await User.find({ isActive: false }));
    //! checking user using findOne
    // const checkDuplicateUser = await User.findOne({ name: 'Active User' });
    // console.log(checkDuplicateUser); // finding the first one which matches the criteria
    //! getting user by _id
    // const getLastCreatedUserById = await User.findById(newUser._id);
    // console.log('last user found by id', getLastCreatedUserById);
    //! finding user by fields
    // const selectedFields = await User.find().select('name email -_id');
    // console.log('user found from Selected fields', selectedFields);
    //! searching limited user
    //? [let assume u want to do a pagination and want to skip the first one items]
    // const limitedUsers = await User.find().limit(3).skip(1);
    // console.log('Here is limited users', limitedUsers);
    //! sorting users [sorted based on age , 1 for ascending and -1 for descending]
    // const sortedUsers = await User.find().sort({ age: 1 });
    // console.log('Sorted User based on age', sortedUsers);
    //! counting the documents [that how many documents we have]
    // const countTrueDocuments = await User.countDocuments({ isActive: true });
    // console.log('We are counting documents which isActive is true: ', countTrueDocuments);
    // const countFalseDocuments = await User.countDocuments({ isActive: false });
    // console.log('We are counting documents which isActive is false: ', countFalseDocuments);
    //! deleting user using _id
    // const deletedUser = await User.findByIdAndDelete(newUser._id);
    // console.log("deleted user ->", deletedUser);
  } catch (error) {
    console.log('Error -> ', error);
  } finally {
    await mongoose.connection.close();
  }
}

runQueryExamples();

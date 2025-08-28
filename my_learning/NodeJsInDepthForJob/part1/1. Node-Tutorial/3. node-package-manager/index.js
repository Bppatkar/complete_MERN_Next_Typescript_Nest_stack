import _ from "lodash";
const names = ["Bhanu", "Pratap", "Patkar"];
// console.log(_.shuffle(names));

const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 20 },
  { name: "Charlie", age: 30 },
];

const sortedUsers = _.sortBy(users, "age");
console.log(sortedUsers);


const sentence = "lodash is awesome";

const capitalizedSentence = _.startCase(sentence);
console.log(capitalizedSentence);

const add = (a, b) => a + b;
const multiplyBy2 = (num) => num * 2;
const subtract = (a, b) => a - b;

const complexOperation = _.flow([add, multiplyBy2, subtract]);
console.log(complexOperation(1, 2));

const user = {
  id: 1,
  name: "John Doe",
  address: {
    street: "123 Main St",
    city: "New York",
    country: "USA",
  },
};

const userCountry = _.get(user, "address.country");
console.log(userCountry);
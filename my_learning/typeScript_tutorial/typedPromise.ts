// 1. What is a Promise?
//? A Promise is an object representing eventual completion of an async operation

const simplePromise = new Promise((resolve) => {
  setTimeout(() => resolve("Done!"), 1000);
});

// 2. How to define type for promise
// Method 1: Using Promise<Type>
const numberPromise: Promise<number> = Promise.resolve(42);

// Method 2: Async function automatically returns Promise
async function getData(): Promise<string> {
  return "Hello";
}

// 3. Custom type in promise
// Define a custom type
type User = {
  id: number;
  name: string;
};

// Use custom type in promise
const fetchUser: Promise<User> = new Promise((resolve) => {
  resolve({
    id: 1,
    name: "John"
  });
});

// Real life example
async function fetchUserData(id: number): Promise<User> {
  try {
    const response = await fetch(`https://api.example.com/users/${id}`);
    if (!response.ok) {
      throw new Error('User not found');
    }
    const user: User = await response.json();
    return user;
  } catch (error) {
    throw new Error(`Failed to fetch user: ${error}`);
  }
}

// Usage
fetchUserData(1)
  .then(user => console.log(user))
  .catch(error => console.error(error));

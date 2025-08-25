// write code for API call
// define type for response
// apply data type to API response

// Define the response type
interface User {
  id: number;
  name: string;
  email: string;
}

// Function to fetch users
async function fetchUsers(): Promise<User[]> {
  try {
    const response = await fetch('https://api.example.com/users');
    const data: User[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

fetchUsers().then((data: User[]) => console.log(data));
// Example output:
// [
//   { id: 1, name: "John Doe", email: "john@example.com" },
//   { id: 2, name: "Jane Smith", email: "jane@example.com" }
// ]

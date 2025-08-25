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
// Example usage
async function main() {
  const users = await fetchUsers();
  users.forEach(user => {
    console.log(`ID: ${user.id}, Name: ${user.name}, Email: ${user.email}`);
  });
}

main();

// Example output:
// ID: 1, Name: John Doe, Email: john@example.com
// ID: 2, Name: Jane Smith, Email: jane@example.com
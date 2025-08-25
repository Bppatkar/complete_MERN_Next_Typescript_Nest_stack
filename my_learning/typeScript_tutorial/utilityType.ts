// what is Utility Types?
//? In Typescript, Utility Types are built-in types means pre define types that help transform or manipulate other types in a convenient way

// ==================== UTILITY TYPES IN TYPESCRIPT ====================

//? Utility Types are built-in types that help transform or manipulate other types

// ---------------------------------------------------------------------
// 1. PARTIAL - Makes all properties optional
// ---------------------------------------------------------------------
interface User {
  name: string;
  age: number;
  email: string;
}

// All properties become optional
let partialUser: Partial<User> = {
  name: 'John', // age and email are optional
};

// ---------------------------------------------------------------------
// 2. REQUIRED - Makes all properties required (even optional ones)
// ---------------------------------------------------------------------
interface OptionalUser {
  name: string;
  age?: number;
  email?: string;
}

// All properties become required
let requiredUser: Required<OptionalUser> = {
  name: 'John',
  age: 25, // now required
  email: 'john@email.com', // now required
};

// ---------------------------------------------------------------------
// 3. READONLY - Makes all properties read-only (cannot be modified)
// ---------------------------------------------------------------------
interface EditableUser {
  name: string;
  age: number;
}

let readonlyUser: Readonly<EditableUser> = {
  name: 'John',
  age: 25,
};

// readonlyUser.name = "Mike"; // Error: Cannot assign to read-only property

// ---------------------------------------------------------------------
// 4. PICK - Select specific properties from a type
// ---------------------------------------------------------------------
interface FullUser {
  name: string;
  age: number;
  email: string;
  address: string;
}

// Only pick name and email properties
let pickedUser: Pick<FullUser, 'name' | 'email'> = {
  name: 'John',
  email: 'john@email.com',
};

// ---------------------------------------------------------------------
// 5. OMIT - Remove specific properties from a type
// ---------------------------------------------------------------------
interface CompleteUser {
  name: string;
  age: number;
  email: string;
  address: string;
}

// Remove age and address properties
let omittedUser: Omit<CompleteUser, 'age' | 'address'> = {
  name: 'John',
  email: 'john@email.com',
};

// ---------------------------------------------------------------------
// 6. EXCLUDE - Remove types from a union type
// ---------------------------------------------------------------------
type Colors = 'red' | 'green' | 'blue' | 'yellow';

// Exclude "yellow" from Colors
type PrimaryColors = Exclude<Colors, 'yellow'>;
// Result: "red" | "green" | "blue"

// ---------------------------------------------------------------------
// 7. EXTRACT - Keep only specific types from a union
// ---------------------------------------------------------------------
type AllColors = 'red' | 'green' | 'blue' | 'yellow' | 'orange';

// Extract only warm colors
type WarmColors = Extract<AllColors, 'red' | 'yellow' | 'orange'>;
// Result: "red" | "yellow" | "orange"

// ---------------------------------------------------------------------
// 8. NONNULLABLE - Remove null and undefined from a type
// ---------------------------------------------------------------------
type MaybeString = string | null | undefined;

// Remove null and undefined
type DefinitelyString = NonNullable<MaybeString>;
// Result: string

// ---------------------------------------------------------------------
// 9. RECORD - Create object type with specific key-value types
// ---------------------------------------------------------------------
// Create object with string keys and number values
type Scores = Record<string, number>;

let examScores: Scores = {
  math: 95,
  science: 88,
  english: 92,
};

// With specific keys
type WeekDays = 'mon' | 'tue' | 'wed' | 'thu' | 'fri';
type Schedule = Record<WeekDays, string>;

let officeHours: Schedule = {
  mon: '9-5',
  tue: '9-5',
  wed: '9-5',
  thu: '9-5',
  fri: '9-3',
};

// ---------------------------------------------------------------------
// 10. RETURNTYPE - Get the return type of a function
// ---------------------------------------------------------------------
function getUser() {
  return { name: 'John', age: 25 };
}

type UserReturnType = ReturnType<typeof getUser>;
// Result: { name: string; age: number }

// ---------------------------------------------------------------------
// 11. PARAMETERS - Get the parameters type of a function
// ---------------------------------------------------------------------
function createUser(name: string, age: number, email?: string) {
  return { name, age, email };
}

type UserParams = Parameters<typeof createUser>;
// Result: [name: string, age: number, email?: string]

// ---------------------------------------------------------------------
// 12. AWAITED - Get the type after awaiting a Promise
// ---------------------------------------------------------------------
async function fetchUser(): Promise<{ name: string; age: number }> {
  return { name: 'John', age: 25 };
}

type FetchedUser = Awaited<ReturnType<typeof fetchUser>>;
// Result: { name: string; age: number }

//! ==================== PRACTICAL EXAMPLE ====================
interface CollegeType {
  name: string;
  location: string;
  students: number;
  branch?: number; // optional property
}

// Using Partial - all properties become optional
let collegeData1: Partial<CollegeType> = {
  name: 'IIT Delhi',
  location: 'Delhi',
  students: 12000,
  // branch is optional
};

// Using Required - all properties become required
let collegeData2: Required<CollegeType> = {
  name: 'IIT Bombay',
  location: 'Mumbai',
  students: 15000,
  branch: 8, // now required
};

// Using Readonly - properties cannot be modified
let collegeData3: Readonly<CollegeType> = {
  name: 'IIT Madras',
  location: 'Chennai',
  students: 13000,
  branch: 6,
};
// collegeData3.name = "New Name"; // Error: Cannot assign to read-only property

// Using Pick - select only specific properties
let collegeBasicInfo: Pick<CollegeType, 'name' | 'location'> = {
  name: 'IIT Kanpur',
  location: 'Kanpur',
};

// Using Omit - remove specific properties
let collegeWithoutBranch: Omit<CollegeType, 'branch'> = {
  name: 'IIT Kharagpur',
  location: 'Kharagpur',
  students: 14000,
};

console.log('All utility types examples are ready!');

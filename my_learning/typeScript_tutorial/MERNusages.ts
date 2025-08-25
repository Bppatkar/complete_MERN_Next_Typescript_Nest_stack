//! Mostly Use Datatypes in MERN & Next JS

//! Basic Primitive Types
// String
let name: string = 'John';
let message: string = `Hello ${name}`;

// Number
let age: number = 25;
let price: number = 99.99;

// Boolean
let isActive: boolean = true;
let isLoading: boolean = false;

// Null and Undefined
let data: null = null;
let value: undefined = undefined;

//! Array Types
// String array
let names: string[] = ['John', 'Jane', 'Mike'];
let emails: Array<string> = ['a@b.com', 'b@c.com'];

// Number array
let ages: number[] = [25, 30, 35];
let scores: Array<number> = [95, 88, 92];

// Mixed array (tuple)
let person: [string, number, boolean] = ['John', 25, true];

// Readonly array
const readonlyNumbers: readonly number[] = [1, 2, 3];

//! Object and Interface Types
// Interface (most common in React/Next.js)
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // Optional property
  readonly createdAt: Date; // Readonly property
}

// Type alias
type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
};

// Index signatures
interface StringArray {
  [index: number]: string;
}

// Function in interface
interface ApiResponse {
  data: any;
  status: number;
  getMessage(): string;
}

//!  Function Types
// Function with typed parameters and return
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function
const multiply = (a: number, b: number): number => a * b;

// Function type
type MathOperation = (a: number, b: number) => number;

// Async function
async function fetchData(url: string): Promise<User> {
  const response = await fetch(url);
  return response.json();
}

// Void function (common in React event handlers)
const handleClick = (event: React.MouseEvent): void => {
  console.log('Clicked');
};

//! Union and Intersection Types

// Union type (one of several types)
type ID = string | number;
type Status = 'pending' | 'success' | 'error';

// Intersection type (combine multiple types)
type AdminUser = User & { isAdmin: boolean };
type Employee = Person & Job;

//!  Generic Types (Very Common)

// Generic function
function identity<T>(arg: T): T {
  return arg;
}

// Generic interface
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Generic in React useState
const [user, setUser] = useState<User | null>(null);
const [products, setProducts] = useState<Product[]>([]);

// Generic in Promise
const fetchUser = async (id: number): Promise<User> => {
  // API call
};

//! Utility Types (Extremely Useful)

// Partial - make all properties optional
type PartialUser = Partial<User>;

// Required - make all properties required
type RequiredUser = Required<User>;

// Readonly - make all properties read-only
type ReadonlyUser = Readonly<User>;

// Pick - select specific properties
type UserBasicInfo = Pick<User, 'id' | 'name'>;

// Omit - remove specific properties
type UserWithoutEmail = Omit<User, 'email'>;

// Record - object with specific key-value types
type UserMap = Record<string, User>;

//! React-Specific Types

// useState hooks
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);
const [items, setItems] = useState<string[]>([]);

// useEffect and useCallback
useEffect(() => {
  /* effect */
}, []);
useCallback(() => {
  /* callback */
}, []);

// Event handlers
const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {};
const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {};
const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {};

// Component props
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

// Context types
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

//! Node.js/Express Specific Types

// Request and Response types
import { Request, Response, NextFunction } from 'express';

// Express middleware
const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // middleware logic
};

// Route handler
const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Custom Request type with user
interface AuthenticatedRequest extends Request {
  user?: User;
}

//!  API Response Types

// Success response
interface SuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

// Error response
interface ErrorResponse {
  success: false;
  error: string;
  code?: number;
}

// Pagination response
interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

//! Common Type Pattern

// Optional chaining and nullish coalescing
const userName = user?.name ?? 'Guest';

// Type guards
function isUser(obj: any): obj is User {
  return obj && typeof obj.name === 'string';
}

// Type assertions
const element = document.getElementById('root') as HTMLElement;
const userData = response.data as User;

// keyof operator
type UserKeys = keyof User; // "id" | "name" | "email" | etc.

// typeof operator
const user = { name: 'John', age: 25 };
type UserType = typeof user; // { name: string; age: number; }

// what is interface
//? An interface is a way to define the structure of an object, function etc.
// define interface
interface info {
  name: string;
  age: number;
  email: string;
  address: string;
}

interface TeacherType extends info {
  // holding all types of info interface
  subject: string;
}

// how to use interface
let userObj: info = {
  name: 'Bhanu',
  age: 25,
  email: 'check@ok.com',
  address: 'ok done',
};

let teacherObj: TeacherType = {
  name: 'Anu',
  age: 25,
  email: 'check@ok.com',
  address: 'Govt. School',
  subject: 'English',
};
// extend interface

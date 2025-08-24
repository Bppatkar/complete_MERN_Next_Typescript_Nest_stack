//what is enum types
//? a datatype that allows you to define a set of named constants
// how to define enums

enum whoType {
  student = 'student',
  teacher = 'teacher',
  management = 'management',
  labStaff = 'labStaff',
}
// how to use enums
// let newData: whoType = whoType.bhanu;// showing error
let newData: whoType = whoType.labStaff;
console.log(newData);
let newDat1: whoType = whoType.student;
console.log(newDat1);
let newDat2: whoType = whoType.management;
console.log(newDat2);
let newDat3: whoType = whoType.teacher;
console.log(newDat3);

// ___________________________________________
enum Fruits {
  a = 'banana',
  b = 'mango',
  c = 'cherry',
}

let myfruit: Fruits = Fruits.c;
console.log(myfruit); // cherry

// ___________________________________________

enum Roles {
  admin,
  qa,
  developer,
  user,
}

let userRole: Roles = Roles.admin;
console.log(userRole); // 1
let userRole1: Roles = Roles.qa;
console.log(userRole1); // 2
let userRole3: Roles = Roles.user;
console.log(userRole3); // 4

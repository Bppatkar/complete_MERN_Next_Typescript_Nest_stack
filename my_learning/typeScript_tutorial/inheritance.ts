// what is inheritance
// example

// class Student {
//   login(userName: string, password: string) {
//     if (userName && password) {
//       return 'Student login';
//     } else {
//       return 'Invalid Credentials';
//     }
//   }
//   result(makrs: number) {
//     if (makrs > 33) return 'Pass';
//     else return 'Failed';
//   }
// }

// let s1 = new Student();
// console.log(s1.result(60));

// class Teacher {
//   login(userName: string, password: string) {
//     if (userName && password) {
//       return 'Teacher login';
//     } else {
//       return 'Invalid Credentials';
//     }
//   }
//   subject(sub: string) {
//     return `He teach ${sub}`;
//   }
// }

// let t1 = new Teacher();
// console.log(t1.login('bhanu', '894y593'));

//! login function is same then why we are writting same things in two places
//! so we put seperately and use it anywhere using extends
class Auth {
  login(userName: string, password: string) {
    if (userName && password) {
      return 'Teacher login';
    } else {
      return 'Invalid Credentials';
    }
  }
}

class Student extends Auth {
  result(makrs: number) {
    if (makrs > 33) return 'Pass';
    else return 'Failed';
  }
}

class Teacher extends Auth {
  subject(sub: string) {
    return `He teach ${sub}`;
  }
}

let s1 = new Student();
console.log(s1.result(60));
let t1 = new Teacher();
console.log(t1.login('bhanu', '894y593'));

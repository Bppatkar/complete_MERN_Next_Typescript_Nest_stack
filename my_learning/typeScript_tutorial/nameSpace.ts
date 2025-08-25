// what is namespace
// make two name space
// how to run class, function with namespace
// how to import namespace

namespace userNameSpace {
  export class Auth {
    login() {
      console.log('Login function called');
    }
  }
  export function getUserList() {
    console.log('List of user ');
  }
}

//! copy past same thing for admin [login and getuserlist]

namespace adminNameSpace {
  export class Auth {
    login() {
      console.log('Login function called');
    }
  }
  export function getUserList() {
    console.log('List of user ');
  }
}

let userCheck1 = new userNameSpace.Auth();
userCheck1.login(); // Login function called

// we can create other file and write these last two line without importing anything beacuse we are in same folder so it will work

/*
@example
 * // To use in another file:
 * /// <reference path="./nameSpace.ts" />
 * let userCheck = new userNameSpace.Auth();
 * userCheck.login();
 * 
 * @remarks
 * When using namespaces in different files, you need to:
 * 1. Add reference path comment at the top of the file
 * 2. Compile with --outFile flag to combine files
 * Example: tsc --outFile app.js nameSpace.ts
 * 
 */

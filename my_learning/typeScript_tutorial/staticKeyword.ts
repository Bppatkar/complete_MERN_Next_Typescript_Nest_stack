// why static keyword?
//? Classes may have static members. These members aren’t associated with a particular instance of the class. They can be accessed through the class constructor object itself:
//? use to define static property and methods
//? memory efficiency
//? utility methods
//? global constants
// advantage of static keyword?
// how to use static property
// how to use static functions
// examples

class Company {
  static name: string = 'Samsung';
}
let c1 = new Company();
// console.log(c1.name) // not working because when we put static then it is not property of variable means v1 , it become property of class
console.log(Company.name);

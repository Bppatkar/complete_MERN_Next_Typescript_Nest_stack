// what is getter and example
// what is setter and example

class EmpInfo {
  _name: string = 'Anil';
  _email: string = 'checkUser@ok.com';

  get name(): string {
    return 'MR. ' + this._name;
  }

  set email(val: string) {
    // setter always takes value as the name
    this._email = 'check' + " " + val;
  }
}

let emp1 = new EmpInfo();
emp1.email = 'ok'; // this is not a function ok so we dont write like this
// emp1.email("ok");

console.log(emp1);

interface CollegeDataType {
  name: string;
  displayTeacherName(): string;
  getStudentList(): void;
}

class CollegeData1 implements CollegeDataType {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  displayTeacherName(): string {
    return 'Mr. ' + `${this.name}`;
  }
  getStudentList(): void {
    console.log('anil', "bruce", "charlie");
  }
}

let stuD1 = new CollegeData1('Hii');
console.log(stuD1.displayTeacherName());
console.log(stuD1.getStudentList());

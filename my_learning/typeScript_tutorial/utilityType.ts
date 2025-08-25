// what is Utility Types?
//? In Typescript, Utility Types are built-in types means pre define types that help transform or manipulate other types in a convenient way

interface CollegeType {
  name: string;
  location: string;
  students: number;
  branch: number;
}

// let CollegeData1: CollegeType = {
//   name: 'iit delhi',
//   location: 'delhi',
//   students: 12,
// };

//TODO: types
//FIXME:   1. Partial
//! if we are not taking branch in collegeData1 then it is showing error , because in datatype we mentioned it. so for removing error we use 'Partial' thats means if we dont want to use all datatypes it's ok , or if we want to use all datatype that is also ok
let CollegeData1: Partial<CollegeType> = {
  name: 'iit delhi',
  location: 'delhi',
  students: 12,
  // now we do not getting any error
};

//? One more example

// function getCollegeData(data: CollegeType) {}

// getCollegeData({ name: 'iit madras' }); //! getting error [missing the following properties from type 'CollegeType': location, students, branch] because CollegeType has more datatypes, so we make it partial

function getCollegeData(data: Partial<CollegeType>) {}
getCollegeData({ name: 'iit madras' });
// _________________________________________________

//FIXME:    2. Required

// in COllegeType let see, u have any conditional datatype means which is optional, like branch?:number; '?' mark means optional , and we want to make it required so we do
function getCollegeData1(data: Required<CollegeType>) {}
// now getCollegeData1 demands branch , now it is not optional

// _________________________________________________
//FIXME:   3. ReadOnly
let CollegeData2: CollegeType = {
  name: 'check1',
  location: 'check',
  students: 23,
  branch: 5,
};
//? we can change data like - CollegeData2.name= "check2";
//? which is wrong because anyone can change data, so we make it readonly
//!  let CollegeData2: Readonly <CollegeType> = {}
// _________________________________________________
//FIXME:    4. Pick
// now we have any object and we dont want to use all 4 datatypes, [n,l,s,b] , we want to use only 2 then we use 'Pick' and it takes 2 argument datatype and property u want to use
let CollegeData3: Pick<CollegeType, 'branch' | 'location'> = {
  branch: 1,
  location: 'test'
};

// _________________________________________________
//FIXME:    5. Omit
// _________________________________________________
//FIXME:    6. Exclude
// _________________________________________________
//FIXME:    7. Extract
// _________________________________________________
//FIXME:    8. NanNullable
// _________________________________________________
//FIXME:    9. Record

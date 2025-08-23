// let userData: {
//   userName: string;
//   userAge: number;
//   userEmail: string;
//   userIsActive: boolean;
//   userCompany: string | undefined;
// } = {
//   userName: 'Bhanu',
//   userAge: 25,
//   userEmail: 'Bhanu@ok.com',
//   userIsActive: true,
//   userCompany: undefined,
// };

//? maybe u got new entries but u havent declare that types so how u can handle it

let userData: { [key: string]: string | boolean | number | undefined } = {
  userName: 'Bhanu',
  userAge: 25,
  userEmail: 'Bhanu@ok.com',
  userIsActive: true,
  userCompany: undefined,
};

// doing for nested object
let nestedObj: {
  [key: string]:
    | string
    | boolean
    | number
    | undefined
    | {
        hNo: number;
        sector: string | number;
        city: string;
      };
} = {
  userName: 'Bhanu',
  userAge: 25,
  userEmail: 'Bhanu@ok.com',
  userIsActive: true,
  userCompany: undefined,
  houseAdd: {
    hNo: 0,
    sector: 'Check',
    city: 'Delhi',
  },
};

function check1(): string {
  return 'bhanu';
}

// function check2(): number {
//   return 'bhanu';   // getting error
// }

// because we mentioned that function will return number but we are returning string

function simple() {
  // that simple function return type is void
}

function complex(): string | number | boolean {
  let data = 10;
  let type = 'age';
  let name = ' bhanu';

  if (type === 'age') return data;
  else return name;
}

complex();

function anything():any{
  
}
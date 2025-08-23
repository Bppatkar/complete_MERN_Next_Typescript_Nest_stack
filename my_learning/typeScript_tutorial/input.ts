function getInfo() {
  const userName = document.getElementById('userName') as HTMLInputElement;
  const uName: string = userName.value;
  const email = document.getElementById('email') as HTMLInputElement;
  const uEmail: string = email.value;

  const age = document.getElementById('age') as HTMLInputElement;
  const uAge: string = age.value;

  console.log('User Info');
  console.log('User Name:', uName);
  console.log('User Age:', uAge);
  console.log('User Email:', uEmail);
}

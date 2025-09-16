'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function Profile() {
  const router = useRouter();
  const pathName = usePathname();
  console.log('router', router);
  /* 
  {
    back: [Function: back],
    forward: [Function: forward],
    prefetch: [Function (anonymous)],
    replace: [Function: replace],
    push: [Function: push],
    refresh: [Function: refresh],
    hmrRefresh: [Function: hmrRefresh]   
    }
    */

  console.log('pathName:- ', pathName); // pathName:-  /profile
  //! MIMP useSearchParams
  const searchParams = useSearchParams();
  console.log('search Params:-', searchParams);
  // http://localhost:3000/profile?name=bhanu [name is key and value is bhanu]
  console.log('searchParams::-->', searchParams.get('name'));
  //? getAll() and URLSearchParams.has()  [read docs for that]
  console.log('Searchparam all:-->', searchParams.getAll('name'));
  // http://localhost:3000/profile?name=bhanu&name=anurag&name=okDone
  //Searchparam all:--> (3) ['bhanu', 'anurag', 'okDone']

  const handleNaviage = () => {
    // router.back();
    router.push('/');
  };

  return (
    <div>
      <h1>Profile Component - client</h1>
      <button
        onClick={handleNaviage}
        className="bg-purple-400 p-2 m-2 rounded-md cursor-pointer"
      >
        {' '}
        Navigate to home page
      </button>
    </div>
  );
}

export default Profile;

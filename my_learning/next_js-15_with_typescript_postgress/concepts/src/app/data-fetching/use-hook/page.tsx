'use client';
import { Suspense, use } from 'react';

interface User {
  name: {
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
  };
}

interface UsersResponse {
  data: {
    data: User[];
  };
}

function getUsers(): Promise<UsersResponse> {
  return fetch(
    'https://api.freeapi.app/api/v1/public/randomusers?page=1&limit=10'
  ).then((res) => res.json());
}

function UseHookExample() {
  const usersPromise = getUsers();

  return (
    <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-3">
            Random Users
          </h1>
          <p className="text-gray-300 text-lg">
            Discover amazing people from around the world
          </p>
        </div>

        <Suspense
          fallback={
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-400 border-t-transparent"></div>
              <p className="text-gray-300 mt-4 text-lg">Loading users...</p>
            </div>
          }
        >
          <UsersList usersPromise={usersPromise} />
        </Suspense>
      </div>
    </div>
  );
}

function UsersList({ usersPromise }: { usersPromise: Promise<UsersResponse> }) {
  const response = use(usersPromise);
  const users = response.data.data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {users.map((user, index) => (
        <div
          key={user.email}
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700/50 
                   shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 
                   hover:scale-105 backdrop-blur-sm"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center gap-5">
            {/* User Avatar */}
            <div className="relative">
              <img
                src={user.picture.large}
                alt={`${user.name.first} ${user.name.last}`}
                className="w-16 h-16 rounded-full border-4 border-purple-500/30 shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full border-2 border-gray-900"></div>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg mb-1">
                {user.name.first} {user.name.last}
              </h3>
              <p className="text-gray-400 text-sm mb-2 truncate">
                {user.email}
              </p>

              {/* Status Indicator */}
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-500">Online</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-4">
            <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm font-semibold">
              Message
            </button>
            <button className="flex-1 bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm font-semibold">
              View
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UseHookExample;

//! 🏢 Server Component Fetching --Vs-- 💻 Client Component Fetching

/* 
//? Visual Identification Tips:
//* Server Component Clues:
async keyword on component function
Direct await before fetch calls
No 'use client' directive
No React hooks used

//* Client Component Clues:
'use client' directive at top
Uses hooks (use, useEffect, useState)
Suspense for loading states
Interactive elements needing JavaScript

//? Real-world Analogy:
Server Component = Restaurant Kitchen 🍳

Food prepared in kitchen (server)
Ready meal served to customer (browser)
Customer gets complete meal immediately

Client Component = Table-side Cooking 🔥

Ingredients brought to table (initial HTML)
Cooking happens at table (client-side fetching)
Customer watches it prepare
*/

//? In interview: "Server components fetch data during server rendering, sending complete HTML to client. Client components fetch after JavaScript loads, making them better for dynamic user-specific data but worse for SEO and initial load performance."

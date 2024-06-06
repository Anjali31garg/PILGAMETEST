







// // pages/login.tsx
// import { useState, ChangeEvent, FormEvent } from 'react';
// import { useRouter } from 'next/router';

// const jwt_decode = require('jwt-decode');
// // Define the DecodedToken interface
// interface DecodedToken {
//   userId: number;
//   name: string;
//   // Add any other properties if needed
// }

// export default function Login() {
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const router = useRouter();

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const res = await fetch('/api/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     if (res.ok) {
//       const data = await res.json();
//       console.log('Token:', data.token);
      
//       // Decode the token and type it with the DecodedToken interface
//       const decoded: DecodedToken = jwt_decode(data.token);
      
//       alert(`Welcome, ${decoded.name}`);
//       router.push('/');
//     } else {
//       console.error('Login failed');
//     }
//   };

//   const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
//   const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="email" placeholder="Email" value={email} onChange={handleChangeEmail} required />
//       <input type="password" placeholder="Password" value={password} onChange={handleChangePassword} required />
//       <button type="submit">Login</button>
//     </form>
//   );
// }



//



// import { useState, ChangeEvent, FormEvent } from 'react';
// import { useRouter } from 'next/router';

// // Define the DecodedToken interface
// interface DecodedToken {
//   userId: number;
//   name: string;
//   // Add any other properties if needed
// }

// export default function Login() {
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const router = useRouter();

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const res = await fetch('/api/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     if (res.ok) {
//       const data = await res.json();

//       // Decode the token manually
//       const tokenParts = data.token.split('.');
//       const encodedPayload = tokenParts[1];
//       const decodedPayload = atob(encodedPayload);
//       const decoded: DecodedToken = JSON.parse(decodedPayload);

//       alert(`Welcome, ${decoded.name}`);
//       router.push('/');
//     } else {
//       console.error('Login failed');
//     }
//   };

//   const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
//   const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="email" placeholder="Email" value={email} onChange={handleChangeEmail} required />
//       <input type="password" placeholder="Password" value={password} onChange={handleChangePassword} required />
//       <button type="submit">Login</button>
//     </form>
//   );
// }



import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';

// Define the DecodedToken interface
interface DecodedToken {
  userId: number;
  name: string;
  // Add any other properties if needed
}

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();

      // Decode the token manually
      const tokenParts = data.token.split('.');
      const encodedPayload = tokenParts[1];
      const decodedPayload = atob(encodedPayload);
      const decoded: DecodedToken = JSON.parse(decodedPayload);

      setUserName(decoded.name);
    } else {
      console.error('Login failed');
    }
  };

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        {userName ? (
          <p className="text-2xl font-bold text-green-600">Welcome, {userName}!</p>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleChangeEmail}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handleChangePassword}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
              >
                Login
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}


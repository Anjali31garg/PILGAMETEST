import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';

export default function Register() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      router.push('/login');
    } else {
      console.error('Registration failed');
    }
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleChangeName}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DugsiHubLogo from '../components/DugsiHubLogo'; // adjust path as needed

// User list as you provided (truncated here for brevity)
const users = [
  { name: 'Abdullahi Ali', email: 'abdullah@gmail.com', password: '2025', role: 'SuperAdmin', school: 'Alfurqan School', grade: '12' },
  // ...rest of users
];

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const user = users.find(
      (u) => u.email.toLowerCase() === form.email.toLowerCase() && u.password === form.password
    );

    if (user) {
      localStorage.setItem('auth', JSON.stringify(user));
      router.push('/dashboard');
    } else {
      setError('Incorrect email or password ❌');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-pink-100 flex flex-col items-center justify-center px-4">
      <DugsiHubLogo className="w-28 h-28 mb-8" />
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">Login</h2>
        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div
      className="
        min-h-screen flex flex-col items-center justify-center px-6 py-20
        bg-gradient-to-br from-white via-pink-100 to-pink-300
        dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
        transition-colors duration-500
      "
    >
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900 dark:text-white">
        Contact Us
      </h1>

      {submitted && (
        <p className="mb-6 text-green-700 dark:text-green-400 font-semibold">
          Thank you for your message! We will get back to you soon.
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 space-y-6
          transition-colors duration-300
        "
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          className="
            w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg
            bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
            focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400
            transition-colors
          "
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
          className="
            w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg
            bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
            focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400
            transition-colors
          "
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          className="
            w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg
            bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none
            focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400
            transition-colors
          "
        />

        <button
          type="submit"
          className="
            w-full bg-pink-600 text-white py-3 rounded-lg shadow-md
            hover:bg-pink-700 dark:bg-pink-500 dark:hover:bg-pink-600
            transition
          "
        >
          Send Message
        </button>
      </form>

      <div className="mt-8">
        <Link
          href="/"
          className="
            inline-block bg-pink-600 text-white px-6 py-3 rounded-xl
            hover:bg-pink-700 dark:bg-pink-500 dark:hover:bg-pink-600
            transition duration-300
          "
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Contact;

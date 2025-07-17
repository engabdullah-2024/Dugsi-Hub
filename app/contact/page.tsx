'use client';

import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';

const SERVICE_ID = 'service_g501e5b';
const TEMPLATE_ID = 'template_c06ycsp';
const PUBLIC_KEY = '6nbY0x5vkTOwEohEU';

type FormState = {
  name: string;
  email: string;
  message: string;
  [key: string]: string; // <-- This line is key for emailjs.send typing
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<{ success: string | null; error: string | null; userEmail: string }>({
    success: null,
    error: null,
    userEmail: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, form, PUBLIC_KEY);
      setStatus({ success: 'Message sent successfully!', error: null, userEmail: form.email });
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus({ success: null, error: 'Failed to send. Please try again later.', userEmail: '' });
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-12 mt-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
        Send Us a Message
      </h2>

      <form onSubmit={sendEmail} className="space-y-6">
        <Input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
        />
        <Input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your Email"
          type="email"
          required
        />
        <Textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Your Message"
          rows={5}
          required
        />
        <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700 text-white">
          Send
        </Button>
      </form>

      <AnimatePresence>
        {status.success && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 p-4 bg-green-100 text-green-700 rounded-xl text-center"
          >
            ✅ {status.success}
            <div className="mt-1 text-sm text-green-800">Sent from: {status.userEmail}</div>
          </motion.div>
        )}

        {status.error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 p-4 bg-red-100 text-red-700 rounded-xl text-center"
          >
            ❌ {status.error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

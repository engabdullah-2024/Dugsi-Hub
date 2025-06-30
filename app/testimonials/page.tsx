'use client';

import Image from 'next/image';
import me from '../assets/me.jpeg'; // Make sure the path is correct

const testimonials = [
  {
    name: 'Eng Abdullah',
    role: 'CEO/ Founder Of DugsiHub',
    feedback:
      'DugsiHub is a game- changer for students. Its a one-stop solution for all educational needs. I am proud to be a part of it.',
    image: me,
  },
  {
    name: 'Ahmed M.',
    role: 'Teacher',
    feedback:
      'Thanks to DugsiHub , I didn’t have to stress about finding my subjects. Everything is organized and super fast!',
  },
  {
    name: 'Layla Y.',
    role: 'Parent',
    feedback:
      'A perfect platform for students. The free access and easy downloads helped my child prepare better for exams.',
  },
];

const Testimonials = () => {
  return (
    <div className="py-16">
      <div className="max-w-5xl mx-auto text-center px-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-10">
          What They Say ❤️
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-pink-100 shadow-md rounded-xl p-6 text-left space-y-3 transition hover:shadow-pink-300"
            >
              {testimonial.image && (
                <div className="w-16 h-16 relative mb-3 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={`Photo of ${testimonial.name}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="64px"
                    priority={index === 0} // prioritize first image
                  />
                </div>
              )}
              <p className="text-gray-700 italic">"{testimonial.feedback}"</p>
              <div className="text-right">
                <p className="text-pink-600 font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;

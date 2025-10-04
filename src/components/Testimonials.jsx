import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Professional Photographer",
    avatar: "SJ",
    rating: 5,
    text: "Dovini Camera & Gears has been my go-to source for professional equipment. Their products are top-notch and the service is exceptional. Highly recommended!",
    date: "2 weeks ago"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Videographer",
    avatar: "MC",
    rating: 5,
    text: "Fast delivery, competitive prices, and amazing product quality. I've purchased multiple items from Dovini and have never been disappointed.",
    date: "1 month ago"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Content Creator",
    avatar: "ER",
    rating: 5,
    text: "The team at Dovini really knows their stuff. They helped me choose the perfect camera setup for my YouTube channel. Outstanding expertise!",
    date: "3 weeks ago"
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Photojournalist",
    avatar: "DT",
    rating: 5,
    text: "Reliable equipment that performs under pressure. I've used Dovini gear on assignments worldwide and it never lets me down.",
    date: "1 week ago"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from photographers and videographers who trust our equipment
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 relative"
            >
              <Quote className="w-8 h-8 text-red-200 absolute top-4 right-4" />

              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex items-center mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>

              <p className="text-xs text-gray-500">{testimonial.date}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center space-x-8 bg-white rounded-2xl p-6 shadow-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">500+</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">4.9★</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">50+</div>
              <div className="text-sm text-gray-600">Products</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
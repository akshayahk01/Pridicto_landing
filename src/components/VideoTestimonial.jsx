import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Star, Quote } from 'lucide-react';

const VideoTestimonial = ({ testimonial, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="group relative bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
      onClick={() => onClick(testimonial)}
    >
      {/* Video thumbnail with play button overlay */}
      <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className={`w-full h-full object-cover transition-all duration-500 ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Play button overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
          >
            <Play className="w-6 h-6 text-gray-900 ml-1" fill="currentColor" />
          </motion.div>
        </div>

        {/* Video duration badge */}
        <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 text-white text-xs rounded-full">
          Video
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Star rating */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < testimonial.rating
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Quote */}
        <blockquote className="text-gray-700 mb-4 line-clamp-3">
          "{testimonial.quote}"
        </blockquote>

        {/* Author info */}
        <div className="flex items-center gap-3">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
          />
          <div>
            <h4 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h4>
            <p className="text-xs text-gray-600">{testimonial.role}</p>
            <p className="text-xs text-blue-600 font-medium">{testimonial.company}</p>
          </div>
        </div>

        {/* Industry tag */}
        <div className="mt-4">
          <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
            {testimonial.industry}
          </span>
        </div>
      </div>

      {/* Hover effect border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
};

export default VideoTestimonial;

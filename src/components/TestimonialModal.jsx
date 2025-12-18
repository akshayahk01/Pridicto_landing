import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Star, Quote } from 'lucide-react';

const TestimonialModal = ({ testimonial, isOpen, onClose }) => {
  if (!testimonial) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden bg-white rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-lg"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Video/Image section */}
              <div className="md:w-1/2 relative">
                {testimonial.videoUrl ? (
                  <div className="relative aspect-video bg-gray-900">
                    <video
                      className="w-full h-full object-cover"
                      controls
                      poster={testimonial.image}
                    >
                      <source src={testimonial.videoUrl} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                ) : (
                  <div className="relative aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white shadow-lg flex items-center justify-center">
                        <Quote className="w-8 h-8 text-blue-600" />
                      </div>
                      <p className="text-gray-600 font-medium">Video Testimonial</p>
                      <p className="text-sm text-gray-500">Coming Soon</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Content section */}
              <div className="md:w-1/2 p-8 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-gray-600">{testimonial.role}</p>
                    <p className="text-sm text-blue-600 font-medium">{testimonial.company}</p>
                  </div>
                </div>

                {/* Star rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {testimonial.rating}/5 stars
                  </span>
                </div>

                {/* Testimonial text */}
                <blockquote className="text-gray-700 leading-relaxed mb-6 text-lg">
                  "{testimonial.quote}"
                </blockquote>

                {/* Industry/Project info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-medium">Industry:</span>
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                      {testimonial.industry}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-medium">Project Type:</span>
                    <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs">
                      {testimonial.projectType}
                    </span>
                  </div>
                  {testimonial.metrics && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Results:</h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        {testimonial.metrics.map((metric, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            {metric}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TestimonialModal;

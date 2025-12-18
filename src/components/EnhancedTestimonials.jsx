import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, Play, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import TestimonialModal from "./TestimonialModal";

const testimonials = [
  {
    id: 1,
    name: "Juliana Martinez",
    role: "CTO",
    company: "TechFlow Solutions",
    companyLogo: "/assets/logo (2).png", // Using existing logo as placeholder
    image: "/assets/OIP.webp",
    rating: 5,
    quote: "Predicto.ai has become the starting point for every major initiative. Our PMO, delivery leads and finance teams now speak the same language when it comes to effort, cost and risk.",
    industry: "SaaS",
    projectType: "Digital Transformation",
    videoUrl: null, // No video for this one
    metrics: [
      "Reduced estimation errors by 70%",
      "Improved project delivery accuracy to 92%",
      "Saved 15+ hours per project cycle"
    ]
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "VP of Engineering",
    company: "DataSync Corp",
    companyLogo: "/assets/logo (2).png",
    image: "/assets/OIP (1).webp",
    rating: 5,
    quote: "The AI-powered forecasting is incredible. We've cut our planning time in half while improving accuracy. Our stakeholders finally trust our numbers.",
    industry: "Fintech",
    projectType: "Platform Development",
    videoUrl: null,
    metrics: [
      "50% reduction in planning time",
      "95% forecast accuracy achieved",
      "Board-level confidence in estimates"
    ]
  },
  {
    id: 3,
    name: "Sarah Johnson",
    role: "Project Director",
    company: "Global Systems Inc",
    companyLogo: "/assets/logo (2).png",
    image: "/assets/Project-Estimation-Techniques-main (1).jpg",
    rating: 5,
    quote: "Predicto.ai transformed how we approach project estimation. The risk-aware timelines and cross-team alignment features are game-changers.",
    industry: "Enterprise IT",
    projectType: "Infrastructure Modernization",
    videoUrl: null,
    metrics: [
      "Eliminated 80% of scope surprises",
      "Improved team collaboration scores",
      "Reduced project overruns by 60%"
    ]
  }
];

const EnhancedTestimonials = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay, ease: "easeOut" },
    },
    viewport: { once: true, amount: 0.3 },
  });

  return (
    <section className="py-20 bg-[#F3F4F8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          {...fadeUp(0.05)}
          className="text-center mb-16"
        >
          <h3 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">
            Trusted by industry leaders worldwide
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            See how teams across different industries are transforming their project estimation and delivery processes.
          </p>
        </motion.div>

        {/* Featured Testimonial */}
        <motion.div
          {...fadeUp(0.1)}
          className="mb-16"
        >
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Left side - Customer info and quote */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-gray-600">{testimonials[currentIndex].role}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <img
                        src={testimonials[currentIndex].companyLogo}
                        alt={testimonials[currentIndex].company}
                        className="h-5 w-auto"
                      />
                      <span className="text-sm text-blue-600 font-medium">
                        {testimonials[currentIndex].company}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Star rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonials[currentIndex].rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {testimonials[currentIndex].rating}/5 stars
                  </span>
                </div>

                {/* Quote */}
                <blockquote className="text-lg text-gray-700 leading-relaxed mb-6">
                  "{testimonials[currentIndex].quote}"
                </blockquote>

                {/* Industry and project type */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                    {testimonials[currentIndex].industry}
                  </span>
                  <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                    {testimonials[currentIndex].projectType}
                  </span>
                </div>

                {/* Metrics */}
                <div className="space-y-2">
                  <h5 className="font-semibold text-gray-900 mb-3">Key Results:</h5>
                  <ul className="space-y-2">
                    {testimonials[currentIndex].metrics.map((metric, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                        {metric}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right side - Video/Image */}
              <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 p-8 lg:p-12 flex items-center justify-center">
                {testimonials[currentIndex].videoUrl ? (
                  <div className="relative w-full max-w-md aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-lg">
                    <video
                      className="w-full h-full object-cover"
                      controls
                      poster={testimonials[currentIndex].image}
                    >
                      <source src={testimonials[currentIndex].videoUrl} type="video/mp4" />
                    </video>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white shadow-lg flex items-center justify-center">
                      <Quote className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Video Testimonial</h4>
                    <p className="text-gray-600 mb-4">Coming Soon</p>
                    <button
                      onClick={() => setSelectedTestimonial(testimonials[currentIndex])}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                    >
                      <Play className="w-4 h-4" />
                      View Details
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between p-6 bg-gray-50 border-t">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              {...fadeUp(0.2 + index * 0.1)}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer"
              onClick={() => setSelectedTestimonial(testimonial)}
            >
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                />
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900">{testimonial.name}</h5>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
                <img
                  src={testimonial.companyLogo}
                  alt={testimonial.company}
                  className="h-6 w-auto"
                />
              </div>

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

              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                "{testimonial.quote.substring(0, 120)}..."
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
                  {testimonial.industry}
                </span>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Read more →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonial Modal */}
      <TestimonialModal
        testimonial={selectedTestimonial}
        isOpen={!!selectedTestimonial}
        onClose={() => setSelectedTestimonial(null)}
      />
    </section>
  );
};

export default EnhancedTestimonials;

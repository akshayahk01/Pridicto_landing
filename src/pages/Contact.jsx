import React from 'react';
import Layout from '../components/Layout';
import ContactForm from '../components/ContactForm';
import ScheduleMeeting from '../components/ScheduleMeeting';
import { motion } from 'framer-motion';

export default function Contact(){
  return (
    <Layout>
      <div className="min-h-screen bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-100">
        <main className="pt-28 max-w-7xl mx-auto px-6 pb-16 space-y-12">
        <motion.section initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} className="text-center">
          <h1 className="text-4xl font-extrabold">Get in <span className="text-indigo-600">Touch</span></h1>
          <p className="text-gray-500 dark:text-gray-300 mt-2">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </motion.section>

        <section className="grid md:grid-cols-3 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p>Email: info@predicto.ai</p>
            <p>Phone: +1 (123) 456-7890</p>
            <p>Address: 123 Business St, Startup City, USA</p>
            <div className="mt-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353153168!3d-37.816279742021665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d4a32b7b2b0!2sFederation%20Square!5e0!3m2!1sen!2sus!4v1633024800000!5m2!1sen!2sus"
                width="100%"
                height="300"
                style={{border:0}}
                allowFullScreen=""
                loading="lazy"
                title="Office Location"
              ></iframe>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Send a Message</h2>
            <ContactForm />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Schedule a Meeting</h2>
            <ScheduleMeeting />
          </div>
        </section>
        </main>
      </div>
    </Layout>
  );
}

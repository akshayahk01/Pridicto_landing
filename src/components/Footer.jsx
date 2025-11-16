import React from 'react';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

export default function Footer(){
  return (
    <footer className="py-8 border-t border-gray-200 dark:border-slate-700 text-center mt-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-center gap-6 mb-4">
          <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedin className="text-xl hover:text-indigo-600"/></a>
          <a href="https://github.com" target="_blank" rel="noreferrer"><FaGithub className="text-xl hover:text-indigo-600"/></a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter className="text-xl hover:text-indigo-600"/></a>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} Predicto.ai — Built by RISINTERNATIONAL & Team</p>
      </div>
    </footer>
  );
}

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaBuilding, FaBriefcase, FaCheckSquare } from 'react-icons/fa';

export default function Signup() {
  const [dark, setDark] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [industry, setIndustry] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [preferredServices, setPreferredServices] = useState([]);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await signup(email, password, { firstName, lastName, industry, companySize, experienceLevel, preferredServices });
      // Show success message and redirect to login or verification page
      alert('Registration successful! Please check your email for verification.');
      navigate('/login');
    } catch (err) {
      setError('Signup failed');
    }
  };

  const handleServiceChange = (service) => {
    setPreferredServices(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${dark ? 'bg-slate-900 text-gray-100':'bg-white text-gray-800'}`}>
      <Navbar dark={dark} setDark={setDark} />
      <main className="pt-28 pb-16 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="w-full max-w-md p-8 rounded-2xl bg-white dark:bg-slate-800 shadow">
          <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                <FaUser className="text-indigo-600" />
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg dark:bg-slate-700 dark:border-slate-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg dark:bg-slate-700 dark:border-slate-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg dark:bg-slate-700 dark:border-slate-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg dark:bg-slate-700 dark:border-slate-600"
                minLength="8"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg dark:bg-slate-700 dark:border-slate-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                <FaBuilding className="text-indigo-600" />
                Industry
              </label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg dark:bg-slate-700 dark:border-slate-600"
              >
                <option value="">Select industry...</option>
                <option value="technology">Technology</option>
                <option value="healthcare">Healthcare</option>
                <option value="finance">Finance</option>
                <option value="retail">Retail</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="education">Education</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                <FaBriefcase className="text-indigo-600" />
                Company Size
              </label>
              <select
                value={companySize}
                onChange={(e) => setCompanySize(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg dark:bg-slate-700 dark:border-slate-600"
              >
                <option value="">Select company size...</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-1000">201-1000 employees</option>
                <option value="1000+">1000+ employees</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Experience Level</label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg dark:bg-slate-700 dark:border-slate-600"
              >
                <option value="">Select experience level...</option>
                <option value="beginner">Beginner (0-2 years)</option>
                <option value="intermediate">Intermediate (2-5 years)</option>
                <option value="advanced">Advanced (5-10 years)</option>
                <option value="expert">Expert (10+ years)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <FaCheckSquare className="text-indigo-600" />
                Preferred Services
              </label>
              <div className="space-y-2">
                {['Project Estimation', 'Business Consulting', 'AI Solutions', 'Web Development', 'Mobile Apps'].map(service => (
                  <label key={service} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={preferredServices.includes(service)}
                      onChange={() => handleServiceChange(service)}
                      className="mr-2"
                    />
                    {service}
                  </label>
                ))}
              </div>
            </div>
            <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              Sign Up
            </button>
          </form>
          <p className="text-center mt-4">
            Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
          </p>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

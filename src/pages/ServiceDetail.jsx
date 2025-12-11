// This canvas contains ALL split components for the new ultra‑premium Service Detail page.
// Copy each component into its own file inside /src/components/services/ and import them.
// ---------------------------
// FILE: /src/components/services/ServiceHero.jsx
// ---------------------------
import React from 'react';
import { FaClock, FaRocket, FaShieldAlt } from 'react-icons/fa';

export default function ServiceHero({ service }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-slate-800">
      <img src={service.image} alt={service.title} className="w-full h-64 object-cover" />

      <div className="p-8 space-y-4">
        <h1 className="text-4xl font-bold text-indigo-600">{service.title}</h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">{service.description}</p>

        <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2"><FaClock className="text-indigo-500" />{service.timeline}</div>
          <div className="flex items-center gap-2"><FaShieldAlt className="text-green-500" />Quality Assurance</div>
          <div className="flex items-center gap-2"><FaRocket className="text-purple-500" />AI Powered</div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------
// FILE: /src/components/services/FeatureList.jsx
// ---------------------------
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

export function FeatureList({ features }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <FaCheckCircle className="text-green-500" /> Features Included
      </h2>
      <ul className="space-y-3">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
            <FaCheckCircle className="text-green-500 mt-1" /> {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------------------------
// FILE: /src/components/services/AIFeatures.jsx
// ---------------------------
import React from 'react';
import { FaLightbulb } from 'react-icons/fa';

export function AIFeatures({ ai }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <FaLightbulb className="text-yellow-500" /> AI Features
      </h2>
      <ul className="space-y-3">
        {ai.map((f, i) => (
          <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
            <FaLightbulb className="text-yellow-500 mt-1" /> {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------------------------
// FILE: /src/components/services/PricingCard.jsx
// ---------------------------
import React from 'react';
import { FaDollarSign } from 'react-icons/fa';

export function PricingCard({ service, selectedPackage, setSelectedPackage }) {
  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-lg border border-gray-100 dark:border-slate-700 sticky top-28">
      <h3 className="font-semibold mb-3 text-gray-500">Select Package</h3>
      <div className="grid gap-3">
        {Object.entries(service.pricing).map(([tier, price]) => (
          <button
            key={tier}
            onClick={() => setSelectedPackage(tier)}
            className={`text-left p-3 rounded-xl border-2 transition duration-300 ${
              selectedPackage === tier
                ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
                : 'border-gray-200 dark:border-slate-600'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="capitalize font-semibold">{tier}</span>
              <span className="text-indigo-600 font-bold text-xl">${price}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------------------------
// FILE: /src/components/services/Addons.jsx
// ---------------------------
import React from 'react';

export function Addons({ addons, toggleAddon, addonPrices }) {
  const options = [
    { key: 'priority', label: 'Priority Support' },
    { key: 'consultation', label: '1-on-1 Consultation' },
    { key: 'revisions', label: 'Unlimited Revisions' },
    { key: 'templates', label: 'Custom Templates' }
  ];

  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg">
      <h3 className="font-semibold mb-4">Add‑ons</h3>
      <div className="grid gap-3">
        {options.map((a) => (
          <label
            key={a.key}
            className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={addons.includes(a.key)}
                onChange={() => toggleAddon(a.key)}
              />
              <span className="font-medium">{a.label}</span>
            </div>
            <span className="text-indigo-600 font-semibold">+${addonPrices[a.key]}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

// ---------------------------
// FILE: /src/components/services/TimelineSelector.jsx
// ---------------------------
import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

export function TimelineSelector({ timeline, setTimeline }) {
  const options = [
    { key: 'rush', label: 'Rush (3-5 days)', multiplier: 1.5 },
    { key: 'standard', label: 'Standard', multiplier: 1 },
    { key: 'flexible', label: 'Flexible', multiplier: 0.85 }
  ];

  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <FaCalendarAlt className="text-blue-500" /> Timeline
      </h3>
      <div className="grid gap-3">
        {options.map((t) => (
          <label
            key={t.key}
            onClick={() => setTimeline(t.key)}
            className={`p-3 rounded-lg cursor-pointer border flex items-center justify-between ${
              timeline === t.key
                ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
                : 'border-gray-200 dark:border-slate-700'
            }`}
          >
            <span>{t.label}</span>
            <span>x{t.multiplier}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

// ---------------------------
// FILE: /src/components/services/Testimonials.jsx
// ---------------------------
import React from 'react';
import { FaStar } from 'react-icons/fa';

export function Testimonials({ testimonials }) {
  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FaStar className="text-yellow-500" /> Success Stories
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {testimonials.map((t, i) => (
          <div key={i} className="border p-5 rounded-xl">
            <div className="flex gap-1 mb-2">
              {[...Array(t.rating)].map((_, i) => (
                <FaStar key={i} className="text-yellow-500" />
              ))}
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-3">"{t.text}"</p>
            <div className="font-semibold">{t.name}</div>
            <div className="text-sm text-gray-500">{t.company}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------
// FILE: /src/components/services/FAQ.jsx
// ---------------------------
import React from 'react';

export function FAQ({ faqs }) {
  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked</h2>
      <div className="space-y-3">
        {faqs.map((f, i) => (
          <details key={i} className="p-4 border rounded-lg cursor-pointer">
            <summary className="font-semibold">{f.q}</summary>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

// ---------------------------
// END OF COMPONENT BUNDLE
// ---------------------------

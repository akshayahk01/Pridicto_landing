# 🚀 Quick Start: Backend Setup (Node.js + Express + MongoDB)

## Installation & Setup

### 1. Create Backend Project
```bash
mkdir predicto-backend
cd predicto-backend
npm init -y
```

### 2. Install Dependencies
```bash
npm install express mongoose dotenv cors bcryptjs jsonwebtoken nodemailer multer cloudinary
npm install --save-dev nodemon
```

### 3. Project Structure
```
predicto-backend/
├── .env
├── .gitignore
├── server.js
├── config/
│   ├── database.js
│   └── cloudinary.js
├── models/
│   ├── User.js
│   ├── Service.js
│   ├── Testimonial.js
│   ├── Portfolio.js
│   ├── BlogPost.js
│   ├── Contact.js
│   └── FAQ.js
├── routes/
│   ├── auth.js
│   ├── services.js
│   ├── testimonials.js
│   ├── portfolio.js
│   ├── blog.js
│   ├── contact.js
│   ├── faqs.js
│   └── admin.js
├── controllers/
│   ├── authController.js
│   ├── serviceController.js
│   ├── testimonialController.js
│   ├── portfolioController.js
│   ├── blogController.js
│   ├── contactController.js
│   └── adminController.js
├── middleware/
│   ├── auth.js
│   └── errorHandler.js
└── utils/
    ├── emailService.js
    └── validators.js
```

---

## Core Files

### .env
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/predicto
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=noreply@predicto.ai

STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLIC_KEY=pk_test_...

NODE_ENV=development
FRONTEND_URL=http://localhost:5175
```

### server.js
```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/services', require('./routes/services'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/portfolio', require('./routes/portfolio'));
app.use('/api/blog', require('./routes/blog'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/faqs', require('./routes/faqs'));
app.use('/api/admin', require('./routes/admin'));

// Error handling middleware
app.use(require('./middleware/errorHandler'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

### models/User.js
```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  company: String,
  phone: String,
  role: { type: String, enum: ['user', 'admin', 'partner'], default: 'user' },
  subscriptionTier: { type: String, enum: ['free', 'pro', 'enterprise'], default: 'free' },
  isVerified: { type: Boolean, default: false },
  verificationToken: String,
  profileImage: String,
  preferences: {
    theme: { type: String, default: 'light' },
    notifications: { type: Boolean, default: true },
    language: { type: String, default: 'en' },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare passwords
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
```

### models/Service.js
```javascript
const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  description: { type: String, required: true },
  category: String,
  icon: String,
  image: String,
  features: [String],
  pricing: {
    basic: Number,
    pro: Number,
    enterprise: Number,
  },
  timeline: String,
  aiFeatures: [String],
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  metadata: {
    views: { type: Number, default: 0 },
    inquiries: { type: Number, default: 0 },
    conversions: { type: Number, default: 0 },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Service', ServiceSchema);
```

### routes/auth.js
```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    // Create new user
    user = new User({
      email,
      password,
      firstName,
      lastName,
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Profile (Protected)
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Profile (Protected)
router.put('/profile', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      { $set: req.body },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
```

### middleware/auth.js
```javascript
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = auth;
```

### routes/services.js
```javascript
const express = require('express');
const Service = require('../models/Service');

const router = express.Router();

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ order: 1 });
    res.json({
      success: true,
      data: services,
      total: services.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single service
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findOne({
      $or: [{ _id: req.params.id }, { slug: req.params.id }],
    });

    if (!service) return res.status(404).json({ message: 'Service not found' });

    // Increment views
    service.metadata.views += 1;
    await service.save();

    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
```

---

## Frontend Integration Update

### Update Redux Slice
```javascript
// src/store/slices/contentSlice.js

export const fetchServices = createAsyncThunk(
  'content/fetchServices',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/services`);
      if (!response.ok) throw new Error('Failed to fetch services');
      const data = await response.json();
      return data.data; // Return the data array
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
```

### Update Services Page
```jsx
// src/pages/Services.jsx

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../store/slices/contentSlice';

export default function Services() {
  const dispatch = useDispatch();
  const { services, loading } = useSelector(state => state.content);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  if (loading.services) return <LoadingSpinner />;

  return (
    // Render services from Redux instead of hardcoded array
    <div className="grid md:grid-cols-3 gap-8">
      {services.map((service) => (
        <ServiceCard key={service._id} {...service} />
      ))}
    </div>
  );
}
```

---

## Deployment

### Deploy Backend (Railway/Render)
```bash
# Push to GitHub
git push origin main

# Railway/Render will auto-deploy
# Set environment variables in dashboard
```

### Update Frontend .env
```
VITE_API_BASE_URL=https://your-backend-url.railway.app
```

---

## Testing APIs

### Using cURL
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Get Services
curl http://localhost:5000/api/services
```

---

## Next: Create More Models & Routes

Follow the same pattern to create:
- Testimonials routes
- Portfolio routes  
- Blog routes
- Contact form routes
- Admin panel routes

Each follows: Model → Route → Controller pattern

Happy building! 🚀

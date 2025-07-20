const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const jobRoutes = require('./routes/jobRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// 🔌 MongoDB connection
mongoose.connect('mongodb://localhost:27017/jobtracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 🔧 Middleware setup
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// 🔐 Session middleware (IMPORTANT: put before routes)
app.use(
  session({
    secret: 'secretkey123', // use env var in production
    resave: false,
    saveUninitialized: false,
  })
);

// 👤 Auth routes (login/register)
app.use(authRoutes);

// 🔒 Protect job routes: check login before accessing
app.use((req, res, next) => {
  const publicPaths = ['/login', '/register'];
  if (!req.session.userId && !publicPaths.includes(req.path)) {
    return res.redirect('/login');
  }
  next();
});

// 📄 Job Routes (after auth & protection)
app.use('/', jobRoutes);

// 🚀 Server start
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

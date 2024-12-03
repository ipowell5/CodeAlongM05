const express = require('express');
const mongoose = require('mongoose');
const app = express();

// MongoDB connection URI
const DB_URI = 'mongodb+srv://test123:testingtesting123@sdev255.hwla6.mongodb.net/?retryWrites=true&w=majority&appName=SDEV255';

// Connect to MongoDB using Mongoose
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to DB'))
  .catch(err => console.error('Error connecting to DB:', err));

// Import the Blog model
const Blog = require('./models/blogs');

// Middleware to parse URL-encoded data (form data)
app.use(express.urlencoded({ extended: true }));

// Custom logging middleware
app.use((req, res, next) => {
  console.log(`New request made: Host - ${req.hostname}, Path - ${req.path}, Method - ${req.method}`);
  next();
});

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files (like CSS, images)
app.use(express.static('public'));

// Home route (renders the index.ejs view)
app.get('/', (req, res) => {
  res.render('index');
});

// About route (renders the about.ejs view)
app.get('/about', (req, res) => {
  res.render('about');
});

// Route to display all blog posts
app.get('/blogs', (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })  // Sort blogs by creation date (newest first)
    .then(blogs => {
      res.render('blogs', { blogs: blogs });
    })
    .catch(err => {
      console.error('Error fetching blogs:', err);
      res.status(500).send('Error retrieving blog posts');
    });
});

// Route to create a new blog post (GET request for the form)
app.get('/new-blog', (req, res) => {
  res.render('new-blog');
});

// Route to handle the form submission to create a new blog (POST request)
app.post('/blogs', (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    snippet: req.body.snippet,
    body: req.body.body
  });

  blog.save()
    .then(() => res.redirect('/blogs'))  // Redirect to the blogs page after saving
    .catch(err => console.error('Error saving blog:', err));
});

// Sandbox route to add a new blog manually (for testing)
app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'New Blog',
    snippet: 'About my new blog',
    body: 'This is more about my new blog'
  });

  blog.save()
    .then(result => {
      console.log(result);  // Log the saved blog document
      res.send(result);  // Send the saved blog back to the browser as a response
    })
    .catch(err => console.log('Error saving blog:', err));
});

// Route to get all blogs (for testing)
app.get('/all-blocks', (req, res) => {
  Blog.find()
    .then(blogs => {
      res.send(blogs);  // Send the array of blog documents as a response
    })
    .catch(err => console.log('Error fetching blogs:', err));
});

// Route to get a single blog by ID (for testing)
app.get('/single-blog', (req, res) => {
  const blogId = 'your-blog-id-here';  // Replace with a real ID or use dynamic ID
  Blog.findById(blogId)
    .then(blog => {
      res.send(blog);  // Send the single blog document as a response
    })
    .catch(err => console.log('Error fetching single blog:', err));
});

// 404 route for any non-existent routes (renders the 404.ejs view)
app.use((req, res) => {
  res.status(404).render('404');  // Make sure you have '404.ejs' in the 'views' folder
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

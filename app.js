const express = require('express');
const app = express();

// Custom logging middleware
app.use((req, res, next) => {
  // Log the details of the incoming request
  console.log(`New request made: Host - ${req.hostname}, Path - ${req.path}, Method - ${req.method}`);
  
  // Call next() to move to the next middleware
  next();  
});

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files (like CSS, images)
app.use(express.static('public'));

// Home route (renders the index.ejs view)
app.get('/', (req, res) => {
  res.render('index');  // Make sure you have 'index.ejs' in the 'views' folder
});

// About route (renders the about.ejs view)
app.get('/about', (req, res) => {
  res.render('about');  // Make sure you have 'about.ejs' in the 'views' folder
});

// 404 route for any non-existent routes (renders the 404.ejs view)
app.use((req, res) => {
  res.status(404).render('404');  // Make sure you have '404.ejs' in the 'views' folder
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

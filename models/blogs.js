const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Blog Schema
const blogSchema = new Schema({
  title: { type: String, required: true },
  snippet: { type: String, required: true },
  body: { type: String, required: true }
}, { timestamps: true });  // automatically adds 'createdAt' and 'updatedAt' fields

// Create the Blog Model based on the Schema
const Blog = mongoose.model('Blog', blogSchema);

// Export the model so it can be used elsewhere
module.exports = Blog;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// connect DB
mongoose.connect('mongodb://127.0.0.1:27017/cleanblog-test-db');

const BlogSchema = new Schema({
  title: String,
  description: String,
});

const Blog = mongoose.model('Blog', BlogSchema);

// create a post
/* Blog.create({
  title: 'Post Title 2',
  description: 'Post Description 2 lorem ipsum',
}); */

// read a blog
/* Blog.find()
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  }); */

// update a blog
const blogId = '646d2b8e8b8b7cd7ce486501';
/* Blog.findByIdAndUpdate(blogId, {
  title: 'Post Title 1 updated',
  description: 'Post description 1 lorem ipsum updated',
})
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  }); */

// delete a blog
Blog.findByIdAndDelete(blogId)
  .then((data) => {
    console.log('Blog is removed: ', data);
  })
  .catch((err) => {
    console.log(err);
  });

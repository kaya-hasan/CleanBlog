const express = require('express');
const mongoose = require('mongoose');

const ejs = require('ejs');
const path = require('path');
const Blog = require('./models/Blog');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/cleanblog-test-db');
//TEMPLATES ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ROUTES
app.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.render('index', {
    blogs,
  });
});

const blogId = '646e00d6c043d5e9b39a735c';
Blog.findByIdAndUpdate(blogId, {
  title: 'Blog Title 3',
  description: 'Blog description 3 lorem ipsum ',
})
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add_post', (req, res) => {
  res.render('add_post');
});
app.get('/post', (req, res) => {
  res.render('post');
});

app.post('/blogs', async (req, res) => {
  await Blog.create(req.body);
  res.redirect('/');
});

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda baslatildi`);
});

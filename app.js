const express = require('express');
const mongoose = require('mongoose');

const ejs = require('ejs');
const path = require('path');
const Post = require('./models/Post');
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
  const posts = await Post.find({});
  res.render('index', {
    posts,
  });
});

app.get('/posts/:id', async (req, res) => {
  //console.log(req.params.id);
  //res.render('about');
  const post = await Post.findById(req.params.id);
  res.render('post', {
    post,
  });
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

app.post('/posts', async (req, res) => {
  await Post.create(req.body);
  res.redirect('/');
});

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda baslatildi`);
});

/*const blogId = '646e00d6c043d5e9b39a735c';
Blog.findByIdAndUpdate(blogId, {
  title: 'Blog Title 3',
  description: 'Blog description 3 lorem ipsum ',
})
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });*/

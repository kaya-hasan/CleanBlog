const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');

const ejs = require('ejs');
const path = require('path');
const Post = require('./models/Post');
const fs = require('fs');
const app = express();
const postController = require('./controllers/postControllers');
const pageController = require('./controllers/pageControllers');

mongoose
  .connect(
    'mongodb+srv://h3kaya:FWaCPm1yxiSPySSO@cleanblogcluster.is2338f.mongodb.net/cleanblog-app?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('DB CONNECTED !');
  })
  .catch((err) => {
    console.log(err);
  });
//TEMPLATES ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//ROUTES
app.get('/', postController.getAllPosts);
app.get('/posts/:id', postController.getPost);
app.post('/posts', postController.createPost);
app.put('/posts/:id', postController.updatePost);
app.delete('/posts/:id', postController.deletePost);

app.get('/about', pageController.getAboutPage);
app.get('/add_post', pageController.getAddPage);
app.get('/posts/edit/:id', pageController.getEditPage);

const port = process.env.PORT || 5000;

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

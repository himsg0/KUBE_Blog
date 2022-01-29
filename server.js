const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./models/db');
const blogRouter = require('./routes/blogs');
//bring in method override
const methodOverride = require('method-override');

//bring in mongoose
const Blog = require('./models/Blog');

const req = require('express/lib/request');
const res = require('express/lib/response');
const { response, request } = require('express');

//bring in method override
const app= express();
app.use('/blogs',blogRouter);
app.use(express.urlencoded({extended:false}));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
//route for the index
app.get('/', async (request, response) => {
    let blogs = await Blog.find().sort({ timeCreated: 'desc' });
  
    response.render('index', { blogs: blogs });
  });

app.use(express.static("public"));
//connect to mongoose

connectDB();
const Port= process.env.Port || 3000;

//storage



app.listen(Port, () => {
    console.log('Express server started at port : 3000');
});


//set template engine

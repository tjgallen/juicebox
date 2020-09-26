const express = require('express');
const tagsRouter = express.Router();
const { getAllTags, getPostsByTagName } = require('../db');
const postsRouter = require('./posts');

tagsRouter.use((req, res, next) => {
    console.log("A request is being made to /tags");
  
    next(); // THIS IS DIFFERENT
  });

tagsRouter.get('/', async (req, res) => {
    const tags = await getAllTags();
  
    res.send({
      tags
    });
  });

  tagsRouter.get('/:tagName/posts', async (req, res, next) => {
    const tagName = req.params.tagName;
    try {
      // use our method to get posts by tag name from the db
      const posts = await getPostsByTagName(tagName);
      posts = allPosts.filter(post => {
        return post.active || (req.user && post.author.id === req.user.id);
      });
      
      // send out an object to the client 
      res.send({ posts })
    } catch ({ name, message }) {
      next({name, message})
      // forward the name and message to the error handler
    }
  });

  module.exports = tagsRouter;
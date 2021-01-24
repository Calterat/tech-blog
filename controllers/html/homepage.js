const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Blog, User, Comment } = require('../../models');

router.get('/', (req, res) => {
  Blog.findAll({
    attributes: [
      'id',
      'title',
      'body',
      'created_at'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_body', 'blog_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(data => {
      const blogs = data.map(blog => blog.get({ plain: true }));
      res.render('homepage', {blogs, loggedIn: req.session.loggedIn});
    })
    .catch(err => res.status(500).json(err));  
});

router.get('/blogs/:id', (req, res) => {
  Blog.findOne({
    where: { id: req.params.id },
    attributes: [
      'id', 
      'title', 
      'body', 
      'created_at'
    ],
    include: [
      // includes the Comment model here
      {
        model: Comment,
        attributes: ['id', 'comment_body', 'blog_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(data => {
      if (!data) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      // serialize the data
      const blog = data.get({ plain: true });

      // pass data to template
      res.render('single-blog', {blog, loggedIn: req.session.loggedIn});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;
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

module.exports = router;
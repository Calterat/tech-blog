const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Blog, User, Comment } = require('../../models');
// const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
  Blog.findAll({
    where: { user_id: req.session.user_id },
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
      // serialize data before passing to template
      const blogs = data.map(blog => blog.get({ plain: true }));
      res.render('dashboard', { blogs, loggedIn: true })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// router.get('/edit/:id', withAuth, (req, res) => {
//   Post.findOne({
//     where: { id: req.params.id },
//     attributes: [
//       'id', 
//       'post_url', 
//       'title', 
//       'created_at',
//       [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']  
//     ],
//     include: [
//       // includes the Comment model here
//       {
//         model: Comment,
//         attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//         include: {
//           model: User,
//           attributes: ['username']
//         }
//       },
//       {
//         model: User,
//         attributes: ['username']
//       }
//     ]
//   })
//     .then(dbPostData => {
//       if (!dbPostData) {
//         res.status(404).json({ message: 'No post found with this id' });
//         return;
//       }

//       // serialize the data
//       const post = dbPostData.get({ plain: true });

//       // pass data to template
//       res.render('edit-post', {post, loggedIn: req.session.loggedIn});
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });

// })

module.exports = router;
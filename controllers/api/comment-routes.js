const router = require('express').Router();
const { Comment } = require('../../models');

router.get('/', (_req, res) => {
  Comment.findAll()
    .then(commentData => res.json(commentData))
    .catch(err => res.status(500).json(err))
});

router.get('/:id', (req, res) => {
  Comment.findOne({
    where: { id: req.params.id }
  })
    .then(commentData => {
      if (!commentData) {
        res.status(404).json({ message: 'No comment found with this id' });
        return;
      }
      res.json(commentData);
    })
    .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
  Comment.create({
    comment_body: req.body.comment_body,
    user_id: req.body.user_id,
    blog_id: req.body.blog_id
  })
    .then(commentData => res.json(commentData))
    .catch(err => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
  Comment.update(req.body, {
    where: { id: req.params.id }
  })
    .then(commentData => {
      if (!commentData[0]) {
        res.status(404).json({ message: 'No comment found with this id' });
        return;
      }
      res.json(commentData);
    })
    .catch(err => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  Comment.destroy({
    where: { id: req.params.id }
  })
    .then(commentData => {
      if (!commentData) {
        res.status(404).json({ message: 'No comment found with this id' });
        return;
      }
      res.json(commentData);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
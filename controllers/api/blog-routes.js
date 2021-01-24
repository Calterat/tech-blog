const router = require('express').Router();
const { Blog } = require('../../models');

router.get('/', (_req, res) => {
  Blog.findAll()
    .then(blogData => res.json(blogData))
    .catch(err => res.status(500).json(err))
});

router.get('/:id', (req, res) => {
  Blog.findOne({
    where: { id: req.params.id }
  })
    .then(blogData => {
      if (!blogData) {
        res.status(404).json({ message: 'No blog found with this id' });
        return;
      }
      res.json(blogData);
    })
    .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
  if (req.session) {
    Blog.create({
      title: req.body.title,
      body: req.body.body,
      user_id: req.session.user_id
    })
      .then(blogData => res.json(blogData))
      .catch(err => res.status(500).json(err));
  }
});

router.put('/:id', (req, res) => {
  Blog.update(req.body, {
    where: { id: req.params.id }
  })
    .then(blogData => {
      if (!blogData[0]) {
        res.status(404).json({ message: 'No blog found with this id' });
        return;
      }
      res.json(blogData);
    })
    .catch(err => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  Blog.destroy({
    where: { id: req.params.id }
  })
    .then(blogData => {
      if (!blogData) {
        res.status(404).json({ message: 'No blog found with this id' });
        return;
      }
      res.json(blogData);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
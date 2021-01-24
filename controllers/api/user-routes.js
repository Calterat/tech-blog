const router = require('express').Router();
const { User } = require('../../models');

router.get('/', (_req, res) => {
  User.findAll()
    .then(userData => res.json(userData))
    .catch(err => res.status(500).json(err))
});

router.get('/:id', (req, res) => {
  User.findOne({
    where: { id: req.params.id }
  })
    .then(userData => {
      if (!userData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(userData);
    })
    .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
    .then(userData => {
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.loggedIn = true;
        res.json(userData);
      })
    })
    .catch(err => res.status(500).json(err));
});

router.post('/login', (req, res) => {
  User.findOne({
    where: { email: req.body.email }
  })
    .then(data => {
      if (!data) {
        res.status(400).json({ message: 'No user with that email address!' });
        return;
      }

      const validPassword = data.checkPassword(req.body.password);

      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect Password' });
        return;
      }

      req.session.save(() => {
        req.session.user_id = data.id;
        req.session.username = data.username;
        req.session.loggedIn = true;

        res.json({ user: data, message: 'You are now logged in!' });
      })
    })
  .catch(err => res.status(500).json(err));
})

router.put('/:id', (req, res) => {
  User.update(req.body, {
    where: { id: req.params.id }
  })
    .then(userData => {
      if (!userData[0]) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(userData);
    })
    .catch(err => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  User.destroy({
    where: { id: req.params.id }
  })
    .then(userData => {
      if (!userData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(userData);
    })
    .catch(err => res.status(500).json(err));
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else res.status(400).end();
});


module.exports = router;
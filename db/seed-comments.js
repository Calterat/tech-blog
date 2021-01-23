const { Comment } = require('../models');

const commentData = [
  {
    comment_body: 'Test Comment for Title 1',
    body: 'This is the comment to the first blog test!',
    user_id: 1,
    blog_id: 1
  },
  {
    comment_body: 'Test Comment for Title 2',
    body: 'This is the comment to the second blog test!',
    user_id: 2,
    blog_id: 2
  }
]

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;
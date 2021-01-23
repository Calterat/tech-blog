const { Blog }= require('../models');

const blogData = [
  {
    title: 'Test Title 1',
    body: 'This is the body to the first blog test!',
    user_id: 1
  },
  {
    title: 'Test Title 2',
    body: 'This is the body to the second blog test!',
    user_id: 2
  }
]

const seedBlog = () => Blog.bulkCreate(blogData);

module.exports = seedBlog;
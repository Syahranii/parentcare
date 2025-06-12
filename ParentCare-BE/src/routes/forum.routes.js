const ForumController = require('../controllers/forum.controller');

module.exports = [
  {
    method: 'GET',
    path: '/api/forum',
    handler: ForumController.getAllPosts
  },
  {
    method: 'POST',
    path: '/api/forum',
    handler: ForumController.createPost
  },
  {
    method: 'POST',
    path: '/api/forum/{id}/answer',
    handler: ForumController.createAnswer
  }
];

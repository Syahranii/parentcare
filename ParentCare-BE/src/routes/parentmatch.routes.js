// src/routes/parentmatch.routes.js

const ParentMatchController = require('../controllers/parentmatch.controller');

module.exports = [
  {
    method: 'POST',
    path: '/api/parentmatch',
    handler: ParentMatchController.handleQuiz
  }
];

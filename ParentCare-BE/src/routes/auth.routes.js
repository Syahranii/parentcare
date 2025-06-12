const AuthController = require('../controllers/auth.controller');

module.exports = [
  {
    method: 'POST',
    path: '/api/auth/register',
    handler: AuthController.register
  },
  {
    method: 'POST',
    path: '/api/auth/login',
    handler: AuthController.login
  },
  {
    method: 'POST',
    path: '/api/auth/forgot-password',
    handler: AuthController.forgotPassword
  },
  {
  method: 'GET',
  path: '/api/auth/check',
  handler: AuthController.checkAuth
},
{
  method: 'GET',
  path: '/api/auth/me',
  handler: AuthController.getCurrentUser
},
  {
    method: 'POST',
    path: '/api/auth/logout',
    handler: AuthController.logout
  }
];

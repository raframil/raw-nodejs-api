const UserController = require('./controllers/user')

module.exports = [
  {
    endpoint: '/users',
    method: 'GET',
    handler: UserController.list
  },
  {
    endpoint: '/users/:id',
    method: 'GET',
    handler: UserController.listById
  },
  {
    endpoint: '/users',
    method: 'POST',
    handler: UserController.create
  },
  {
    endpoint: '/users/:id',
    method: 'PUT',
    handler: UserController.update
  },
  {
    endpoint: '/users/:id',
    method: 'DELETE',
    handler: UserController.delete
  }
]

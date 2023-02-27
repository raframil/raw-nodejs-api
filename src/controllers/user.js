const mockUsers = require('../mock/users')

module.exports = {
  list (request, response) {
    const { order } = request.query
    const sortedUsers = mockUsers.sort((a, b) => {
      if (order === 'desc') {
        return a.id < b.id ? 1 : -1
      }

      return a.id > b.id ? 1 : -1
    })

    response.send(200, sortedUsers)
  },

  listById (request, response) {
    const { id } = request.params

    const user = mockUsers.find((user) => user.id === Number(id))

    if ((!user)) {
      response.send(404, { error: 'User not found' })
    }

    response.send(200, user)
  },

  create (request, response) {
    const { body } = request

    console.log(body)

    const lastUserId = mockUsers[mockUsers.length - 1].id
    const newUser = {
      id: lastUserId + 1,
      ...body
    }

    mockUsers.push(newUser)
    response.send(201, newUser)
  },

  update (request, response) {
    const { id } = request.params
    const { body } = request

    const user = mockUsers.find((user) => user.id === Number(id))

    if (!user) {
      response.send(404, { error: 'User not found' })
    }

    const users = mockUsers.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          ...body
        }
      }

      return user
    })

    response.send(200, users)
  },

  delete (request, response) {
    const { id } = request.params

    const user = mockUsers.find((user) => user.id === Number(id))

    if (!user) {
      response.send(404, { error: 'User not found' })
    }

    const users = mockUsers.filter((user) => user.id !== Number(id))

    response.send(200, users)
  }
}

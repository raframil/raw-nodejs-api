const http = require('http')
const url = require('url')

const bodyParser = require('./helpers/body-parser')
const routes = require('./routes')

const server = http.createServer((request, response) => {
  // eslint-disable-next-line n/no-deprecated-api
  const parsedUrl = url.parse(request.url, true)

  let { pathname } = parsedUrl
  let id = null

  const splitEndpoint = pathname.split('/').filter(Boolean)

  if (splitEndpoint.length > 1) {
    pathname = `/${splitEndpoint[0]}/:id`
    id = splitEndpoint[1]
  }

  const route = routes.find((routeObject) => {
    return routeObject.endpoint === pathname && routeObject.method === request.method
  })

  if (!route) {
    response.writeHead(404, { 'Content-Type': 'text/html' })
    response.end(`Cannot ${request.method} ${request.url}`)
  }

  response.send = (statusCode, body) => {
    response.writeHead(statusCode, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(body))
  }

  request.query = parsedUrl.query
  request.params = { id }

  if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
    bodyParser(request, () => route.handler(request, response))
  } else {
    route.handler(request, response)
  }
})

server.listen(3000, () => {
  console.log('Server is running on port 3000. URL: http://localhost:3000')
})

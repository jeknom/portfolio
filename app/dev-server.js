const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const app = next({ dev: true })
const port = 3000
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl

    if (pathname === '/a') {
      app.render(req, res, '/a', query)
    } else if (pathname === '/b') {
      app.render(req, res, '/b', query)
    } else {
      handle(req, res, parsedUrl)
    }
  }).listen(port, "0.0.0.0", (err) => {
    if (err) throw err
    console.log(`> Listening on port ${port}`)
  })
})
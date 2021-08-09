const { createServer } = require('https')
const { parse } = require('url')
const next = require('next')
const fs = require('fs')
const app = next({ dev: false })
const port = 3000
const handle = app.getRequestHandler()
const options = {
  key: fs.readFileSync('./certs/server.key'),
  cert: fs.readFileSync('./certs/server.crt'),
  ca: fs.readFileSync ('./certs/server.ca-bundle')
};

app.prepare().then(() => {
  createServer(options, (req, res) => {
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
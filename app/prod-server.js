const { createServer } = require('https')
const { parse } = require('url')
const next = require('next')
const fs = require('fs')
const app = next({ dev: false })
const port = 3000
const handle = app.getRequestHandler()
const options = {
  key: fs.readFileSync(process.env.SSL_CERT_KEY_PATH),
  cert: fs.readFileSync(process.env.SSL_CERT_PATH),
  ca: fs.readFileSync (process.env.SSL_CERT_BUNDLE_PATH)
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
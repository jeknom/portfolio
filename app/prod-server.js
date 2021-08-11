const { createServer } = require('https')
const { parse } = require('url')
const next = require('next')
const fs = require('fs')
const app = next({ dev: false })
const port = 3000
const handle = app.getRequestHandler()

if (!process.env.SSL_CERT_KEY_FILENAME) {
  console.error('Missing SSL key filename environment variable!');

  return;
}

if (!process.env.SSL_CERT_FILENAME) {
  console.error('Missing SSL cert filename environment variable!');

  return;
}

const options = {
  key: fs.readFileSync(`/opt/portfolio/${process.env.SSL_CERT_KEY_FILENAME}`),
  cert: fs.readFileSync(`/opt/portfolio/${process.env.SSL_CERT_FILENAME}`),
};

if (process.env.SSL_CERT_BUNDLE_PATH) {
  options['ca'] = fs.readFileSync(`/opt/portfolio/${process.env.SSL_CERT_BUNDLE_FILENAME}`);
}

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
const express = require('express');
const next = require('next');

const dotenv = require('dotenv');
dotenv.config();

const port = parseInt(process.env.PORT, 10);
const dev = process.env.IS_DEV === 'true' ? true : false;
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log('> Server berjalan dengan baik menggunakan PORT ' + port);
  });
});

const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const app = express();
const { logErrors, boomErrorHandler } = require('./middlewares/error.handler');

const port = 3000;

// Middleware
app.use(express.json());

const whitelist = ['http://localhost:3000', 'http://localhost:8080'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}

app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

routerApi(app);

// The order of the middlewares is important
app.use(logErrors);
app.use(boomErrorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

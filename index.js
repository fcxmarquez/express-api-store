const express = require('express');
const routerApi = require('./routes');
const app = express();
const { logErrors, boomErrorHandler } = require('./middlewares/error.handler');

const port = 3000;

// Middleware
app.use(express.json());

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

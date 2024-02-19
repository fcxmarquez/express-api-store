const express = require("express");
const cors = require("cors");
const routerApi = require("./routes");

const app = express();
const {
  logGenericErrors,
  boomErrorHandler,
  ormErrorHandler,
} = require("./middlewares/error.handler");
const { checkApiKey } = require("./middlewares/auth.handler");

const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

const whitelist = ["http://localhost:3000", "http://localhost:8080"];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(options));

require("./utils/auth"); // load passport strategies

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/new-route", checkApiKey, (req, res) => {
  res.send("Hello World!");
});

routerApi(app);

// The order of the middlewares is important
app.use(boomErrorHandler);
app.use(ormErrorHandler);
app.use(logGenericErrors);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

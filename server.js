const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const expressSession = require("express-session");
const dotenv = require("dotenv");

// 개발모드
const dev = process.env.NODE_ENV !== "production";
// 배포모드
const prod = process.env.NODE_ENV === "production";

const app = next({ dev });
const port = process.env.PORT || 5000;
const handle = app.getRequestHandler();

dotenv.config();

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(morgan("dev"));
  server.use(express.json);
  server.use(cookieParser());
  server.use(
    expressSession({
      resave: false,
      saveUninitialized: false,
      secret: {
        httpOnly: true,
        secure: false
      }
    })
  );

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.post("/api/world", (req, res) => {
    console.log(req.body);
    return res.json(req.body);
  });

  server.listen(port, () => {
    console.log(`running on port ${port}`);
  });
});

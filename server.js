const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cookieParser = require("cookie-parser");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./auth");
const { PORT, JWT_SECRET, DATABASE_URL } = require("./config");
const cors = require("cors");
const router = express.Router();
const bodyParser = require("body-parser");
const houseRouter = require("./routers/house.router");
const userRouter = require("./routers/user.router");
const authRouter = require("./routers/auth.router");

app.use(bodyParser.json());
app.use(cors());

app.use(cookieParser());

app.use(passport.initialize());

passport.use(localStrategy);
passport.use(jwtStrategy);

const jwtAuth = passport.authenticate("jwt", {
  session: false
});

app.use("/auth", authRouter);
app.use("/house", jwtAuth, houseRouter);
app.use("/user", jwtAuth, userRouter);
app.get("/testing", (req, res) => {
  res.json({ yep: "its working" });
});

app.use("*", (req, res) => {
  // handle errors

  if (err.status === 400) res.status(400).send(err);
});
let server;

function runServer(dbURL, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      dbURL,
      err => {
        if (err) {
          return reject(err);
        }
        server = app.listen(port, () => {
          console.log(`app listening on port ${port} 😇`);
          resolve();
        });
      }
    );
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log("Closing server");
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

// this block runs if you start with "node server.js"
if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = {
  app,
  runServer,
  closeServer
};

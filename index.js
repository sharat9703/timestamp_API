var express = require("express");
// var path = require("path");
// var cookieParser = require("cookie-parser");
// var logger = require("morgan");

// var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");
// var timeRouter = require("./routes/time");
var app = express();

// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);
// app.use("/users", usersRouter);
// app.use("/api", timeRouter);
app.get("/", (req, res) => {
  res.status(200).send("Hello from API server");
});
app.get(
  "/api/:date",
  function (req, res, next) {
    const dateparam = req.params.date;
    if (!dateparam) {
      req.date = new Date();
    } else if (/\d{5,}/.test(dateparam)) {
      req.date = new Date(parseInt(dateparam));
    } else {
      req.date = new Date(dateparam);
    }

    if (isNaN(req.date)) {
      return res.json({ error: "Invalid Date" });
    }

    next();
  },
  (req, res) => {
    res.status(200).json({
      unix: Number(req.date.getTime()),
      utc: req.date.toUTCString(),
    });
  },
);
var listener = app.listen(8080, function () {
  console.log("Listening on port " + listener.address().port);
});

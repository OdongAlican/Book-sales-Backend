const express = require("express"),
  bodyParser = require("body-parser"),
  userModel = require("../model/userModel"),
  bookModel = require("../model/booksModel"),
  _ = require("lodash"),
  jwt = require("jsonwebtoken");

const dotenv = require("dotenv").config({ path: ".env" });

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/api/books", (req, res) => {
  const newBook = req.body;

  bookModel.create(newBook).then(
    book => {
      res.json(book);
    },
    err => {
      res.send(err);
    }
  );
});

app.get("/api/books/:id", (req, res) => {
  bookModel.findOne({ _id: req.params.id }, (err, book) => {
    if (!book) {
      res.status(400).send("no book with that particular ID");
    } else {
      res.json(book);
    }
  });
});

app.get("/api/books", (req, res) => {
  bookModel.find({}).then(
    books => {
      res.json(books);
    },
    err => {
      res.send(err);
    }
  );
});

app.put("/api/books/:id", (req, res) => {
  const bookUpdate = req.body;

  bookModel.findOne({ _id: req.params.id }, (err, book) => {
    if (!book) {
      res.status(400).send("no user with that ID");
    } else {
      _.merge(book, bookUpdate);

      book.save((err, saved) => {
        if (err) {
          res.status(400).send("user not updated");
        } else {
          res.json(saved);
        }
      });
    }
  });
});

app.delete("/api/books/:id", (req, res) => {
  bookModel.findByIdAndRemove({ _id: req.params.id }, (err, removed) => {
    if (err) {
      res.status(400).send("user not updated");
    } else {
      res.json(removed);
    }
  });
});

app.post("/api/user/createUser", async function(req, res) {
  const newUser = req.body;

  await userModel.create(newUser).then(
    user => {
      res.json(user);
    },
    err => {
      res.send(err.errmsg);
    }
  );
});

app.post("/api/user/login", async function(req, res) {
  const user = await userModel.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).send("Email or password is not correct");
  }

  if (req.body.password != user.password) {
    return res.status(400).send("Email or Password is not correct");
  }

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

  res.header("auth_token", token).send(token);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

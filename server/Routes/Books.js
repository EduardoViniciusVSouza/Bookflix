const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { Op } = require("sequelize");
const { AdminVerify } = require("../Functions/AdminVerify");
const { decodeToken } = require("../Functions/DecodeToken");
const verifyJWT = require("../Functions/JwtVerify");
const { Profile } = require("../Models/Profiles");

const book = require("../Models/Books").Book;

router.get("/", async (req, res) => {
  const books = await book.findAll();

  res.send(books);
});

router.get('/reserved', async (req, res) => {
  const books = await book.findAll({
    where: {
      profileId: {
        [Op.ne]: null
      }
    }
  })


  res.send(books)
})

router.get("/:bookId", async (req, res) => {
  const findBook = await book.findOne({
    where: {
      bookId: req.params.bookId,
    },
  });

  res.json(findBook);
});

router.post("/register", verifyJWT, async (req, res) => {
  const token = decodeToken(req.headers["x-acess-token"]);

  console.log(token);

  if (AdminVerify(token)) {
    const newBook = book.create({
      title: req.body.title,
      description: req.body.description,
      profileId: null,
    });

    res.json({ status: "success" });
  }
});

router.put("/:bookId", verifyJWT, async (req, res) => {
  const token = decodeToken(req.headers["x-acess-token"]);

  if (AdminVerify(token)) {
    await book.update(
      {
        title: req.body.title,
        description: req.body.description,
      },
      {
        where: {
          bookId: req.params.bookId,
        },
      }
    );

    res.json({'success': true})
  }
});

router.put("/reservar/:bookId", verifyJWT, async (req, res) => {
  const token = decodeToken(req.headers["x-acess-token"]);

  const profile = Profile.findOne({
    where: {
      profileId: token.profileId,
    },
  });

  const newBook = await book.findOne({
    where: {
      bookId: req.params.bookId,
    },
  });


  let values = { profileId: token.profileId };
  let selector = {
    where: { bookId: req.params.bookId },
  };

  // atualiza a chave estrangeira, salvando quem reservou o livro
  if (newBook.profileId == null) { 
    book.update(values, selector).then(function () {
    });
  }
});

router.delete("/:bookId", verifyJWT, async (req, res) => {
  const token = decodeToken(req.headers["x-acess-token"]);

  if (AdminVerify(token)) {
    await book.destroy({
      where: {
        bookId: req.params.bookId,
      },
    });
  }

  res.json({'success': true})
});

module.exports = {
  BookRouter: router,
};

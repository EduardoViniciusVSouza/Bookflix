const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const profile = require("../Models/Profiles").Profile;
const account = require("../Models/Accounts").Account;
const bookModel = require("../Models/Books").Book;

router.post("/login", async (req, res) => {
  const clientEmail = req.body.email;
  const clientPassword = req.body.password;

  console.log(clientEmail, " ", clientPassword);

  const findAccount = await account.findOne({
    where: {
      email: clientEmail,
    },
  });

  if (findAccount) {
    const validPass = await bcrypt.compare(
      clientPassword,
      findAccount.password
    );


    if (validPass) {
      const findProfile = await profile.findOne({
        where: {
          profileId: findAccount.profileId,
        },
      });
      
      // payload que vai ser enviado no token
      const profileJson = {
          profileId: findProfile.profileId,
          name: findProfile.name,
          access: findProfile.permission,
        };
        
        const token = jwt.sign({ profileJson }, process.env.SECRET, {
            expiresIn: "3600s",
        });
        return res.json({ success: true, token: token });
    }
  } else {
    res.json({ success: false });
  }
});

router.post("/register", async (req, res) => {
  const ifExists = await account.findOne({
    where: {
      email: req.body.clientEmail,
    },
  });

  if (ifExists == null) {
    const newProfile = await profile.create({
      name: req.body.clientUsername,
      permission: 1,
    });

    const hash = await bcrypt.hash(req.body.clientPassword, 10);
    //cadastra o email e senha no banco de dados // adicionar criptografada no futuro
    const newAccount = await account.create({
      email: req.body.clientEmail,
      password: hash,
      profileId: newProfile.profileId,
    });

    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

router.post("/registerAdmin", async (req, res) => {
  const ifExists = await account.findOne({
    where: {
      email: req.body.clientEmail,
    },
  });

  if (ifExists == null) {
    const newProfile = await profile.create({
      name: req.body.clientUsername,
      permission: 2,
    });

    const hash = await bcrypt.hash(req.body.clientPassword, 10)

    const newAccount = await account.create({
      email: req.body.clientEmail,
      password: hash,
      profileId: newProfile.profileId,
    });

    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

module.exports = {
  AuthenticationRouter: router,
};

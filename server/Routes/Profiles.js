const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const AdminVerify = require("../Functions/AdminVerify").AdminVerify;

const { decodeToken } = require("../Functions/DecodeToken");
const verifyJwt = require("../Functions/JwtVerify");

const profile = require("../Models/Profiles").Profile;

router.get("/", async (req, res) => {
  const profiles = await profile.findAll();

  console.log(profiles)

  res.json(profiles);
});

router.get("/:profileId", verifyJwt, async (req, res) => {
    const token = decodeToken(req.header['x-acess-token'])

    const findProfile = profile.findOne({
        where: {
            profileId: req.params.profileId
        }
    })

    res.json(findProfile)

});

router.put("/:profileId", verifyJwt, async (req, res) => {
  const token = decodeToken(req.headers["x-acess-token"]);

  if (AdminVerify(token)) {
    await profile.update(
      {
        name: req.body.name,
      },
      {
        where: {
          profileId: req.params.profileId,
        },
      }
    );
    res.json({'success': true})
  } else {
    res.json({'success': false})

  }
});




module.exports = {
  profileRouter: router,
};

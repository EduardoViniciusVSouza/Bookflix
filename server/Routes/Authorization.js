const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const verifyJwt = require('../Functions/JwtVerify')

const account = require('../Models/Accounts').Account


router.get('/', verifyJwt,async (req, res) => {


    const accounts = account.findAll()

    res.json(accounts)
})


module.exports = {
    AuthorizationRouter: router
}
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const account = require('../Models/Accounts').Account


router.get('/', async (req, res) => {


    const accounts = account.findAll()

    res.json(accounts)
})


module.exports = {
    AccountRouter: router
}
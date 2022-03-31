const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')


const reservedBook = require('../Models/ReservedBooks').ReservedBook


router.get('/', async (req, res) => {


    const reservedBooks = reservedBook.findAll()

    res.json(reservedBooks)
})


module.exports = {
    ReservedBookRouter: router
}
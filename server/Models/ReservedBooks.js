const db = require('../Database/Database')


const Book = db.sequelize.define('Books', {
    bookId: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: db.Sequelize.STRING
    },
    description: {
        type: db.Sequelize.STRING
    },
})



module.exports = {ReservedBook: this.ReservedBook}
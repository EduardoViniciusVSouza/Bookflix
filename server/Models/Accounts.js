const db = require('../Database/Database')

const Account = db.sequelize.define('Accounts', {
    email: {
        type: db.Sequelize.STRING,
        unique: true
    },
    password: {
        type: db.Sequelize.STRING
    },
    access: {
        type: db.Sequelize.INTEGER
    },
    
})




module.exports = {
    Account: Account
}
const db = require('../Database/Database')


const Profile = db.sequelize.define("Profiles", {
    profileId: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: db.Sequelize.STRING
    },
    surname: {
        type: db.Sequelize.STRING
    },
    permission: {
        type: db.Sequelize.INTEGER
        
    }
})


module.exports = {Profile: Profile}
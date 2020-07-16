const orm = require("../../db")
const Sequelize = require("sequelize")
const project = require("../project")


const student = orm.define("students", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    surname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dateofbirth: {
        type: Sequelize.DATEONLY,
        allowNull: false
    }
},
{
    timestamps: false
})

student.hasMany(project,{
    foreignKey : "studentid"
})


module.exports = student
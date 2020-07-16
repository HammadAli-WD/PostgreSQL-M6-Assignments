const Sequelize  = require("sequelize")
const { NUMBER, STRING, INTEGER } = require("sequelize")
const orm = require("../../db")

const project = orm.define("projects", {
    projectid: {
        type: NUMBER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: STRING,
        allowNull: false
    },
    studentid: {
        type: NUMBER,
        allowNull: false
    },
    description: {
        type: STRING,
        allowNull: false
    },
    repourl: {
        type: STRING,
        allowNull: false
    },
    liveurl: {
        type: STRING,
        allowNull: false
    },
    creationdate: {
        type: Date,
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = project
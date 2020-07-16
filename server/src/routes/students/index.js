const express = require("express")
const student = require("../../models/student")
const { Op, QueryTypes, Sequelize } = require("sequelize")
const sequelize = require("../../db")
const project = require("../../models/project")

const router = express.Router()



router.post("/", async (req, res) => {
    console.log("test")
    try {
        delete req.body.id
        const Student = await student.create(req.body)
        res.send(Student)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

router.get("/", async(req, res) =>{
    try {
        const limit = req.query.limit || 10
        const offset = req.query.offset || 0
        const order = req.query.order || "asc"

        delete req.query.limit
        delete req.query.offset
        delete req.query.order

        const students = await student.findAll({
            where : {
                ...req.query
            },
            offset: offset,
            limit: limit,
            order: [
                ["name", order]
            ],
            include: project
        })
        res.send(students)
        
    }
    catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})


router.get("/search", async (req, res) => {
    try {
        //sequelize.query(`SELECT * FROM "students"`, QueryTypes.SELECT)
        const result = await student.findAll({
            where: {
                [Op.or]: [
                        {
                            name: {
                                [Op.iLike]: `%${req.query.name}%`
                            }
                        },
                        {
                            surname: {
                                [Op.iLike]: `%${req.query.surname}%`
                            }
                        }
                ]
            }
        })

        res.send(result)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})



router.get("/:id", async (req, res)=>{
    try {
        const Student = await student.findOne({
            where: {
                id: req.params.id
            },
            include: project
        })

        if (Student)
            res.send(Student)
        else
            res.status(404).send("Not found")

    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})


router.delete("/:id", async (req, res) => {
    try {
        const result = await student.destroy({
            where: {
                id: req.params.id
            }
        })

        if (result === 1)
            res.send("DELETED")
        else
            res.status(404).send("Not Found")

    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})


router.put("/:id", async (req, res)=> {
    try {
        const Student = await student.update({
            ...req.body
        }, {
            where: { id: req.params.id }
        })

        if (Student[0] === 1)
            res.send("OK")
        else
            res.status(404).send("Not found")

    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

module.exports = router
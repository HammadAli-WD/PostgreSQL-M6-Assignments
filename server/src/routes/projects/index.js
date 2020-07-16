const express = require("express")
const project = require("../../models/project")

const router = express.Router()
//here I am using id because project should be for a particular id
router.get("/:id", async (req, res)=>{
    try{
        res.send(await project.findAll({
            where: {
                projectid: req.params.id
            }
        }))
    }
    catch(e){
        console.log(e)
        res.status(500).send(e)
    }
})

router.post("/:id", async (req,res)=>{
    try{
        res.send(await project.create({
            ...req.body,
            studentid: req.params.id
        }))
    }
    catch(e){
        console.log(e)
        res.status(500).send(e)
    }
})

router.put("/:projectid", async (req, res)=>{
    try{
        delete req.body.studentid // we don't want to update the studentid field. Once a project is created, it should be fixed on one book
        //delete req.body.userid // we don't want to update the userid field. Once a projecter wrote a project, that project is fixed to him

        const result = await project.update({ //update the project
            ...req.body  // <= all the fields included in the req.body
        }, {
            where: { // for the element with id = req.params.projectId
                projectid: req.params.projectid
            }
        })

        if (result[0] === 1) // if we updated something
            res.send("OK") // we return OK 
        else 
            res.status(404).send("Not found") // probably the ID was not there, NOT FOUND
    }
    catch(e){
        console.log(e)
        res.status(500).send(e)
    }
})

router.delete("/:projectId", async (req, res)=>{
    try{
        res.send(await project.destroy({
            where: { id: req.params.projectId }
        }))
    }
    catch(e){
        console.log(e)
        res.status(500).send(e)
    }
})

module.exports = router
const express = require("express")
const db = require("../../db")

const router = express.Router()





router.get("/:id", async (req, res)=>{
    const response = await db.query('SELECT id, name, surname, email, dateofbirth FROM "students" WHERE id = $1', 
                                                                                        [ req.params.id ])

    if (response.rowCount === 0) 
        return res.status(404).send("Not found")

    res.send(response.rows[0])
})

router.post("/", async (req, res) => {
    const resp = await db.query(`INSERT INTO "students" (id, name, surname, email, dateofbirth)
                                    Values ($1, $2, $3, $4, $5)
                                    RETURNING *`,
                                    [ req.body.id, req.body.name, req.body.surname, req.body.email, req.body.dateofbirth])

    //console.log(resp)
    res.send(resp.rows[0])
})

module.exports = router
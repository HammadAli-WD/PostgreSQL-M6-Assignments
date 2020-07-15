const express = require("express")
const db = require("../../db")

const router = express.Router()

router.get("/", async(req, res) =>{
    const order = req.query.order || 'asc'
    const offset = req.query.offset || 0
    const limit = req.query.limit || 10

    delete req.query.order
    delete req.query.offset
    delete req.query.limit

    let query = 'SELECT * FROM "students"'

    const params = []
    for (queryParam in req.query){
        params.push(req.query[queryParam])
        if (params.length === 1) // for the first, I'll add the where clause
            query += `WHERE ${queryParam} = $${params.length} `
        else // the all the rest, it'll start with AND
            query += ` AND ${queryParam} = $${params.length} `
    }

    query += " ORDER BY name " + order  //adding the sorting 

    params.push (limit)
    query += ` LIMIT $${params.length} `
    params.push(offset)
    query += ` OFFSET $${params.length}`
    // query += ` LIMIT $${params.length+1} OFFSET $${params.length+2}` //adding the pagination
    // params.push(limit)
    // params.push(offset) 
    console.log(query)

    //you can also specify just the fields you are interested in, like:
    //SELECT id, category, img, title, price FROM "students" 
    const response = await db.query(query, params)
    res.send(response.rows)
})



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
router.delete("/:id", async (req, res) => {
    const response = await db.query(`DELETE FROM "students" WHERE id = $1`, [ req.params.id ])

    if (response.rowCount === 0)
        return res.status(404).send("Not Found")
    
    res.send("OK")
})


router.put("/:id", async (req, res)=> {
    try {
        let params = []
        let query = 'UPDATE "students" SET '
        for (bodyParamName in req.body) {
            query += // for each element in the body I'll add something like parameterName = $Position
                (params.length > 0 ? ", " : '') + //I'll add a coma before the parameterName for every parameter but the first
                bodyParamName + " = $" + (params.length + 1) // += Category = $1 

            params.push(req.body[bodyParamName]) //save the current body parameter into the params array
        }

        params.push(req.params.id) //push the id into the array
        query += " WHERE id = $" + (params.length) + " RETURNING *" //adding filtering for id + returning
        console.log(query)

        const result = await db.query(query, params) //querying the DB for updating the row

        // const result = await db.query(`UPDATE "students" 
        //                             SET Category = $1,
        //                             Img = $2,
        //                             Title = $3,
        //                             Price = $4
        //                             WHERE id = $5
        //                             RETURNING *`,
        //                             [ req.body.category, req.body.img, req.body.title, req.body.price, req.params.id])
        
        if (result.rowCount === 0) //if no element match the specified id => 404
            return res.status(404).send("Not Found")

        res.send(result.rows[0]) //else, return the updated version
    }
    catch(ex) {
        console.log(ex)
        res.status(500).send(ex)
    }
})

module.exports = router
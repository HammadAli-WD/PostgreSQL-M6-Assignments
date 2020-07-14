const express = require("express")
const db = require("../../db")

const router = express.Router()

/* const getAll = (request, response) => {
    db.query('SELECT * FROM data.projects;SELECT * FROM data.students', (error, data) => {
      if (error) {
        throw error;
      }
      response.status(200).json({projects: data[0].rows, students: data[1].rows});
    }) */
  
router.get('/all', async (req, res) => {
    db.query('SELECT * FROM projects;SELECT students.email FROM students', (error, data) => {
        if (error) {
          throw error;
        }
        res.status(200).json({projects: data[0].rows, students: data[1].rows});
      })
});


router.get("/:projectid", async (req, res)=>{
    const response = await db.query('SELECT projectid, name, description, creationdate, repourl, liveurl, studentid FROM "projects" WHERE projectid = $1', 
                                                                                        [ req.params.projectid ])

    if (response.rowCount === 0) 
        return res.status(404).send("Not found")

    res.send(response.rows[0])
})



router.post("/", async (req, res) => {
    const resp = await db.query(`INSERT INTO "projects" (projectid, name, description, creationdate, repourl, liveurl, studentid)
                                    Values ($1, $2, $3, $4, $5, $6, $7)
                                    RETURNING *`,
                                    [ req.body.projectid, req.body.name, req.body.description, req.body.creationdate, req.body.repourl, req.body.liveurl, req.body.studentid])

    //console.log(resp)
    res.send(resp.rows[0])
})

router.put("/:projectid", async (req, res)=> {
    try {
        let params = []
        let query = 'UPDATE "projects" SET '
        for (bodyParamName in req.body) {
            query += // for each element in the body I'll add something like parameterName = $Position
                (params.length > 0 ? ", " : '') + //I'll add a coma before the parameterName for every parameter but the first
                bodyParamName + " = $" + (params.length + 1) // += Category = $1 

            params.push(req.body[bodyParamName]) //save the current body parameter into the params array
        }

        params.push(req.params.projectid) //push the projectid into the array
        query += " WHERE projectid = $" + (params.length) + " RETURNING *" //adding filtering for projectid + returning
        console.log(query)

        const result = await db.query(query, params) //querying the DB for updating the row

        // const result = await db.query(`UPDATE "Books" 
        //                             SET Category = $1,
        //                             Img = $2,
        //                             Title = $3,
        //                             Price = $4
        //                             WHERE projectid = $5
        //                             RETURNING *`,
        //                             [ req.body.category, req.body.img, req.body.title, req.body.price, req.params.projectid])
        
        if (result.rowCount === 0) //if no element match the specified projectid => 404
            return res.status(404).send("Not Found")

        res.send(result.rows[0]) //else, return the updated version
    }
    catch(ex) {
        console.log(ex)
        res.status(500).send(ex)
    }
})

module.exports = router
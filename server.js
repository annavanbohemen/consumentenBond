const express = require("express")
const cors = require("cors")
const app = express()
const db = require("./databaseContacten")

// set cors to allow app localhost 
app.use(cors({origin: 'http://localhost:4200'}))

//parse json
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// Server port
const HTTP_PORT = 8000
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});
//Root endpoint
app.get("/", (req, res, next) => {
    res.json({ "message": "Ok" })
});

//get contacten
app.get("/contacten/list", (req, res) => {
    var sql = "select * from contacten"
    db.all(sql, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": {contacts: rows}
        })
    });
})


//Default response for any other request
app.use(function (req, res) {
    res.status(400)
})

//Save contacts
app.post("/contacten/save", (req, res, next) => {
        var data = {
            work: req.body.work,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone
        }
    
        saveContact(data, (err) => {
                    if(err) {
                        res.status(400).json({"error": err.message})
                        return;
                    }
    
                    res.json({
                        "contact": data
                    })
                });
});

//remove contact
app.delete("contacten/delete", (req, res) => {
    var data = {
        id: req.body.id
    }

    removeContact(data, (err) => {
        if(err) {
            res.status(400).json({"error": err.message})
            return;
        }

        res.json({
            "message": "success"
        })
    });
})

// functions for db calls
function saveContact(data, callback){
    var sql = 'INSERT INTO contactenAdvanced (name, email, phone) VALUES (?,?,?)'
    var params = [data.name, data.email, data.phone]

    db.run(sql, params, callback)
}

function removeContact(data, callback){
    var sql = 'DELETE FROM contactenAdvanced WHERE id = ?'
    var params = [data.id]

    db.run(sql, params, callback)
}

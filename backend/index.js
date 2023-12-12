import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"shivamSQL2112",
    database:"test"
}) 

app.use(express.json())   //middleware
app.use(cors())

app.get("/" , (req,res)=>{
    res.json("HELLO USER")
})

app.get("/music",(req,res)=>{
    const q = "SELECT * FROM music"
    db.query(q,(err,data)=>{
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.get("/artist",(req,res)=>{
    const q = "SELECT * FROM artist"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/band",(req,res)=>{
    const q = "SELECT * FROM band"
    db.query(q,(err,data)=>{
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.get("/albums",(req,res)=>{
    const q = "SELECT * FROM albums"
    db.query(q,(err,data)=>{
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.get("/bandalbum",(req,res)=>{
    const q = "SELECT * FROM band B , albums A WHERE B.albumid = A.albumid"
    db.query(q,(err,data)=>{
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.get("/hiphop",(req,res)=>{
    const q = "SELECT * FROM music WHERE genre = 'Hip-Hop' "
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/pop",(req,res)=>{
    const q = "SELECT * FROM music WHERE genre = 'Pop' "
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/classic",(req,res)=>{
    const q = "SELECT * FROM music WHERE genre = 'Classic' "
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})



app.post("/music",(req,res)=>{
    const q = "INSERT INTO music (`musicid`,`musicname`,`genre`,`artist`) VALUES (?)"
    const values =[
        req.body.musicid,
        req.body.musicname,
        req.body.genre,
        req.body.artist
    ]
    db.query(q , [values] , (err , data) =>{
        if (err) return res.json(err)
        return res.json("Item added into the library")
    })
})

app.post("/artist",(req,res)=>{
    const q = "INSERT INTO artist (`artistid`,`artistname`,`artistnationality`,`dateofbirth`,`partinband`) VALUES (?)"
    const values =[
        req.body.artistid,
        req.body.artistname,
        req.body.artistnationality,
        req.body.dateofbirth,
        req.body.partinband
    ]
    db.query(q , [values] , (err , data) =>{
        if (err) return res.json(err)
        return res.json("Item added into the library")
    })
})

app.post("/band",(req,res)=>{
    const q = "INSERT INTO band (`bandid`,`bandname`,`bandyear`,`albumid`) VALUES (?)"
    const values =[
        req.body.bandid,
        req.body.bandname,
        req.body.bandyear,
        req.body.albumid
    ]
    db.query(q , [values] , (err , data) =>{
        if (err) return res.json(err)
        return res.json("Item added into the library")
    })
})

app.delete("/music/:musicid",(req,res)=>{
    const musicID = req.params.musicid;
    const q = "DELETE FROM music WHERE musicid = ?"

    db.query(q,[musicID],(err,data)=>{
        if (err) return res.json(err)
        return res.json("Item deleted from the library")
    })
})

app.delete("/artist/:artistid",(req,res)=>{
    const artistID = req.params.artistid;
    const q = "DELETE FROM artist WHERE artistid = ?"

    db.query(q,[artistID],(err,data)=>{
        if (err) return res.json(err)
        return res.json("Item deleted from the library")
    })
})

app.delete("/band/:bandid",(req,res)=>{
    const bandID = req.params.bandid;
    const q = "DELETE FROM band WHERE bandid = ?"

    db.query(q,[bandID],(err,data)=>{
        if (err) return res.json(err)
        return res.json("Item deleted from the library")
    })
})

app.put("/music/:mId",(req,res)=>{
    const musicID = req.params.mId;
    const q = "UPDATE music SET `musicid` = ? , `musicname`= ? , `genre`= ? , `artist`= ?  WHERE musicid = ?"
    const values =[
        req.body.musicid,
        req.body.musicname,
        req.body.genre,
        req.body.artist
    ]

    db.query(q,[...values,musicID],(err,data)=>{
        if (err) return res.json(err)
        return res.json("Item updated from the library")
    })
})

app.listen(8800 , ()=>{
    console.log("Connected to backend ! ")
})
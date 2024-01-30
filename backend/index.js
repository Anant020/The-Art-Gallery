import express from "express";
import mysql from 'mysql';
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "sql6.freesqldatabase.com",
  user: "sql6680802",
  password: "IF2bEbIR8b",
  database: "sql6680802",
  port: 3306,
});

db.connect((err) => {
  if (err) {
      console.error('Error connecting to MySQL database:', err);
  } else {
      console.log('Connected to MySQL database');
  }
});



app.get("/", (req,res)=>{
    res.json("Hello this is the Backend");
})


app.get("/books", (req,res)=>{
    const q = "SELECT * FROM books";

    db.query(q,(err,data)=>{
        if(err){
            console.log(err);
            return res.json(err);    
        } 
        return res.json(data);
    });
});

app.post("/books", (req, res) => {
   
    const q = "INSERT INTO books(`title`,`desc`,`cover`) VALUES (?)";
  
    const values = [
      req.body.title,
      req.body.desc,
      req.body.cover,
    ];


    db.query(q, [values], (err, data) => {
      if (err) return res.send(err);
      return res.json("Book has been created successfully");
    });
  });


  app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = " DELETE FROM books WHERE id = ? ";
  
    db.query(q, [bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });

  app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title`= ?, `desc`= ?,`cover`= ? WHERE id = ?";
  
    const values = [
      req.body.title,
      req.body.desc,
      req.body.cover,
    ];
  
    db.query(q, [...values,bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });

app.listen(8800,()=>{
    console.log("connected to backend");
})
// const express=require('express');
// const db=require('mongoose');
// const bodyparser=require('body-parser');
// const cors=require('cors');

// const app=express();            
// app.use(bodyparser.json());
// app.use(cors());

// db.connect('mongodb://localhost:27017/todo',{
//     family:4
// });

// db.connection.on('error',console.error.bind(console,"error throw while connecting to db"));

// db.connection.once('open',()=>{
//     console.log('db connected');
// });

// const List=db.model('list',new db.Schema({
//     title:String,
//     description:String,
//     date:String

// }));

// app.post('/post',async(req,res)=>{
// const lists=await new List(req.body).save();
// res.send(lists);
// });

// app.get('/getAll',async(req,res)=>{
// const lis=await List.find();
// res.send(lis);
// });

// app.get('/getById/:id',async(req,res)=>{
// const id=req.params.id;
// const li=await  List.findOne({_id:id});
// res.send(li);
// });

// app.delete('/delete/:id',async(req,res)=>{
// const id=req.params.id;
// const l=await  List.deleteOne({_id:id});
// res.send(l);
// });

// app.put('/update/:id',async(req,res)=>{
// const id=req.params.id;
// const {title,description}=req.body;
// const l=await List.updateOne({_id:id},{$set:{title:title,description:description }});
// res.send(l);
// });

// app.listen(3000);

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'todo'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

const tableName = 'list';
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS ${tableName} (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    date VARCHAR(255)
  )
`;

connection.query(createTableQuery, (err, result) => {
  if (err) {
    console.error('Error creating table:', err);
  } else {
    console.log('Table created successfully');
  }
});

app.post("/post", (req, res) => {
  const { title, description, date } = req.body;

  const query = `INSERT INTO ${tableName} (title, description, date) VALUES (?, ?, ?)`;
  connection.query(query, [title || null, description, date], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.send(result);
  });
});

app.get('/getAll', (req, res) => {
  const query = `SELECT * FROM ${tableName}`;
  connection.query(query, (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

app.get('/getById/:id', (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM ${tableName} WHERE id = ?`;
  connection.query(query, [id], (err, rows) => {
    if (err) throw err;
    res.send(rows[0]);
  });
});

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM ${tableName} WHERE id = ?`;
  connection.query(query, [id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const { description } = req.body;

    const query = `UPDATE ${tableName} SET description = ? WHERE id = ?`;
    connection.query(query, [description, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.send(result);
    });
});





const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = { username, password: hashedPassword };
    connection.query('INSERT INTO e_details(username, password) values (?,?)', [username, hashedPassword], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error registering user');
        }
        console.log('User registered');
        res.status(201).send(req.body);
    });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    connection.query('SELECT * FROM e_details WHERE username = ?', [username], async (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error logging in');
        }
        if (result.length === 0) {
            return res.status(401).send({ error: 'Invalid username or password' });
        }
        const validPassword = await bcrypt.compare(password, result[0].password);
        if (!validPassword) {
            return res.status(401).send({ error: 'Invalid username or password' });
        }
        const accessToken = jwt.sign({ username: username }, process.env.ACCESS_SECRET_TOKEN);
        res.status(200).send(result);
    });
});


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser'); // Import body-parser

const app = express();
const port = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'web_know'
});
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database as id ' + connection.threadId);
});

app.use(express.static('public'));
app.use(bodyParser.json()); // Use body-parser middleware to parse JSON request bodies
app.use(cors());

app.post('/register', (req, res) => {
    const { email, password } = req.body;
    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    connection.query(sql, [email, password], (err, result) => {
        if (err) {
            console.error('Error executing SQL query: ' + err.stack);
            res.status(500).send('Internal Server Error');
            return;
        }
        console.log('User registered successfully');
        res.status(200).send('Registration successful');
    });
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

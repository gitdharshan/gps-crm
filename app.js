
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port =  2300;

// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'newdb'
});



// Connect to MySQL
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});



// Set up Express to use EJS as the view engine
app.set('view engine', 'ejs');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

 
// Route to display user details
app.get('/', (req, res) => {

  
   connection.query('SELECT * FROM employees', (err, results) => {
        if (err) throw err;
        res.render('index', { users: results });
    });
});





// Route to add user
app.post('/adduser', (req, res) => {
    const { User_name, Contact_no, Email, Company_name, Mobile_number,City } = req.body;
    const query = 'INSERT INTO employees (User_name, Contact_no, Email,Company_name, Mobile_number,City) VALUES (?, ?, ?,?,?,?)';
    connection.query(query, [User_name,Contact_no, Email,Company_name,Mobile_number,City], (err, results) => {
        if (err) throw err;
        console.log('User added to database');
        res.redirect('/');
    });
});
app.post('/deleteuser/:ID', (req, res) => {
  const userid = req.params.ID;
  const query = 'DELETE FROM employees WHERE ID = ?';
  connection.query(query, [userid], (err, result) => {
      if (err) throw err;
      console.log('User deleted from database');
      res.redirect('/');
  });
});
// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});




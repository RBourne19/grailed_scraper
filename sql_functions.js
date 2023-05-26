// Import the required packages
const mysql = require('mysql2');
const dotenv = require("dotenv");
require("dotenv").config();
// Create a connection pool

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: `${process.env.DB_PW}`,
  database: `${process.env.DB}`,
  connectionLimit: 10,
  multipleStatements: true
});

// Execute a query
exports.test = test = async () => {pool.getConnection((err, connection) => {
  if(err){
    return console.error(err);
  }
  connection.query('SELECT * FROM grailed_data', (error, results, fields) => {
    if (error) {
      console.error(error);
      return;
    }
  
    // Process the query results
    console.log(results);
  });
  
});
}
exports.insertData = insertData = async (title, size, price, description, imageLink, urlLink) => {
    try {
      const connection = await pool.promise().getConnection();
      
      const query = 'INSERT INTO grailed_data (title, size, price, description, imgLink, grailedLink) VALUES (?, ?, ?, ?, ?, ?)';
      const values = [title, size, price, description, imageLink, urlLink];
  
      const [result] = await connection.query(query, values);
      console.log('Data inserted:', result);
  
      connection.release();
    } catch (err) {
      console.error('Error inserting data:', err);
    }
}

exports.recentData = recentData = async () => {
  try {
    const connection = await pool.promise().getConnection();

    const query = 'SELECT * FROM grailed_data ORDER BY id DESC LIMIT 40';

    const [rows, fields] = await connection.query(query);
    
    connection.end();
    return rows;
  } catch (err) {
    console.error('Error retrieving recent inserts:', err);
  }
}
// Close the connection pool

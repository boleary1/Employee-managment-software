var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,
  user: "root",
  password: "root",
  database: "employee_listdb"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});
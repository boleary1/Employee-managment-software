var mysql = require("mysql2");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "127.0.0.1",

    // Your port; if not 3306
    port: 3306,
    user: "root",
    password: "root",
    database: "employee_listDB"
});



function init() {
    console.log("Welcome to the Employee managment software!")
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all departments?",
                "Add a department?",
                "View all roles?",
                "Add a role?",
                "View an employee?",
                "Add an employee?",
                "Update an employee's role?",
            ]
        })
    .then(function (answer) {
        console.log(answer)
        switch (answer.action) {
            case "View all departments?":
                
                viewDepartments();
                break;

            case "Add a department?":
                addDepartments();
                break;

            case "View all roles?":
                viewRoles();
                break;

            case "Add a role?":
                addRole();
                break;

            case "View employee list?":
                viewEmployees();
                break;

            case "Add an employee?":
                addEmployee();
                break;

            case "Update an employee's role?":
                updateRole();
                break;
        }
    });
}

connection.connect(function (err) {
    if (err) console.log(err);
    init();
});


function viewDepartments() {
    console.log()
};
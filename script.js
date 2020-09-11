var mysql = require("mysql2");
var inquirer = require("inquirer");
const { lastIndexOf } = require("mysql2/lib/constants/charset_encodings");

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
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        connection.end();
    });
};
function addDepartments() {
    let current_id = 0
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        current_id = (res.slice(-1).pop()).id;
    });

    inquirer
        .prompt({
            name: "addDepartment",
            type: "input",
            message: "What Depatment would you like to add?",

        })
        .then(function (answer) {
            connection.query(
                "INSERT INTO department SET ?",
                {
                    id: (current_id + 1),
                    department_name: answer.addDepartment
                },
                function (err) {
                    if (err) console.log(err);
                    console.log("Your department was created successfully!");
                })
            console.log(answer)
            connection.end();

        });
};

function viewRoles() {
    connection.query("SELECT * FROM employee_role", function (err, res) {
        if (err) console.log(err);
        // Log all results of the SELECT statement
        console.table(res);
        connection.end();
    });
};

function addRole() {
    let current_id = 1
    let department_list = [];
    connection.query("SELECT * FROM employee_role", function (err, res) {
        if (err) console.log(err);
        current_id = (res.slice(-1).pop()).id; //finds current id
    });
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) console.log(err);
        res.forEach(department => {
            department_list.push(department.department_name);
        });
    });

    inquirer
        .prompt([
            {
                name: "addRole",
                type: "input",
                message: "What is the job title that you would you like to add?",
            },
            {
                name: "addRole_salary",
                type: "input",
                message: "What is the salary for the job that you're adding?",
            },
            {
                name: "addRole_department",
                type: "list",
                message: "What department is the job in?",
                choices: department_list,

            },
        ])
        .then(function (answer) {

                connection.query(
                    "INSERT INTO employee_role SET ?",
                    {
                        id: (current_id + 1),
                        title: answer.addRole,
                        department_name: answer.addRole_department, //needs to be a variable
                        salary: answer.addRole_salary,
                    },
                    function (err) {
                        if (err) console.log(err);
                        console.log("Your role was created successfully!");
                    })
                connection.end();


        });
};
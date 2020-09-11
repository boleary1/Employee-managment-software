DROP DATABASE IF EXISTS employee_listDB;
CREATE database employee_listDB;

USE employee_listDB;
CREATE TABLE employee
(
  id INT NOT NULL AUTO_INCREMENT,
    position INT NULL,
    first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    role_id INT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE department
(
  id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30) NULL,
    PRIMARY KEY (id)
);
CREATE TABLE employee_role
(
  id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NULL,
    department_name VARCHAR(30) NULL,
    salary DECIMAL(10,0) NULL,
    PRIMARY KEY (id)
);

SELECT *
FROM employee;
select *
from department;
select *
from employee_role;
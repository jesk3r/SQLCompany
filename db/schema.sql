DROP DATABASE IF EXISTS company_MOD12;
CREATE DATABASE company_MOD12;

USE company_MOD12;

CREATE TABLE Deparment(
  deparment_id INT NOT NULL AUTO_INCREMENT,
  deparment_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (deparment_id)
);

CREATE TABLE Role(
  role_id INT NOT NULL AUTO_INCREMENT,
  role_title VARCHAR(30) NOT NULL,
  role_salary DECIMAL NOT NULL,
  department_id INT,
  PRIMARY KEY (role_id),
  FOREIGN KEY (department_id) REFERENCES Deparment(deparment_id)
);

CREATE TABLE Employee(
  employee_id INT NOT NULL AUTO_INCREMENT,
  employee_first_name VARCHAR(30) NOT NULL,
  employee_last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manenger_id INT,
  PRIMARY KEY (employee_id),
  FOREIGN KEY (role_id) REFERENCES Role(role_id),
  FOREIGN KEY (manenger_id) REFERENCES Employee(employee_id)
);
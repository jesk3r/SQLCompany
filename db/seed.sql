INSERT INTO Deparment (deparment_id, deparment_name)
VALUES
    ('1','Sales'),
    ('2','Marketing'),
    ('3','Tech'),
    ('4','Acounting');


INSERT INTO Role (role_id,role_title,role_salary,department_id)
VALUES
    ('1','Marketer', '50000', '2'),
    ('2','Sales Man', '70000', '1'),
    ('3','IT Man', '100000', '3'),
    ('4','Acountant', '80000', '4');


INSERT INTO Employee (employee_first_name,employee_last_name,role_id)
VALUES
    ('Dheeraj', 'Thind', '3'),
    ('John', 'Doe', '3'),
    ('Robert', 'Easterling', '3'),
    ('Scott', 'Martin', '4'),
    ('David', 'Thomas', '1'),
    ('Alfonso', 'Lemus', '1');

 
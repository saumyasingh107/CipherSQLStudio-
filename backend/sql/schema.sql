CREATE TABLE IF NOT EXISTS assignments (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  question_text TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS assignment_tables (
  assignment_id INT NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
  table_name TEXT NOT NULL,
  PRIMARY KEY (assignment_id, table_name)
);

-- Example learner tables (admin can replace with any dataset).
CREATE TABLE IF NOT EXISTS customers (
  id INT PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
  id INT PRIMARY KEY,
  customer_id INT NOT NULL REFERENCES customers(id),
  total_amount NUMERIC(10,2) NOT NULL,
  order_date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS departments (
  id INT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS employees (
  id INT PRIMARY KEY,
  name TEXT NOT NULL,
  department_id INT NOT NULL REFERENCES departments(id),
  salary NUMERIC(10,2) NOT NULL,
  joining_date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
  id INT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS order_items (
  id INT PRIMARY KEY,
  order_id INT NOT NULL REFERENCES orders(id),
  product_id INT NOT NULL REFERENCES products(id),
  quantity INT NOT NULL
);

CREATE TABLE IF NOT EXISTS exam_scores (
  id INT PRIMARY KEY,
  student_name TEXT NOT NULL,
  subject TEXT NOT NULL,
  score INT NOT NULL
);

INSERT INTO assignments (title, description, difficulty, question_text)
VALUES
(
  'Top Spending Customers',
  'Find customers with highest spend from orders data.',
  'medium',
  'Return customer name and total spend, sorted by total spend descending.'
),
(
  'City Wise Customer Count',
  'Count how many customers are in each city.',
  'easy',
  'Return city and customer_count for each city, sorted by customer_count descending.'
),
(
  'Department Salary Analysis',
  'Analyze employee salaries by department.',
  'medium',
  'Return department name and average salary. Show only departments with average salary above 50000.'
),
(
  'Top Revenue Products',
  'Find products generating highest revenue from order items.',
  'hard',
  'Return product name and total revenue (quantity * price), sorted by total revenue descending.'
),
(
  'Subject Toppers',
  'Find highest score per subject.',
  'medium',
  'Return subject, top_score and number_of_students_with_top_score for each subject.'
)
ON CONFLICT (title) DO NOTHING;

INSERT INTO customers (id, name, city)
VALUES
(1, 'Ava', 'Austin'),
(2, 'Noah', 'Seattle'),
(3, 'Mia', 'Boston')
ON CONFLICT DO NOTHING;

INSERT INTO orders (id, customer_id, total_amount, order_date)
VALUES
(1, 1, 230.00, '2025-01-10'),
(2, 2, 80.00, '2025-01-12'),
(3, 1, 100.00, '2025-01-15'),
(4, 3, 420.00, '2025-01-17')
ON CONFLICT DO NOTHING;

INSERT INTO departments (id, name)
VALUES
(1, 'Engineering'),
(2, 'Sales'),
(3, 'Finance')
ON CONFLICT DO NOTHING;

INSERT INTO employees (id, name, department_id, salary, joining_date)
VALUES
(1, 'Liam', 1, 75000.00, '2022-04-12'),
(2, 'Emma', 1, 68000.00, '2023-01-02'),
(3, 'Olivia', 2, 52000.00, '2021-09-21'),
(4, 'Ethan', 2, 48000.00, '2024-03-10'),
(5, 'Sophia', 3, 61000.00, '2020-07-14')
ON CONFLICT DO NOTHING;

INSERT INTO products (id, name, category, price)
VALUES
(1, 'Keyboard', 'Electronics', 50.00),
(2, 'Mouse', 'Electronics', 25.00),
(3, 'Notebook', 'Stationery', 8.00),
(4, 'Backpack', 'Accessories', 40.00)
ON CONFLICT DO NOTHING;

INSERT INTO order_items (id, order_id, product_id, quantity)
VALUES
(1, 1, 1, 2),
(2, 1, 2, 1),
(3, 2, 3, 5),
(4, 3, 4, 1),
(5, 4, 1, 3),
(6, 4, 4, 2)
ON CONFLICT DO NOTHING;

INSERT INTO exam_scores (id, student_name, subject, score)
VALUES
(1, 'Aarav', 'Math', 88),
(2, 'Diya', 'Math', 94),
(3, 'Riya', 'Math', 94),
(4, 'Arjun', 'Science', 91),
(5, 'Kabir', 'Science', 85),
(6, 'Ira', 'English', 90),
(7, 'Naina', 'English', 90)
ON CONFLICT DO NOTHING;

INSERT INTO assignment_tables (assignment_id, table_name)
SELECT a.id, 'customers'
FROM assignments a
WHERE a.title = 'Top Spending Customers'
ON CONFLICT DO NOTHING;

INSERT INTO assignment_tables (assignment_id, table_name)
SELECT a.id, 'orders'
FROM assignments a
WHERE a.title = 'Top Spending Customers'
ON CONFLICT DO NOTHING;

INSERT INTO assignment_tables (assignment_id, table_name)
SELECT a.id, 'customers'
FROM assignments a
WHERE a.title = 'City Wise Customer Count'
ON CONFLICT DO NOTHING;

INSERT INTO assignment_tables (assignment_id, table_name)
SELECT a.id, 'departments'
FROM assignments a
WHERE a.title = 'Department Salary Analysis'
ON CONFLICT DO NOTHING;

INSERT INTO assignment_tables (assignment_id, table_name)
SELECT a.id, 'employees'
FROM assignments a
WHERE a.title = 'Department Salary Analysis'
ON CONFLICT DO NOTHING;

INSERT INTO assignment_tables (assignment_id, table_name)
SELECT a.id, 'products'
FROM assignments a
WHERE a.title = 'Top Revenue Products'
ON CONFLICT DO NOTHING;

INSERT INTO assignment_tables (assignment_id, table_name)
SELECT a.id, 'order_items'
FROM assignments a
WHERE a.title = 'Top Revenue Products'
ON CONFLICT DO NOTHING;

INSERT INTO assignment_tables (assignment_id, table_name)
SELECT a.id, 'orders'
FROM assignments a
WHERE a.title = 'Top Revenue Products'
ON CONFLICT DO NOTHING;

INSERT INTO assignment_tables (assignment_id, table_name)
SELECT a.id, 'exam_scores'
FROM assignments a
WHERE a.title = 'Subject Toppers'
ON CONFLICT DO NOTHING;

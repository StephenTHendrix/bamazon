DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Spyro", "Video Games", 40.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Zelda", "Video Games", 60.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Donnie Darko", "Movies", 20.00, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apples", "Food", 1.00, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Oranges", "Food", 0.80, 900);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Rope", "Dog Toys", 12.95, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ball", "Dog Toys", 8.29, 90);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Squeaky Plush Animal", "Dog Toys", 11.99, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shirt", "Clothes", 15.00, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shampoo", "Hygiene", 13.95, 120);
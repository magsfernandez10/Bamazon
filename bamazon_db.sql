DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	ID INT(15) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    product_price DECIMAL(8,2) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    PRIMARY KEY (ID)
);

INSERT INTO products (product_name, department_name, product_price, stock_quantity)
VALUES  ('Lavender Soap', 'Beauty', 5.99, 100),
		('Lemon Soap', 'Beauty', 5.99, 100),
		('Lavender Detergent', 'Household', 15.99, 150),
		('Eucalyptus Soap', 'Beauty', 5.99, 100),
		('Eucalyptus Detergent', 'Household', 15.99, 150),
		('Lemon Detergent', 'Household', 15.99, 100),
		('Pine Soap', 'Beauty', 5.99, 150),
		('Pine Detergent', 'Household', 15.99, 150),
		('Basil Soap', 'Beauty', 5.99, 100),
		('Basil Detergent', 'Househoold', 15.99, 150);

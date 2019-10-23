var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Benice2people",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  start();
});

function showProducts() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    console.table(res);
  });
}

function viewLowInventory() {
  connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
    if (err) throw err;
    console.table(res);
  });
}

var choiceArray = ["View products for sale", "View low inventory", "Add to inventory", "Add new product", "Exit"];

function start() {
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "choice",
          type: "list",
          choices: choiceArray,
          message: "Hello Mr. Manager. What would you like to do?"
        },
      ])
      .then(function (answer) {

        if (answer.choice === choiceArray[0]) {

          showProducts();
          start();
        }
        else if (answer.choice === choiceArray[1]) {
          viewLowInventory();
          start();
        }

        else if (answer.choice === choiceArray[2]) {
          showProducts();
          connection.query("SELECT * FROM products", function (err, results) {
            if (err) throw err;
            inquirer
              .prompt([
                {
                  name: "id",
                  type: "input",
                  message: "Enter id of new inventory"
                },
                {
                  name: "number",
                  type: "number",
                  message: "Enter amount of new inventory"
                },
              ])
              .then(function (answer) {
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                  if (results[i].item_id == answer.id) {
                    chosenItem = results[i];
                  }
                }
                connection.query(
                  "UPDATE products SET ? WHERE ?",
                  [
                    {
                      stock_quantity: chosenItem.stock_quantity + answer.number
                    },

                    {
                      item_id: answer.id
                    }
                  ],
                  function (error) {
                    if (error) throw err;
                    console.log("Updated!");
                    showProducts();
                    start();
                  }
                )
              })
          })
        }


        else if (answer.choice === choiceArray[3]) {
          showProducts();
          connection.query("SELECT * FROM products", function (err, results) {
            if (err) throw err;
            inquirer
              .prompt([
                {
                  name: "name",
                  type: "input",
                  message: "Enter product name"
                },
                {
                  name: "department",
                  type: "input",
                  message: "Enter product department"
                },
                {
                  name: "price",
                  type: "number",
                  message: "Enter price of each product"
                },
                {
                  name: "quantity",
                  type: "number",
                  message: "Enter quantity of new inventory"
                },
              ])
              .then(function (answer) {
              
                connection.query(
                  "INSERT INTO products set ?, ?, ?, ?",
                  [
                    {
                      product_name: answer.name
                    },

                    {
                      department_name: answer.department
                    },

                    {
                      price: answer.price
                    },

                    {
                      stock_quantity: answer.quantity
                    }
                  ],
                  function (error) {
                    if (error) throw err;
                    console.log("Added!");
                    showProducts();
                    start();
                  }
                )
              })
          })
        }

        else if (answer.choice === choiceArray[4]) {
          connection.end();
        }

        else {
          console.log("Something went wrong.")
        }
      });
  });
};

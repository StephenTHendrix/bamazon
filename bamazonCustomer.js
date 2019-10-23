var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Benice2people",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  stayOrGo();
});

function stayOrGo () {
  inquirer
  .prompt ([
    {
      name: "whatDo",
      type: "confirm",
      message: "Would you like to do some shopping?",
      default: false
    }
  ])
    .then(function(answer) {
    if (answer.whatDo === true) {
      showProducts();
      start();
    }

    else {
      connection.end();
    }
    
})
};

function showProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.table(res);
  });
}

function start() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "choice",
          type: "input",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].item_id);
            }
            return choiceArray;
          },
          message: "Welcome to Bamazon! Which product would you like to buy (Item id)?"
        },
        {
          name: "amount",
          type: "input",
          message: "How many would you like to buy?"
        }
      ])
      .then(function(answer) {
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_id == answer.choice) {
            chosenItem = results[i];
          }
        }

        if (chosenItem.stock_quantity >= parseInt(answer.amount)) {
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: chosenItem.stock_quantity - answer.amount
              },

              {
                item_id: chosenItem.item_id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("Coming right up! Your purchase cost comes to $" + answer.amount*chosenItem.price);
              stayOrGo();
            }
          );
        }
        else {
          console.log("Insufficient quantity!");
          stayOrGo();
        }
      });
  });
};

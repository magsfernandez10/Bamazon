let mysql = require("mysql");
let inquirer = require("inquirer");


// create the connection information for the sql database
let connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "",
    database: "bamazon_db"
  });


  connection.connect(function(err) {
    if (err) throw err;
    startPurchase();
    // run the start function after the connection is made to prompt the user
  });

  function startPurchase(answer) {
    inquirer
      .prompt([
        {
          name: "bamazonYesNo",
          type: "confirm",
          message: "Welcome to bAmazon. Would you like to view our products?",
          default: false
        }
      ])
      .then(function(answer) {
    
        if (answer.bamazonYesNo === true) {
          productsTable();
        } else {
          console.log("-----------------------------------------");
          console.log("Maybe Next Time.");
          console.log("-----------------------------------------");
          connection.end();
        }
      });
  }

  function productsTable() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.table(res);
        itemLength = res.length;
        productRequest();
    });
}

function productRequest() {
	inquirer
    .prompt({
      name: "ID",
      type: "input",
      message: "Provide the ID of the item would you like to buy.",
      validate: function(value) {
		if (isNaN(value) === false) {
			return true;
		}
		return false;
      }
    })
    .then(function(product) {
    	var id = product.ID;
    	numberOfUnits(id);
    });
}
function numberOfUnits(id){
	inquirer
    .prompt({
      name: "units",
      type: "input",
      message: "How many units would you like to buy?",
      validate: function(value) {
        if (isNaN(value) === false) {
        	return true;
        }
        return false;
      }
    })
    .then(function(response) {
    	var units = parseInt(response.units);

	   	connection.query("SELECT * FROM products WHERE id=?", [id], function(err, res) {

		    if (err) throw err;

		    var newQuantity = res[0].stock_quantity - units;
        var totalCost = units * res[0].product_price;
        if (units > res[0].stock_quantity) {
		    	console.log("Insufficient quantity!");
		    } else {
		    	updateStock(newQuantity, id, totalCost);
		    }

		    connection.end();
	  	});
    });
}

function updateStock(newQuantity, id, totalCost) {
	connection.query("UPDATE products SET ? WHERE ?",
	    [
	    {
	      stock_quantity: newQuantity
	    },
	    {
	      id: id
	    }
	    ],
	    function(err, res) {
	      console.log("Your total purchase was " + totalCost + ".");
	    }
	)
}

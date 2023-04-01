const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const collection = client.db("<database>").collection("<collection>");

  // Create operation
  collection.insertOne({
    "name": "John Doe",
    "account_balance": 1000.00,
    "transaction_history": [
      { "transaction_date": new Date(), "amount": 500.00, "description": "Deposit" },
      { "transaction_date": new Date(), "amount": -100.00, "description": "Groceries" }
    ]
  }, function(err, result) {
    if (err) throw err;
    console.log("Document inserted");
  });

  // Read operation
  collection.findOne({ "name": "John Doe" }, function(err, result) {
    if (err) throw err;
    console.log(result);
  });

  // Update operation
  collection.updateOne({ "name": "John Doe" }, { $inc: { "account_balance": -50.00 } }, function(err, result) {
    if (err) throw err;
    console.log("Document updated");
  });

  // Delete operation
  collection.deleteOne({ "name": "John Doe" }, function(err, result) {
    if (err) throw err;
    console.log("Document deleted");
  });
});
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const collection = client.db("<database>").collection("<collection>");

  // Find all documents with a balance greater than $500
  collection.find({ "account_balance": { $gt: 500 } }).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
  });

  // Find the average balance across all documents
  collection.aggregate([ { $group: { _id: null, avg_balance: { $avg: "$account_balance" } } } ]).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
  });

  // Find the top 5 users with the highest account balances
  collection.find().sort({ "account_balance": -1 }).limit(5).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
  });

  // Find the total number of transactions for each user
  collection.aggregate([
    { $unwind: "$transaction_history" },
    { $group: { _id: "$name", num_transactions: { $sum: 1 } } }
  ]).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
  });
});

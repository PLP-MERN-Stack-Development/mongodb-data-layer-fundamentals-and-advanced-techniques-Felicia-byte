// queries.js

use plp_bookstore

// Find all books
db.books.find().pretty()

// Find books in a specific genre
db.books.find({ genre: "Fiction" }).pretty()

// Find books published after a certain year
db.books.find({ published_year: { $gt: 1950 } }).pretty()

// Find books by a specific author
db.books.find({ author: "George Orwell" }).pretty()

// Update the price of a specific book
db.books.updateOne({ title: "1984" }, { $set: { price: 12.99 } })

// Delete a book by its title
db.books.deleteOne({ title: "The Alchemist" })

// Books in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } }).pretty()

// Projection: only title, author, price
db.books.find({}, { _id: 0, title: 1, author: 1, price: 1 }).pretty()

// Sort by price ascending/descending
db.books.find().sort({ price: 1 }).pretty()
db.books.find().sort({ price: -1 }).pretty()

// Pagination: 5 per page
db.books.find().skip(0).limit(5).pretty()
db.books.find().skip(5).limit(5).pretty()

// Aggregation: average price by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
])

// Aggregation: author with most books
db.books.aggregate([
  { $group: { _id: "$author", bookCount: { $sum: 1 } } },
  { $sort: { bookCount: -1 } },
  { $limit: 1 }
])

// Aggregation: group books by decade
db.books.aggregate([
  { $project: { decade: { $subtract: ["$published_year", { $mod: ["$published_year", 10] }] } } },
  { $group: { _id: "$decade", count: { $sum: 1 } } },
  { $sort: { _id: 1 } }
])

// Indexing
db.books.createIndex({ title: 1 })
db.books.createIndex({ author: 1, published_year: -1 })

// Performance check
db.books.find({ title: "1984" }).explain("executionStats")

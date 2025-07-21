"use strict";

//Part 1
// Represents a general book in the bookstore
class Book {
  constructor(title, author, isbn, price, availability) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.price = price;
    this.availability = availability;
  }
}

// Represents a user of the bookstore
class User {
  constructor(name, email, userId) {
    this.name = name;
    this.email = email;
    this.userId = userId;
  }
}

// Represents a user's shopping cart
class Cart {
  constructor(user) {
    this.user = user;
    this.items = [];
  }
  // Adds a book to the cart
  addBook(book) {
    this.items.push(book);
  }
  // Removes a book by provided ISBN
  removeBook(isbn) {
    this.items = this.items.filter((book) => book.isbn !== isbn);
  }
  // Calculates total price of books in the cart
  getTotalPrice() {
    return this.items.reduce((total, book) => total + book.price, 0).toFixed(2);
  }
}

// Represents an order placed by a user
class Order {
  constructor(user, books) {
    this.user = user;
    this.books = books;
    this.orderDate = new Date();
    this.totalPrice = this.calculateTotal();
  }
  // Calculates the total price of the order
  calculateTotal() {
    return this.books.reduce((sum, book) => sum + book.price, 0).toFixed(2);
  }
}
//#########################################################

//Part 2
// Loads book data and creates Book instances from external json file
const loadBooks = async function () {
  try {
    const response = await fetch("./data/books.json");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const books = await response.json();
    const bookInstances = books.map((book) => {
      const bookObject = new Book(
        book.title,
        book.author,
        book.isbn,
        book.price,
        book.availability
      );

      return bookObject;
    });
    return bookInstances;
  } catch (error) {
    console.error("Error loading JSON:", error);
  }
};
const books = await loadBooks();

// Loads user data and creates User instances from external json file
const loadUsers = async function () {
  try {
    const response = await fetch("./data/users.json");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const users = await response.json();
    const usersInstances = users.map((user) => {
      const userObject = new User(user.name, user.email, user.userId);

      return userObject;
    });
    return usersInstances;
  } catch (error) {
    console.error("Error loading JSON:", error);
  }
};
const users = await loadUsers();

// console.log(books);
// console.log(users);

// Create carts for each user
const cartAlice = new Cart(users[0]);
const cartMateusz = new Cart(users[1]);
const cartJulia = new Cart(users[2]);

// Simulate users adding books to their carts
// Alice adds two books
cartAlice.addBook(books[0]);
cartAlice.addBook(books[1]);
// Mateusz adds one book
cartMateusz.addBook(books[3]);
// Julia adds one book
cartJulia.addBook(books[2]);

// Create orders based on cart contents
const orderAlice = new Order(users[0], cartAlice.items);
const orderMateusz = new Order(users[1], cartMateusz.items);
const orderJulia = new Order(users[2], cartJulia.items);

// console.log(orderAlice);
// console.log(orderMateusz);
// console.log(orderJulia);
//#########################################################

//Part 3
// Represents a fiction book with a genre
class FictionBook extends Book {
  constructor(title, author, isbn, price, availability, genre) {
    super(title, author, isbn, price, availability);
    this.genre = genre;
  }
}
// Represents a nonfiction book with a subject category
class NonFictionBook extends Book {
  constructor(title, author, isbn, price, availability, subject) {
    super(title, author, isbn, price, availability);
    this.subject = subject;
  }
}

// Create specialized book instances using existing data
const NonFicBook1 = new NonFictionBook(
  ...Object.values(books[0]),
  "Philosophy"
);
const NonFicBook2 = new NonFictionBook(
  ...Object.values(books[1]),
  "Self-improvement"
);
const NonFicBook3 = new NonFictionBook(...Object.values(books[2]), "History");
const FicBook1 = new FictionBook(...Object.values(books[4]), "Fantasy");

// Demonstrate polymorphic interaction
cartAlice.addBook(NonFicBook1); // Treated just like a Book
cartAlice.addBook(FicBook1);
cartMateusz.addBook(FicBook1); // Reusable book instance

// New orders after polymorphic cart updates
const newOrderAlice = new Order(users[0], cartAlice.items);
const newOrderMateusz = new Order(users[1], cartMateusz.items);

// console.log(newOrderAlice);
// console.log(newOrderMateusz);

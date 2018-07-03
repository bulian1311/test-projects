class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const bookList = document.querySelector('#book-list');
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a  href="#" class="delete">X</a></td>
    `;
    bookList.appendChild(tr);
  }

  clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }

  showMessage(message, className) {
    const div = document.createElement('div');
    div.className = 'alert ' + className;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');

    container.insertBefore(div, form);

    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 2000);
  }

  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }
}

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();
    books.forEach(book => {
      const ui = new UI();
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      console.log('qq' + book.isbn, 'ww' + isbn);
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

document.addEventListener('DOMContentLoaded', Store.displayBooks);

//Event listners for add book
document.querySelector('#book-form').addEventListener('submit', event => {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  const book = new Book(title, author, isbn);

  const ui = new UI();
  if (title === '' || author === '' || isbn === '') {
    ui.showMessage('Введите значения', 'error');
  } else {
    ui.addBookToList(book);
    Store.addBook(book);
    ui.showMessage('Книга добавлена', 'success');
    ui.clearFields();
  }

  event.preventDefault();
});

//Event listener for delete
document.querySelector('#book-list').addEventListener('click', event => {
  const ui = new UI();
  ui.deleteBook(event.target);
  Store.removeBook(
    event.target.parentElement.previousElementSibling.textContent
  );
  ui.showMessage('Книга удалена', 'success');
  event.preventDefault();
});

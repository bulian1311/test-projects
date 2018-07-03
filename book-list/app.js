//Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI constructor

function UI() {}

UI.prototype.addBookToList = function(book) {
  const bookList = document.querySelector('#book-list');
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a  href="#" class="delete">X</a></td>
  `;
  bookList.appendChild(tr);
};

UI.prototype.clearFields = function() {
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#isbn').value = '';
};

UI.prototype.showMessage = function(message, className) {
  const div = document.createElement('div');
  div.className = 'alert ' + className;
  div.appendChild(document.createTextNode(message));

  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');

  container.insertBefore(div, form);

  setTimeout(() => {
    document.querySelector('.alert').remove();
  }, 2000);
};

UI.prototype.deleteBook = function(target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
};

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
    ui.showMessage('Книга добавлена', 'success');
    ui.clearFields();
  }

  event.preventDefault();
});

//Event listener for delete
document.querySelector('#book-list').addEventListener('click', event => {
  const ui = new UI();
  ui.deleteBook(event.target);
  ui.showMessage('Книга удалена', 'success');
  event.preventDefault();
});

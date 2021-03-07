//Book constructor
function Book(title, author, isbn){
  this.title=title;
  this.author=author;
  this.isbn=isbn;
}

//UI constructor
function UI(){}

UI.prototype.addBookToList=function(book){
  const list = document.getElementById('book-list');
  const row = document.createElement('tr');
  
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">x</a></td>
  `;

  list.appendChild(row);
}

UI.prototype.showMessage = function(msg, className){
  const div = document.createElement('div');
  div.className = `alert ${className}`;

  div.appendChild(document.createTextNode(msg));

  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');
  container.insertBefore(div, form);

  setTimeout(function(){div.remove()}, 3000);
}

UI.prototype.deleteBook = function(target){
  target.parentElement.parentElement.remove();
}

UI.prototype.clearFields = function(){
  document.getElementById('title').value='';
  document.getElementById('author').value='';
  document.getElementById('isbn').value='';
}

//Event Listeners for add
document.getElementById('book-form').addEventListener('submit', function(e){
  const title=document.getElementById('title').value,
        author=document.getElementById('author').value,
        isbn=document.getElementById('isbn').value;
  
  const book = new Book(title,author,isbn);

  const ui = new UI();
              
  if(title==='' || author==='' || isbn===''){
    ui.showMessage('Please enter all the book details','error');
  }
  else{
    ui.addBookToList(book);
    ui.clearFields();
    ui.showMessage('Book Added!', 'success');
  }
  
  e.preventDefault();
})

//Event Listener for delete
document.getElementById('book-list').addEventListener('click', function(e){
  const ui = new UI();
  if(e.target.className==='delete'){
    ui.deleteBook(e.target);
    ui.showMessage('Book removed!', 'success');
  }

  e.preventDefault();
});
const BASE_URL = 'http://localhost:8080';
const BOOK_URL = '/books';

class Book {
    constructor({isbn, title, authors, pages, publishers, publishDate, genres, dateAcquired, notes, coverLinks}) {
        this.isbn = isbn;
        this.title = title;
        this.authors = authors;
        this.pages = pages;
        this.publishers = publishers;
        this.publishDate = publishDate;
        this.genres = genres;
        this.dateAcquired = dateAcquired;
        this.notes = notes;
        this.coverLinks = coverLinks;
    }
}

function getAllBooks(){
    // fetch all books from server
    fetch(BASE_URL + BOOK_URL, {
        method: 'GET',
    })
    .then(response => {
        if (!response.ok) throw new Error("Bad response from server");
        return response.json();
    })
    .then(data => {
        data.forEach(book => {
            createBook(book)
        })
    })
}

// handle form submit actions
function addBook(){
    const isbnElement = document.getElementById("searchbar");
    const isbn = isbnElement.value;

    const booklist = document.getElementById("booklist");
    booklist.innerHTML = "";

    fetch(BASE_URL + BOOK_URL + `?isbn=${isbn}`, {
        method: 'POST',
    })
        .then(response => {
            if (!response.ok) throw new Error("Bad response from server");
            return response.json();
        })
        .then(data => {
            data.forEach(book => {
                createBook(book)
            })
        })
        .catch(err => console.log("Error: ",err))
}

function searchBook(){
    const isbnElement = document.getElementById("searchbar");
    const isbn = isbnElement.value;
    const booklist = document.getElementById("booklist");
    booklist.innerHTML = "";

    fetch(BASE_URL + BOOK_URL + `?searchTerm=${isbn}`, {
        method: 'GET',
    })
    .then(response => {
        if (!response.ok) throw new Error("Bad response from server");
        return response.json();
    })
    .then(data => {})
}

function createBook(book){
    const booklist = document.getElementById("booklist");
    const bookData = new Book(book);

    // create book item html card
    const bookItem = document.createElement("div");
    bookItem.classList.add("book-item");

    // book title
    const bookTitle = document.createElement("h3");
    bookTitle.innerHTML = bookData.title;
    bookItem.appendChild(bookTitle);

    // book authors
    const bookAuthors = document.createElement("p");
    bookAuthors.innerHTML = bookData.authors;
    bookItem.appendChild(bookAuthors);

    // book cover
    const bookCover = document.createElement("img");
    bookCover.src = bookData.coverLinks["medium"];
    bookItem.appendChild(bookCover);

    // add book item to booklist
    booklist.appendChild(bookItem);
}

const scanner_mode = document.getElementById("scanner_mode");
const searchbar = document.getElementById("searchbar");
searchbar.addEventListener("input", (event) => {
    console.log(scanner_mode.checked);
    if (scanner_mode.checked) {
        const isbn = event.target.value.trim();
        // add if isbn is not empty
        if (isbn.length > 0) {
            addBook();
        }
    }
})

getAllBooks();



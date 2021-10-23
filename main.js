let myLibrary = [];

function Book(title = 'book', author = 'author', pages = 0, haveRead = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
};

function addBook() {
    for (let i = myLibrary.length - 1; i >= 0; i--) {
        let displayDiv = document.createElement('div');
        let titleDiv = document.createElement('div');
        let authorDiv = document.createElement('div');
        let pagesDiv = document.createElement('div');
        let haveReadDiv = document.createElement('div');
        let removeBtn = document.createElement('button');
        let readStatusBtn = document.createElement('button');

        removeBtn.classList.add('remove');
        readStatusBtn.classList.add('change-status');
        readStatusBtn.textContent = 'Change Read Status';

        let btnContainerDiv = document.createElement('div');
        displayDiv.classList.add('display-cards');
        displayDiv.setAttribute('data-id', `${Math.random()}`);
        console.log(displayDiv.attributes)

        titleDiv.textContent = `${myLibrary[i].title}`;
        authorDiv.textContent = `${myLibrary[i].author}`;
        pagesDiv.textContent = `${myLibrary[i].pages}`;
        haveReadDiv.textContent = `${myLibrary[i].haveRead === true ? 'Read!' : 'Not Read!'}`;
        myLibrary[i].dataID = displayDiv.dataset.id;

        displayDiv.append(titleDiv);
        displayDiv.append(authorDiv);
        displayDiv.append(pagesDiv);
        displayDiv.append(haveReadDiv);
        displayDiv.append(removeBtn);
        displayDiv.append(readStatusBtn);
        outputP.append(displayDiv);
        console.log(myLibrary);
    }
}

function removingFromLib(element) {
    element.addEventListener('click', function (e) {
        let givenElement = document.querySelector(`.display-cards[data-id="${this.parentElement.dataset.id}"]`)
        for (let i = 0; i <= myLibrary.length - 1; i++) {
            for (let keys in myLibrary[i]) {
                if (myLibrary[i][keys] == this.parentElement.dataset.id) {
                    myLibrary.splice(i, 1);
                    localStorage.removeItem(String(i));
                    break;
                }
            }
        }
        console.log(myLibrary);
        givenElement.remove();
    })

}


function changeStatus(element) {
    console.log('Accessed');
    element.addEventListener('click', function () {
        for (let i = 0; i <= myLibrary.length - 1; i++) {
            for (let keys in myLibrary[i]) {
                if (myLibrary[i][keys] == this.parentElement.dataset.id) {
                    myLibrary[i].haveRead = myLibrary[i].haveRead == true ? false : true;
                    this.parentElement.children[3].textContent = `${myLibrary[i].haveRead == true ? 'Read!' : 'Not Read!'}`;
                    localStorage.setItem(i, JSON.stringify(myLibrary[i]));

                    console.log(myLibrary);
                }
            }
        }

    })
}

function addToLocalStorage() {

    for (let i = 0; i <= myLibrary.length - 1; i++) {
        localStorage.setItem(i, JSON.stringify(myLibrary[i]));
    }
}

function getFromLocalStorage() {
    if (localStorage.length == 0) {
        return
    }
    else {
        for (let i = 0; i <= localStorage.length - 1; i++) {
            myLibrary[i] = JSON.parse(localStorage.getItem(String(i)));
        }
    }
    addBook();
}

function overallListener(event) {
    let targetEvent = event.target;
    console.log(targetEvent);
    if (targetEvent.classList.contains('remove')) {
        console.log('Accessed');
        let givenElement = document.querySelector(`.display-cards[data-id="${targetEvent.parentElement.dataset.id}"]`)
        for (let i = 0; i <= myLibrary.length - 1; i++) {
            for (let keys in myLibrary[i]) {
                if (myLibrary[i][keys] == givenElement.dataset.id) {
                    myLibrary.splice(i, 1);
                    localStorage.removeItem(String(i));
                    break;
                }
            }
        }
        console.log(myLibrary);
        givenElement.remove();
    }
    else if (targetEvent.classList.contains('change-status')) {
        for (let i = 0; i <= myLibrary.length - 1; i++) {
            for (let keys in myLibrary[i]) {
                if (myLibrary[i][keys] == targetEvent.parentElement.dataset.id) {
                    myLibrary[i].haveRead = myLibrary[i].haveRead == true ? false : true;
                    targetEvent.parentElement.children[3].textContent = `${myLibrary[i].haveRead == true ? 'Read!' : 'Not Read!'}`;
                    localStorage.setItem(i, JSON.stringify(myLibrary[i]));

                    console.log(myLibrary);
                }
            }
        }

    }
}


const inputTitle = document.querySelector('#title');
const inputAuthor = document.querySelector('#author');
const inputPages = document.querySelector('#pages');
const inputhaveRead = document.querySelector('#have-read-true');
const inputhaveNotRead = document.querySelector('#have-read-false');
const submitBtn = document.querySelector('.submit');
const outputP = document.querySelector('.output');


submitBtn.addEventListener('click', function () {
    if (inputTitle.value == "" || inputAuthor.value == "" || inputPages == "") {
        alert('Please fill out all fields!')
        return
    }
    if (myLibrary.length > 0) {
        for (let i = 0; i <= myLibrary.length - 1; i++) {
            for (let keys in myLibrary[i]) {
                if (myLibrary[i][keys] == inputTitle.value) {
                    alert('TItle already exists!');
                    return
                }
            }
        }
    }
    console.log(inputhaveRead.checked, inputhaveNotRead.checked)
    let addedBook = new Book(inputTitle.value, inputAuthor.value, inputPages.value, Boolean(inputhaveRead.checked))
    myLibrary.push(addedBook);
    addToLocalStorage();
    document.querySelectorAll('.display-cards').forEach(element => element.remove());
    console.log(addedBook);
    addBook();
    addedBook = null;
    inputTitle.value = "";
    inputAuthor.value = "";
    inputPages.value = "";
});


getFromLocalStorage();
// let removeBtn = document.querySelectorAll('.remove');
// removeBtn.forEach(removingFromLib);
// document.querySelectorAll('.change-status').forEach(changeStatus);
document.addEventListener('click', overallListener)
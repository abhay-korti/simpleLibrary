let myLibrary = [];

function Book(title = 'book', author = 'author', pages = 0, haveRead = 'false') {
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
        readStatusBtn.textContent = myLibrary[i].haveRead;

        let btnContainerDiv = document.createElement('div');
        displayDiv.classList.add('display-cards');
        displayDiv.setAttribute('data-id', `${Math.random()}`);
        console.log(displayDiv.attributes)

        titleDiv.textContent = `${myLibrary[i].title}`;
        authorDiv.textContent = `${myLibrary[i].author}`;
        pagesDiv.textContent = `${myLibrary[i].pages}`;
        haveReadDiv.textContent = `${myLibrary[i].haveRead == true ? 'Read!' : 'Not Read!'}`;
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
                if (myLibrary[i][keys] == givenElement.firstChild.textContent) {
                    myLibrary.splice(i, 1);
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
                    this.textContent = `${myLibrary[i].haveRead == true ? 'Read!' : 'Not Read!'}`
                    console.log(myLibrary);
                }
            }
        }

    })
}

const inputTitle = document.querySelector('#title');
const inputAuthor = document.querySelector('#author');
const inputPages = document.querySelector('#pages');
const inputhaveRead = document.querySelector('#have-read-true');
const inputhaveNotRead = document.querySelector('#have-read-false');
const submitBtn = document.querySelector('.submit');
const outputP = document.querySelector('.output');


submitBtn.addEventListener('click', function () {
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
    let addedBook = new Book(inputTitle.value, inputAuthor.value, inputPages.value, (inputhaveRead.checked == false ? inputhaveNotRead.value : inputhaveRead.value))
    myLibrary.push(addedBook);
    document.querySelectorAll('.display-cards').forEach(element => element.remove());
    console.log(document.querySelectorAll('.display-cards'));
    addBook();
    addedBook = null;
    let removeBtn = document.querySelectorAll('.remove');
    removeBtn.forEach(removingFromLib);
    document.querySelectorAll('.change-status').forEach(changeStatus);
    inputTitle.value = "";
    inputAuthor.value = "";
    inputPages.value = "";
    inputhaveNotRead.checked = true;
});


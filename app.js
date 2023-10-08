const body = document.querySelector('body')
const button = document.getElementById('add')
const bookContainer = document.querySelector('.container')

const btnSave = document.querySelector(".save")
const newBookForm = document.querySelector(".new_book")
const aux = document.querySelector(".special")
const btnCancelSave = document.querySelector(".cancel-save")
const onLoad = document.querySelector(".on_load")

const btnCheck = document.getElementById('check')

// Data Book
const urlCover = document.getElementById('urlCover')
const bookTitle = document.getElementById('bookTitle')
const bookAuthor = document.getElementById('bookAuthor')
const issueBook = document.getElementById('issueBook')
const userBook = document.getElementById('userBook')

let listBooks = []

window.addEventListener('load',()=>{
    console.log(JSON.parse(localStorage.getItem('books')))
    if (localStorage.getItem('books')){
        listBooks = JSON.parse(localStorage.getItem('books'))
        listBooks.forEach((currentBook)=>Book(currentBook))
    }
})

btnCheck.checked='true'
btnCheck.addEventListener('change',validCheck, false)

function validCheck () {
    var checked = btnCheck.checked;
    console.log(checked)
    if(!checked){
        onLoad.style.display="block"
    }else {
        onLoad.style.display="none"
    }
}

const newBooksImgs = ['./libro_3.jpg','./Lorca-3_Bodas.jpg']

function infoBook(){
    let res = false
    if (validateURL() && validateString(bookTitle) && validateString(bookAuthor) && validateYear()){
        res = true
    }else{
        alert('Please verify the entered data.')
    }
    return res
}

function validateURL (){
    let res = null
    if (urlCover.value.split()!=""){
        res = urlCover.value.startsWith('https://') ? urlCover.value : null
    }
    return res
}

function divDel(){
    const delBtn = document.createElement('div')
    delBtn.classList.add('button')
    delBtn.textContent = 'Del'
    const delDiv = document.createElement('div')
    delDiv.classList.add('actionDel')
    delDiv.append(delBtn)
    return delDiv
}

const divActions = document.querySelector('.actions')
let removeBooks = []

function actionDelAll(){
    button.style.pointerEvents="none"
    btnDel.style.pointerEvents="none"
    const spaceAux =document.createElement('br')
    divActions.append(spaceAux,confirmDel())
    listBooks.forEach((book)=>{
        const divBook = document.getElementById(book.ref)
        divBook.addEventListener('click',()=>{
            const elemntAdd = divDel()
            elemntAdd.style.outlineWidth='2px'
            divBook.append(elemntAdd)
            divBook.style.pointerEvents="none"
            removeBooks.push(divBook.id)
        })
    })
}

function confirmDel(){
    const iconConfirm = document.createElement('i')
    iconConfirm.classList.add('fa-solid','fa-check')
    const btnConfirm = document.createElement('div')
    btnConfirm.classList.add('button')
    btnConfirm.setAttribute('id',"btnConfirmDel")
    btnConfirm.append(iconConfirm)
    btnConfirm.addEventListener('click',()=>{
        removeBooks.forEach((bookDel)=>{
            let book = document.getElementById(bookDel)
            bookContainer.removeChild(book)
            listBooks = listBooks.filter((book)=>book.ref!=bookDel)
        })
        removeBooks = []
        listBooks.forEach((book)=>{
            const divBook = document.getElementById(book.ref)
            bookContainer.removeChild(divBook)
            Book(book)
        })
        button.style.pointerEvents="all"
        btnDel.style.pointerEvents="all"
        divActions.removeChild(btnConfirm)
    })
    return btnConfirm
}

const btnDel = document.getElementById('del')
btnDel.addEventListener('click',actionDelAll)

function validateString(stringToValidate){
    return stringToValidate.value.split()!="" ? stringToValidate.value : null
}

function validateYear(){
    let res = null
    if (issueBook.value.split()!=""){
        if (issueBook.value.length==4){
            if (Number(issueBook.value) && Number(issueBook.value)<=2023){
                res = Number(issueBook.value)
            }
        }
    }
return res
}

function clear(){
    urlCover.value=""
    bookTitle.value = ""
    bookAuthor.value = ""
    issueBook.value = ""
    btnCheck.checked = true
    userBook.value=""    
}

function btnsActions(){
    const iconEdit = document.createElement('i')
    iconEdit.classList.add('fa-solid','fa-pen-to-square')
    const iconInfo = document.createElement('i')
    iconInfo.classList.add('fa-solid','fa-circle-info')
    const iconReserve = document.createElement('i')
    iconReserve.classList.add('fa-solid','fa-bookmark')
    const btnEdit = document.createElement('div')
    btnEdit.classList.add('button')
    btnEdit.append(iconEdit)
    const btnInfo = document.createElement('div')
    btnInfo.classList.add('button')
    btnInfo.append(iconInfo)
    const btnReserve = document.createElement('div')
    btnReserve.classList.add('button')
    btnReserve.addEventListener('click',(e)=>{
        const divBtns = e.target.parentElement
        const divContent = divBtns.parentElement
        console.log(divContent.parentElement.id)
    })
    btnReserve.append(iconReserve)
    const divBtns = document.createElement('div')
    divBtns.classList.add('btns')
    divBtns.append(btnEdit,btnInfo,btnReserve)
    return divBtns
}

function Book(infoNewBook) {
    const imgCover = document.createElement('img') 
    imgCover.src=infoNewBook.cover
    const bookCover = document.createElement('div')
    bookCover.classList.add('imgBk')
    bookCover.append(imgCover)
    const title = document.createElement('h2')
    title.innerText = infoNewBook.title
    const info = document.createElement('p')
    info.textContent = infoNewBook.author
    const content = document.createElement('div')
    content.classList.add('content')
    content.append(title,info,btnsActions())
    const book = document.createElement('div')
    book.classList.add('book')
    book.setAttribute('id',infoNewBook.ref)
    book.append(bookCover,content)
    bookContainer.append(book)
}

function addBook() {
    let newBook = {
        ref : (listBooks.length + 1).toString(),
        cover : urlCover.value,
        title : bookTitle.value,
        author : bookAuthor.value,
        year : issueBook.value,
        available : btnCheck.checked,
        on_load : userBook.value
    }
    listBooks.push(newBook)
    return newBook
}

function close() {
    newBookForm.style.visibility="hidden"
    newBookForm.style.opacity="0"
    aux.style.visibility="hidden"
    aux.style.opacity="0"
}

btnSave.addEventListener('click', ()=>{
    if (infoBook()){
        Book(addBook());
        close();
        clear();
        localStorage.setItem('books',JSON.stringify(listBooks))
    }
})



button.addEventListener('click',()=>{
    newBookForm.style.visibility="visible"
    newBookForm.style.opacity="1"
    aux.style.visibility="visible"
    aux.style.opacity="1"
})



btnCancelSave.addEventListener('click',close)
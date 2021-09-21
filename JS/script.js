var alerts = document.querySelectorAll("p.alert");
var bookArr = [];
if(localStorage.getItem('bookmarks') != null)
{
    bookArr = JSON.parse(localStorage.getItem('bookmarks'));
    displayBook();
}
var sNameInput = document.getElementById("sName");
var sURLInput = document.getElementById("sURL");


function hideAlerts() {
    for (var i = 0; i < alerts.length; i++)
        alerts[i].style.display = "none";
}

function submitBook()
{
    var siteName = document.querySelector("#sName").value;
    var siteURL = document.querySelector('#sURL').value;
    if (checkTitle() && checkURL() && isTitleRepeated(siteName) && isURLRepeated(siteURL))
    {
        hideAlerts();
        var book = {
            title: sNameInput.value,
            url: sURLInput.value
        };
        bookArr.push(book);
        localStorage.setItem('bookmarks', JSON.stringify(bookArr));
        console.log(bookArr);
        clearForm();
        displayBook();
    }
    else
    {
        if(!checkTitle())
        {
            printTitleError("Please Enter the book name and should be correct")
        }
        if(!checkURL())
        {
            printURLError("Please Enter the book URL and should be correct")
        }
        if(!isTitleRepeated(siteName))
        {
            printTitleError("This Site Name is already exist!")
        }
        if(!isURLRepeated(siteURL))
        {
            printURLError("This Site URL is already exist!")
        }
    }
}

function isTitleRepeated(name)
{

    for (var i = 0; i < bookArr.length; i++) {
        if (bookArr[i].title === name)
            return false;
    }
    return true;
}

function isURLRepeated(urlLink)
{

    for (var i = 0; i < bookArr.length; i++) {
        if (bookArr[i].url === urlLink)
            return false;
    }
    return true;
}

function checkTitle()
{
    let regex = /^[A-Z][a-z][^d]/;
    if(regex.test(sNameInput.value))
    {
        return true;
    }
    else
    {
        return false;
    }
}

function checkURL()
{
    let regex = /^http(s)?:\/\/www.[a-z]{3,20}(.com|.org|.gov)/;
    if(regex.test(sURLInput.value))
    {
        return true;
    }
    else
    {
        return false;
    }
}

function printTitleError(msg)
{
    var titleError = ``;
    titleError += `<p class="alert alert-danger m-auto">${msg}</p>`;
    document.getElementById('titleError').innerHTML = titleError;

}
function printURLError(msg)
{
    var urlError = ``;
    urlError += `<p class="alert alert-danger m-auto">${msg}</p>`;
    document.getElementById('urlError').innerHTML = urlError;

}
function clearForm()
{
    sNameInput.value = "";
    sURLInput.value = "";
}

function displayBook()
{
    var cartona = ``;
    for (let i = 0; i < bookArr.length; i++) {
        cartona += `<div class="py-3 d-flex">
        <h2>${bookArr[i].title}</h2>
        <button class="btn btn-primary ms-5 me-2"><a class="text-decoration-none text-white" target="_blank" href="${bookArr[i].url}">Visit</a></button>
        <button onclick="deleteBook(${i})" class="btn btn-danger ms-2 me-2">Delete</button>
        </div>`;
        
    }
    document.getElementById('bookmarkList').innerHTML = cartona;
}

function deleteBook(index)
{
    bookArr.splice(index, 1);
    localStorage.setItem('bookmarks', JSON.stringify(bookArr));
    displayBook();
}

document.addEventListener("keypress", function(e) {
    console.log(e);
    if (e.keyCode == 13)
        submitBook();
})

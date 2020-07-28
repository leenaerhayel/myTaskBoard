//add bg img to body
document.body.style.backgroundImage = "url('tile.jpg')";

//create a container div and give it a parent (body)
var myContainer = document.createElement("div");
myContainer.classList.add("container");
document.body.appendChild(myContainer);

//create first row div
var firstRow = document.createElement("div");
firstRow.classList.add("row");
myContainer.appendChild(firstRow);

//create first col-md-12
var firstCol = document.createElement("div");
firstCol.classList.add("col-md-12");
firstRow.appendChild(firstCol);

//title img - "My Task Board"
var title = document.createElement("h2");
title.id = "topTitle";
title.innerText = "My Task Board";
title.classList.add("my-3", "mt-5", "text-center");
firstCol.appendChild(title);

//break row
var linebreak = document.createElement("br");
myContainer.appendChild(linebreak);

//create second row div
var secondRow = document.createElement("div");
secondRow.classList.add("row");
myContainer.appendChild(secondRow);

//create second col-md-12
var secondCol = document.createElement("div");
secondCol.classList.add("col-md-12", "text-center", "bgImg");
secondRow.appendChild(secondCol);

//create a form
var myForm = document.createElement("form");
myForm.method = "POST";
myForm.classList.add("imgContainer", "my-2");
secondCol.appendChild(myForm);

//create the inputs
//1st divForm
var firstDivForm = document.createElement("div");
firstDivForm.classList.add("form-group");
myForm.appendChild(firstDivForm);

//1st input - text
var firstInput = document.createElement("input");
firstInput.type = "text";
// firstInput.required = true;
firstInput.name = "userNotes";
firstInput.id = "userNotes";
firstInput.placeholder = "Enter your notes here..";
firstInput.classList.add("form-control", "beTransparent");
firstDivForm.appendChild(firstInput);

//2nd divForm
var secondDivForm = document.createElement("div");
secondDivForm.classList.add("form-group");
myForm.appendChild(secondDivForm);

//2nd input - date
var secondInput = document.createElement("input");
secondInput.type = "date";
// secondInput.required = true;
secondInput.name = "userDate";
secondInput.id = "userDate";
secondInput.style.width = "200px";
secondInput.classList.add("form-control", "beTransparent");
secondDivForm.appendChild(secondInput);

//2nd divForm
var thirdDivForm = document.createElement("div");
thirdDivForm.classList.add("form-group");
myForm.appendChild(thirdDivForm);

//3rd input - time
var thirdInput = document.createElement("input");
thirdInput.type = "time";
thirdInput.name = "userTime";
thirdInput.id = "userTime";
thirdInput.style.width = "200px";
thirdInput.classList.add("form-control", "beTransparent");
thirdDivForm.appendChild(thirdInput);

//4th input - save button
var fourthInput = document.createElement("input");
fourthInput.type = "button";
fourthInput.id = "btnSave";
fourthInput.classList.add("btn", "btn-success", "my-2");
fourthInput.value = "Save";
fourthInput.onclick = function () { saveNote() };
myForm.appendChild(fourthInput);

//5th input - reset button
var fifthInput = document.createElement("input");
fifthInput.type = "button";
fifthInput.id = "btnReset";
fifthInput.classList.add("btn", "btn-danger", "mx-3");
fifthInput.value = "Reset";
fifthInput.onclick = function () { resetNote() };
myForm.appendChild(fifthInput);

//break row
myContainer.appendChild(linebreak);

//create third row div
var thirdRow = document.createElement("div");
thirdRow.classList.add("row", "clearMe");
myContainer.appendChild(thirdRow);

//localStorage
var notesFromLocalstorage = localStorage.getItem("the_notes");

//array - holds (will hold) all notes
var notesArr = [];

if (notesFromLocalstorage != null) {
    notesArr = JSON.parse(notesFromLocalstorage);
}

showNotes();

//saves a new note and adds it to notesArr
function saveNote() {
    // console.log("save");

    //vars holding user inputs
    let userNote = document.getElementById("userNotes").value;
    let userDate = document.getElementById("userDate").value;
    let userTime = document.getElementById("userTime").value;

    //reverse date
    userDate = userDate.split("-").reverse().join("/");

    // input validation - check if note input is empty
    if (userNote == "") {
        document.querySelector("#userNotes").classList.add("error");
        alert("Please enter your note");
        return;
    }

    // //input validation - check if date input is empty
    if (userDate == "") {
        document.querySelector("#userDate").classList.add("error");
        alert("Please enter a date");
        return;
    }

    //remove "error" class if input is not empty
    document.querySelector("#userNotes").classList.remove("error");
    document.querySelector("#userDate").classList.remove("error");

    let newNote = {
        userNote: userNote,
        userDate: userDate,
        userTime: userTime
    }

    //save new object to notesArr
    notesArr.push(newNote);

    //save to localStorage
    localStorage.setItem("the_notes", JSON.stringify(notesArr));

    showNotes();
    resetNote();
}

function showNotes() {

    document.querySelector(".clearMe").innerHTML = "";

    for (let i = 0; i < notesArr.length; i++) {
        //note img
        let noteBg = document.createElement("div");
        noteBg.classList.add("col-md-4", "noteImg", "fadiIn");
        thirdRow.appendChild(noteBg);

        //all notes(all inputs in one note) div parent
        let wholeNote = document.createElement("div");
        wholeNote.classList.add("my-4");
        wholeNote.id = "theWholeNote";
        noteBg.appendChild(wholeNote);

        //delete div
        let divDelete = document.createElement("div");
        divDelete.classList.add("my-2");
        divDelete.id = "deleteDiv";
        wholeNote.appendChild(divDelete);

        //delete button
        let btnDelete = document.createElement("button");
        btnDelete.classList.add("deleteBtn", "beTransparent");
        btnDelete.setAttribute('onclick', 'deleteNote(' + i + ')');
        divDelete.appendChild(btnDelete);

        //delete icon
        let deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fas", "fa-trash");
        btnDelete.appendChild(deleteIcon);

        //the note
        let txtNote = document.createElement("div");
        txtNote.id = "textNote";
        txtNote.innerText = notesArr[i].userNote;
        wholeNote.appendChild(txtNote);

        //due date
        let txtDate = document.createElement("div");
        txtDate.id = "textDate";
        txtDate.innerText = notesArr[i].userDate;
        wholeNote.appendChild(txtDate);

        //time - optional
        let txtTime = document.createElement("div");
        txtTime.id = "textTime";
        txtTime.innerText = notesArr[i].userTime;
        wholeNote.appendChild(txtTime);
    }
}

function resetNote() {
    // console.log("reset");
    document.getElementById("userNotes").value = "";
    document.getElementById("userDate").value = "";
    document.getElementById("userTime").value = "";
}

function deleteNote(i) {
    //remove one item from notesArr
    notesArr.splice(i, 1);

    //update localStorage
    localStorage.setItem("the_notes", JSON.stringify(notesArr));
    showNotes();
}

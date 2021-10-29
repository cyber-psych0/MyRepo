import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import 'styles/index.css';

import * as serviceWorker from './serviceWorker';

let addBtn = document.getElementById("addBtn");
let container = document.getElementById("notes");
function showNotes() {
    let html = "";
    let notes = localStorage.getItem("notes");
    let title = localStorage.getItem("title");

    let notesArr = [];
    let titleArr = [];

    if (notes != null) {
        notesArr = JSON.parse(notes);
    }
    if (title != null) {
        titleArr = JSON.parse(title);
    }

    notesArr.forEach(function (element, index) {
        html += `
                <div class=" noteCard card mx-2 my-2" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${titleArr[index]}</h5>
                    <p class="card-text">${element}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`;
    });

    let dv = document.getElementById("notes");

    if(notesArr.length!=0){
        dv.innerHTML = html;
    }
    else{
        dv.innerHTML = "No Notes Available, Please add some notes!";
    }


}
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("noteTitle");

    let notesTxt = addTxt.value;
    let titleTxt = addTitle.value;

    let notes = localStorage.getItem("notes");
    let title = localStorage.getItem("title");

    let notesArr = [];
    let titleArr = [];
    if (notes != null) {
        notesArr = JSON.parse(notes);
    }
    if (title != null) {
        titleArr = JSON.parse(title);
    }
    notesArr.push(notesTxt);
    titleArr.push(titleTxt);

    localStorage.setItem("notes", JSON.stringify(notesArr));
    localStorage.setItem("title",JSON.stringify(titleArr));

    //console.log(localStorage);
    addTxt.value = "";
    addTitle.value="";
    showNotes();
});
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
function deleteNote(index){
    //console.log("Deleting note ",index);
    let notes = localStorage.getItem("notes");
    let title = localStorage.getItem("title");

    let notesArr = JSON.parse(notes);
    let titleArr = JSON.parse(title);

    notesArr.splice(index,1);
    titleArr.splice(index,1);

    localStorage.setItem("notes",JSON.stringify(notesArr));
    localStorage.setItem("title",JSON.stringify(titleArr));
    
    showNotes();
}
let search = document.getElementById("search");
search.addEventListener("input",function(element){
    let notes = document.getElementsByClassName("noteCard");
    Array.from(notes).forEach(function(element){
        let text = element.getElementsByTagName("p")[0].innerText;
        if(text.includes(search.value)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    });
});

serviceWorker.register();

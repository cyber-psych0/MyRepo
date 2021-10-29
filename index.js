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
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.register();

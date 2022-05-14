// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAXHqIwy0j6-DvruUcPAXzxCLzoU99Xq-Q",
    authDomain: "micco-s-barbershop.firebaseapp.com",
    projectId: "micco-s-barbershop",
    storageBucket: "micco-s-barbershop.appspot.com",
    messagingSenderId: "978301834205",
    appId: "1:978301834205:web:ce9a61b11dcfdad1c45c34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



import { getDatabase, ref, get, set, child, update, remove }
from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js";
const db = getDatabase();

// -------- End of Firebase Cdn


// ------------ Filling the Table ---------------//

var stdNo = 0;
var tbody = document.getElementById('tbody1');

function AddItemToTable(pendingUsername, pendingName, pendingEmail, pendingPhone, pendingAddress) {
    let trow = document.createElement("tr");
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');



    td1.innerHTML = pendingUsername;
    td2.innerHTML = pendingName;
    td3.innerHTML = pendingEmail;
    td4.innerHTML = pendingPhone;
    td5.innerHTML = pendingAddress;



    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);

    tbody.appendChild(trow);
}


function AddAllItemsToTable(TheStudent) {
    stdNo = 0;
    tbody.innerHTML = "";
    TheStudent.forEach(element => {
        AddItemToTable(element.Username, element.Name, element.Email, element.Phone, element.Address);
    });
}


// -------- Get All Data

function GetAllDataOnce() {
    const dbRef = ref(db);

    get(child(dbRef, "PendingAccount"))
        .then((snapshot) => {
            var students = [];
            snapshot.forEach(childSnapshot => {
                students.push(childSnapshot.val());
            });
            AddAllItemsToTable(students);
        });
}

window.onload = GetAllDataOnce;
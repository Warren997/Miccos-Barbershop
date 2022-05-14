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


// ------------ Filling the Barber Table ---------------//

var stdNo = 0;
var tbody = document.getElementById('tbody1');

function AddItemToTable(barberUsername, barberName, barberAddress, barberPhone, barberTelephone) {
    let trow = document.createElement("tr");
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');



    td1.innerHTML = barberUsername;
    td2.innerHTML = barberName;
    td3.innerHTML = barberAddress;
    td4.innerHTML = barberPhone;
    td5.innerHTML = barberTelephone;



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
        AddItemToTable(element.Username, element.Name, element.Address, element.Phone, element.Telephone);
    });
}


// -------- Get All Data

function GetAllDataOnce() {
    const dbRef = ref(db);

    get(child(dbRef, "BarbersList"))
        .then((snapshot) => {
            var students = [];
            snapshot.forEach(childSnapshot => {
                students.push(childSnapshot.val());
            });
            AddAllItemsToTable(students);
        });
}

window.onload = GetAllDataOnce;

/*

// ------------ Filling the User Table ---------------//

var stdNoCustomer = 0;
var tbodyCustomer = document.getElementById('tbody2');

function AddItemToTableCustomer(userUsername, userEmail, userPassword) {
    let trowCustomer = document.createElement("tr");
    let td1Customer = document.createElement('td');
    let td2Customer = document.createElement('td');
    let td3Customer = document.createElement('td');


    td1Customer.innerHTML = userUsername;
    td2Customer.innerHTML = userEmail;
    td3Customer.innerHTML = userPassword;


    trowCustomer.appendChild(td1Customer);
    trowCustomer.appendChild(td2Customer);
    trowCustomer.appendChild(td3Customer);



    tbodyCustomer.appendChild(trowCustomer);
}


function AddAllItemsToTableCustomer(TheStudent) {
    stdNoCustomer = 0;
    tbodyCustomer.innerHTML = "";
    TheStudent.forEach(element => {
        AddItemToTableCustomer(element.Username, element.Email, element.password);
    });
}


// -------- Get All Data

function GetAllDataOnceCustomer() {
    const dbRef = ref(db);

    get(child(dbRef, "UsersList"))
        .then((snapshot) => {
            var students = [];
            snapshot.forEach(childSnapshot => {
                students.push(childSnapshot.val());
            });
            AddAllItemsToTableCustomer(students);
        });
}

window.onload = GetAllDataOnceCustomer;
*/
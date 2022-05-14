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


// ------------ Filling the User Table ---------------//

var stdNo = 0;
var tbody = document.getElementById('tbody1');

function AddItemToTable(customerUsername, customerName, customerEmail, customerPhone, customerAddress) {
    let trow = document.createElement("tr");
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');

    td1.innerHTML = customerUsername;
    td2.innerHTML = customerName;
    td3.innerHTML = customerEmail;
    td4.innerHTML = customerPhone;
    td5.innerHTML = customerAddress;



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

    get(child(dbRef, "UserList"))
        .then((snapshot) => {
            var students = [];
            snapshot.forEach(childSnapshot => {
                students.push(childSnapshot.val());
            });
            AddAllItemsToTable(students);
        });
}

window.onload = GetAllDataOnce;





// ------------------------------ Delete Data Function ------------------------------ //
var removeUserBtn = document.querySelector('#removeUserBtn');
var removeUserInput = document.querySelector('#removeUserInput');

function RemoveData() {
    remove(ref(db, "UserList/" + removeUserInput.value))
        .then(() => {
            alert("User account removed successfully!");
            removeUserInput.value = '';
            window.location.reload();
        })
        .catch((error) => {
            alert("unsuccessful, error" + error);
        });
}

removeUserBtn.addEventListener('click', RemoveData);
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

function AddItemToTable(historyDate, historyName, historyAddress, historyPhone, historyEmail, historyService, historyPrice, historyBarber, historyQR) {
    let trow = document.createElement("tr");
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');
    let td6 = document.createElement('td');
    let td7 = document.createElement('td');
    let td8 = document.createElement('td');
    let td9 = document.createElement('td');


    td1.innerHTML = historyDate;
    td2.innerHTML = historyName;
    td3.innerHTML = historyAddress;
    td4.innerHTML = historyPhone;
    td5.innerHTML = historyEmail;
    td6.innerHTML = historyService;
    td7.innerHTML = historyPrice;
    td8.innerHTML = historyBarber;
    td9.innerHTML = historyQR;


    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);
    trow.appendChild(td7);
    trow.appendChild(td8);
    trow.appendChild(td9);


    tbody.appendChild(trow);
}


function AddAllItemsToTable(TheHistory) {
    stdNo = 0;
    tbody.innerHTML = "";
    TheHistory.forEach(element => {
        AddItemToTable(element.A_Date, element.B_Name, element.C_Address, element.D_Phone, element.E_Email, element.F_Service, element.G_Price, element.H_Barber, element.I_QR);
    });
}


// -------- Get All Data

function GetAllDataOnce() {
    const dbRef = ref(db);

    get(child(dbRef, "MissedSchedule"))
        .then((snapshot) => {
            var history = [];
            snapshot.forEach(childSnapshot => {
                history.push(childSnapshot.val());
            });
            AddAllItemsToTable(history);
        });
}


window.onload = GetAllDataOnce;



// ----- Search on Table by Date
document.querySelector('#searchTextBoxDate').addEventListener('keyup', function() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchTextBoxDate");
    filter = input.value.toUpperCase();
    table = document.getElementById("scheduleTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
})


// ----- Search on Table by Name
document.querySelector('#searchTextBoxName').addEventListener('keyup', function() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchTextBoxName");
    filter = input.value.toUpperCase();
    table = document.getElementById("scheduleTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
})



// ----------------------- Delete Data MissedSchedule to Firebase

function clearAll() {
    remove(ref(db, "MissedSchedule"))
        .then(() => {
            alert("All missed schedule successfully remove!");
            location.reload();
        })
        .catch((error) => {
            alert("Unsuccessful, error" + error);
        });
}


// ------------------------------------------------------------

//Timer
function startTimer() {
    var presentTime = document.querySelector('.signup-title').innerHTML;
    var timeArray = presentTime.split(/[:]+/);
    var m = timeArray[0];
    var s = checkSecond((timeArray[1] - 1));
    if (s == 59) {
        m = m - 1
    }
    if (m < 0) {
        return
    }
    document.querySelector('.signup-title').innerHTML =
        m + ":" + s;
    console.log(m)
    setTimeout(startTimer, 1000);
}

function checkSecond(sec) {
    if (sec < 10 && sec >= 0) {
        sec = "0" + sec
    }; // add zero in front of numbers < 10
    if (sec < 0) {
        sec = "59"
    };
    return sec;
}

var logUsername = document.querySelector('#adminUsername');
var logPassword = document.querySelector('#adminPassword');
var clearAllBtn = document.getElementById('clearAllBtn');

//Log in attempts
var loginAttemptAdmin = 3;


// ----------------------- Log in as Admin ------------------------------//

let adminUsername = "Admin";
let adminPassword = "Admin123";


// -------- Sign in as Admin Event -------- //
document.querySelector('#clearAllBtn').addEventListener('click', function() {

    if (loginAttemptAdmin <= 0) {
        alert('ERROR: Too many log in attempts. Please try again after 5 minutes')
            //Hide Login Btn
        document.getElementById('clearAllBtn').style.display = 'none';
        logUsername.disabled = true;
        logPassword.disabled = true;
        //Start Countdown at Title
        document.querySelector('.signup-title ').innerHTML = 4 + ":" + 59;
        startTimer();
        //Start Countdown
        var myTimeout = setTimeout(myGreeting, 302000); //300000 = 5 minutes // 4:59 = 302000
        //Reset Login Attempts 
        function myGreeting() {
            alert('You can log in again!')
                //Bring Back Login Btn
            document.getElementById('clearAllBtn').style.display = 'inline-block';
            logUsername.disabled = false;
            logPassword.disabled = false;
            loginAttemptAdmin = 3;
        }
    } else {
        //Sign In as Admin
        if (adminUsername == logUsername.value && adminPassword == logPassword.value) {
            logUsername.value = '';
            logPassword.value = '';
            //Clear All Missed Schedule
            clearAll()
        } else if (logUsername.value == "" || logPassword.value == "") {
            alert("Please fill up the Username and Password as Admin\nYou only have " + loginAttemptAdmin + " log in attempts")
                //Log in attempt deduct
            loginAttemptAdmin -= 1;
        } else {
            alert("Wrong Username or Password!\nYou only have " + loginAttemptAdmin + " log in attempts")
                //Log in attempt deduct
            loginAttemptAdmin -= 1;
        }
    }
});
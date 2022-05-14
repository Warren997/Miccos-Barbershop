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

// ---- End of Firebase CDN



// ------------------------------ References ------------------------------ //

const regUsername = document.getElementById('regUsername');
const regEmail = document.getElementById('regEmail');
const regPassword = document.getElementById('regPassword');
const regName = document.getElementById('regName');
const regAddress = document.getElementById('regAddress');
const regPhone = document.getElementById('regPhone');
const regAdd = document.getElementById('regAdd');


// ------------------------------ Validation Function ------------------------------ //
// check if customers input is valid by restrictions


function Validation() {

    // Restrictions
    if (!/^[a-zA-Z0-9.].{5,}$/.test(regUsername.value)) {
        alert("The username should be at least 6 characters!");
        return false;
    }
    if (!/^[a-zA-Z0-9]+@(gmail|yahoo|outlook)\.com$/.test(regEmail.value)) {
        alert("Please enter a valid email!\n - ###@gmail.com\n - ###@yahoo.com\n - ###@outlook.com");
        return false;
    }
    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(regPassword.value)) {
        alert("Password must be at least 8 characters with uppercase, lowercase & numbers")
        return false;
    }
    if (!/^[a-zA-Z]/.test(regName.value)) {
        alert("The name should only container alphabets!");
        return false;
    }
    //Phone
    if (!/^09[0-9]{9}/.test(regPhone.value)) {
        alert("Please input valid phone number")
        return false;
    }
    return true;
}



// ------------------------------ Register User to Firebase ------------------------------ //


function RegisterUser() {

    if (!Validation()) {
        return;
    };

    const dbRef = ref(db);
    get(child(dbRef, "PendingAccount/" + regUsername.value)).then((snapshot) => {
        // Check if the account is available
        if (snapshot.exists()) {
            alert("Account Already Exist!");
        }
        // Add account to firebase
        else {
            set(ref(db, "PendingAccount/" + regUsername.value), {
                    Username: regUsername.value,
                    Email: regEmail.value,
                    Password: regPassword.value,
                    //Password: encPass(),
                    Name: regName.value,
                    Address: regAddress.value,
                    Phone: regPhone.value
                })
                .then(() => {
                    alert("Create account successfully!\nPlease proceed to Log in");
                    regUsername.value = "";
                    regEmail.value = "";
                    regPassword.value = "";
                    regName.value = "";
                    regAddress.value = "";
                    regPhone.value = "";
                })
                .catch((error) => {
                    alert("error" + error);
                })
        }
    });
}


// ------------------------------ Encryption Password ------------------------------ //
/*
function encPass() {
    var pass12 = CryptoJS.AES.encrypt(regPassword.value, regPassword.value);
    return pass12.toString();
}
*/

// ------------------------------ Events ------------------------------ //
// When customers click the add account button

regAdd.addEventListener('click', RegisterUser);



// ------------------------------ References ------------------------------ //

var BarbersUsername = document.querySelector('#BarbersUsername');
var BarbersPassword = document.querySelector('#BarbersPassword');
var signinAsBarberBtn = document.getElementById('signinAsBarberBtn');


// Log in Attempts Barber
var loginAttemptBarber = 3;



// ------------------------------ Authentication Process Barbers ------------------------------ //
// Check the username and password of barber


function AuthenticateUser() {

    // if barber has 0 attempt
    if (loginAttemptBarber <= 0) {
        alert('ERROR: Too many log in attempts. Please try again after 5 minutes')

        //Hide Login Btn
        document.getElementById('signinAsBarberBtn').style.display = 'none';
        BarbersUsername.disabled = true;
        BarbersPassword.disabled = true;

        //Start Countdown at Title
        document.querySelector('.signup-title-barber').innerHTML = 4 + ":" + 59;
        startTimer();
        //Start Countdown
        var myTimeout = setTimeout(myGreeting, 302000); //300000 = 5 minutes // 4:59 = 302000
        function myGreeting() {
            alert('You can log in again!')
                //Bring Back Login Btn
            document.getElementById('signinAsBarberBtn').style.display = 'inline-block';
            BarbersUsername.disabled = false;
            BarbersPassword.disabled = false;
            loginAttemptBarber = 3;
        }
    } else {
        // If the username input is empty 
        if (BarbersUsername.value == "") {
            alert('Please enter your username')
        }
        // If the password input is empty 
        else if (BarbersPassword.value == "") {
            alert('Please enter your password')
        }
        // If they use the Admin Account to enter Barberpage
        else if (BarbersUsername.value == "Admin" && BarbersPassword.value == "Admin123") {
            window.location = "barberPage.html";
        } else {
            // Check if the inputs is in the firebase
            const dbRef = ref(db);
            get(child(dbRef, "BarbersList/" + BarbersUsername.value)).then((snapshot) => {
                // Check if the input password is the same
                if (snapshot.exists()) {
                    let dbpass = decPass(snapshot.val().Password);
                    if (dbpass == BarbersPassword.value) {
                        //Open home page
                        BarbersUsername.value = "";
                        BarbersPassword.value = "";
                        window.location = "barberPage.html";
                    }
                    // Barber input has wrong password
                    else {
                        alert("Wrong password!\nYou only have " + loginAttemptBarber + " log in attempts");
                        //Log in attempt deduct
                        loginAttemptBarber -= 1;
                        //console.log(loginAttemptBarber);
                    }
                }
                // If barbers account doesn't exist
                else {
                    alert("Account doesn't exist!\nYou only have " + loginAttemptBarber + " log in attempts");
                    //Log in attempt deduct
                    loginAttemptBarber -= 1;
                    //console.log(loginAttemptBarber);
                }
            });
        }
    }
}


// ------------------------------ Timer
function startTimer() {
    var presentTime = document.querySelector('.signup-title-barber').innerHTML;
    var timeArray = presentTime.split(/[:]+/);
    var m = timeArray[0];
    var s = checkSecond((timeArray[1] - 1));
    if (s == 59) { m = m - 1 }
    if (m < 0) {
        return
    }

    document.querySelector('.signup-title-barber').innerHTML = m + ":" + s;
    console.log(m)
    setTimeout(startTimer, 1000);

}

function checkSecond(sec) {
    if (sec < 10 && sec >= 0) { sec = "0" + sec }; // add zero in front of numbers < 10
    if (sec < 0) { sec = "59" };
    return sec;
}
// ------------------------------ Timer end


// ------------------------------ Decryption Password ------------------------------ //
/*
function decPass(dbpass) {
    var pass12 = CryptoJS.AES.decrypt(dbpass, BarbersPassword.value);
    return pass12.toString(CryptoJS.enc.Utf8);
}
*/

// ----- Log in event for Barber when the button is clicked
signinAsBarberBtn.addEventListener('click', AuthenticateUser);
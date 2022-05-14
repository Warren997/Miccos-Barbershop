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

var logUsername = document.querySelector('#logUsername');
var logPassword = document.querySelector('#logPassword');
var logLoginBtn = document.getElementById('logLoginBtn');




// Log in Attempts Customer
var loginAttemptCustomer = 3;





// ------------------------------ Authentication Process ------------------------------ //


function AuthenticateUser() {

    if (loginAttemptCustomer <= 0) {
        alert('ERROR: Too many log in attempts. Please try again after 5 minutes')

        //Hide Login Btn
        document.getElementById('logLoginBtn').style.display = 'none';
        logUsername.disabled = true;
        logPassword.disabled = true;

        //Start Countdown at Title
        document.querySelector('.signup-title').innerHTML = 4 + ":" + 59;
        startTimer();
        //Start Countdown
        var myTimeout = setTimeout(myGreeting, 302000); //300000 = 5 minutes // 4:59 = 302000
        function myGreeting() {
            alert('You can log in again!')
                //Bring Back Login Btn
            document.getElementById('logLoginBtn').style.display = 'inline-block';
            logUsername.disabled = false;
            logPassword.disabled = false;
            loginAttemptCustomer = 3;
        }
    } else {

        if (logUsername.value == "") {
            alert('Please enter your username')
        } else if (logPassword.value == "") {
            alert('Please enter your password')
        } else {
            const dbRef = ref(db);
            get(child(dbRef, "UserList/" + logUsername.value)).then((snapshot) => {
                if (snapshot.exists()) {
                    let dbpass = snapshot.val().Password;


                    var jsarray = [snapshot.val().Name, snapshot.val().Address, snapshot.val().Phone, snapshot.val().Email];
                    sessionStorage.setItem("jsArray", JSON.stringify(jsarray));


                    if (dbpass == logPassword.value) {
                        //Open home page
                        logUsername.value = "";
                        logPassword.value = "";
                        window.location = "home.html";
                    } else {
                        alert("Wrong password!\nYou only have " + loginAttemptCustomer + " log in attempts");
                        //Log in attempt deduct
                        loginAttemptCustomer -= 1;
                        //console.log(loginAttemptCustomer);
                    }
                } else {
                    alert("Account doesn't exist!\nYou only have " + loginAttemptCustomer + " log in attempts");
                    //Log in attempt deduct
                    loginAttemptCustomer -= 1;
                    //console.log(loginAttemptCustomer);
                }
            });
        }
    }
}



//Timer
function startTimer() {
    var presentTime = document.querySelector('.signup-title').innerHTML;
    var timeArray = presentTime.split(/[:]+/);
    var m = timeArray[0];
    var s = checkSecond((timeArray[1] - 1));
    if (s == 59) { m = m - 1 }
    if (m < 0) {
        return
    }

    document.querySelector('.signup-title').innerHTML =
        m + ":" + s;
    console.log(m)
    setTimeout(startTimer, 1000);

}

function checkSecond(sec) {
    if (sec < 10 && sec >= 0) { sec = "0" + sec }; // add zero in front of numbers < 10
    if (sec < 0) { sec = "59" };
    return sec;
}


// ------------------------------ Decryption Password ------------------------------ //
/*
function decPass(dbpass) {
    var pass12 = CryptoJS.AES.decrypt(dbpass, logPassword.value);
    return pass12.toString(CryptoJS.enc.Utf8);
}
*/


// ----- Log in Btn
logLoginBtn.addEventListener('click', AuthenticateUser);
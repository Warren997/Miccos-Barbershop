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




// ------------------------------ References ------------------------------ //


const userQR = document.querySelector('.result');
const checkDatabase = document.querySelector('.checkDatabase');

var customerName = document.querySelector('.customerName');
var customerService = document.querySelector('.customerService');
var customerPrice = document.querySelector('.customerPrice');
var customerBarber = document.querySelector('.customerBarber');

var QRday = document.querySelector('#QRday');
var QRtime = document.querySelector('#QRtime');


// ------------------------------ Authentication Process ------------------------------ //


function AuthenticateUser() {
    //console.log(QRtime.textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim())

    if (QRday.value == "" || QRtime.textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim() == "Time" || userQR.value == "") {
        alert("Make sure you input the Day, Time and QR code!")
    } else {
        //Date of Customer Reservation
        var QRdate = QRday.value + "-" + QRtime.innerHTML;
        //Connection DB
        const dbRef = ref(db);
        //Check QR Code
        get(child(dbRef, "Schedule/" + QRdate)).then((snapshot) => {
            if (snapshot.exists()) {
                if (snapshot.val().I_QR == userQR.value || snapshot.val().I_QR == " " + userQR.value) {
                    //Assigning DB data to HTML 
                    customerName.innerHTML = snapshot.val().A_Name;
                    customerService.innerHTML = snapshot.val().E_Service;
                    customerBarber.innerHTML = snapshot.val().F_Barber;
                    // Alert Customer is Valid
                    //Jquery Open Modal
                    $("#modalSuccess").modal("show");
                    //Customer Service Price
                    if (snapshot.val().E_Service == 'Hair Cut') {
                        customerPrice.innerHTML = '₱250'
                    } else if (snapshot.val().E_Service == 'Hair Wash') {
                        customerPrice.innerHTML = '₱275'
                    } else if (snapshot.val().E_Service == 'Hair Color') {
                        customerPrice.innerHTML = '₱300'
                    } else if (snapshot.val().E_Service == 'Hair Shave') {
                        customerPrice.innerHTML = '₱300'
                    } else if (snapshot.val().E_Service == 'Hair Straight') {
                        customerPrice.innerHTML = '₱350'
                    } else if (snapshot.val().E_Service == 'Facial') {
                        customerPrice.innerHTML = '₱375'
                    } else if (snapshot.val().E_Service == 'Shampoo') {
                        customerPrice.innerHTML = '₱220'
                    } else if (snapshot.val().E_Service == 'Beard Trim') {
                        customerPrice.innerHTML = '₱420'
                    } else if (snapshot.val().E_Service == 'Beard Shave') {
                        customerPrice.innerHTML = '₱400'
                    } else if (snapshot.val().E_Service == 'Wedding Cut') {
                        customerPrice.innerHTML = '₱475'
                    } else if (snapshot.val().E_Service == 'Clean Up') {
                        customerPrice.innerHTML = '₱340'
                    } else if (snapshot.val().E_Service == 'Massage') {
                        customerPrice.innerHTML = '₱350'
                    } else {
                        alert('Error price!')
                    }
                } else {
                    //alert("QR doesn't Exist!!");
                    //Jquery Open Modal
                    $("#modalErrorQR").modal("show");
                    console.log(snapshot.val().I_QR)
                    console.log(userQR.value)
                }
            } else {
                //alert("Date or QR is invalid!!");
                //Jquery Open Modal
                $("#modalError").modal("show");
            }
        });
    }
    //end of AuthenticateUser()
}

//Check Button
checkDatabase.addEventListener('click', AuthenticateUser);
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

var barberUsername = document.querySelector('#barberUsername');
var barberName = document.querySelector('#barberName');
var barberPassword = document.querySelector('#barberPassword');
var barberAddress = document.querySelector('#barberAddress');
var barberPhone = document.querySelector('#barberPhone');
var barberTelephone = document.querySelector('#barberTelephone');

var addBarber = document.querySelector('#addBarber');


// -------------------------- Insert Data Function
function InsertData() {
    if (barberUsername.value == "" || barberName.value == "" || barberPassword.value == "" || barberAddress.value == "" || barberPhone.value == "") {
        alert('Please make sure the form is complete!')
    }
    //Name Should not contain number
    else if (!/^[a-zA-Z\s]+$/.test(barberName.value)) {
        alert("The name should only contain alphabets!");
    }
    //Password must be at least 8 characters with uppercase, lowercase & numbers
    else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(barberPassword.value)) {
        alert("Password must be at least 8 characters with uppercase, lowercase & numbers")
    }
    //Check if phone number is Valid in the Philippines
    //Globe and TM
    else if (/^0905[0-9]{7}/.test(barberPhone.value) || /^0906[0-9]{7}/.test(barberPhone.value) || /^0915[0-9]{7}/.test(barberPhone.value) || /^0916[0-9]{7}/.test(barberPhone.value) || /^0917[0-9]{7}/.test(barberPhone.value) || /^0926[0-9]{7}/.test(barberPhone.value) || /^0927[0-9]{7}/.test(barberPhone.value) || /^0935[0-9]{7}/.test(barberPhone.value) || /^0936[0-9]{7}/.test(barberPhone.value) || /^0937[0-9]{7}/.test(barberPhone.value) || /^0945[0-9]{7}/.test(barberPhone.value) || /^0953[0-9]{7}/.test(barberPhone.value) || /^0954[0-9]{7}/.test(barberPhone.value) || /^0955[0-9]{7}/.test(barberPhone.value) || /^0956[0-9]{7}/.test(barberPhone.value) || /^0957[0-9]{7}/.test(barberPhone.value) || /^0958[0-9]{7}/.test(barberPhone.value) || /^0959[0-9]{7}/.test(barberPhone.value) || /^0965[0-9]{7}/.test(barberPhone.value) || /^0966[0-9]{7}/.test(barberPhone.value) || /^0967[0-9]{7}/.test(barberPhone.value) || /^0975[0-9]{7}/.test(barberPhone.value) || /^0976[0-9]{7}/.test(barberPhone.value) || /^0977[0-9]{7}/.test(barberPhone.value) || /^0978[0-9]{7}/.test(barberPhone.value) || /^0979[0-9]{7}/.test(barberPhone.value) || /^0980[0-9]{7}/.test(barberPhone.value) || /^0995[0-9]{7}/.test(barberPhone.value) || /^0996[0-9]{7}/.test(barberPhone.value) || /^0997[0-9]{7}/.test(barberPhone.value) || /^0817[0-9]{7}/.test(barberPhone.value) || /^09173[0-9]{6}/.test(barberPhone.value) || /^09175[0-9]{6}/.test(barberPhone.value) || /^09176[0-9]{6}/.test(barberPhone.value) || /^09178[0-9]{6}/.test(barberPhone.value) || /^09253[0-9]{6}/.test(barberPhone.value) || /^09255[0-9]{6}/.test(barberPhone.value) || /^09256[0-9]{6}/.test(barberPhone.value) || /^09267[0-9]{6}/.test(barberPhone.value) || /^09258[0-9]{6}/.test(barberPhone.value)) {
        insertBarber();
    }
    //Smart and Tnt
    else if (/^0813[0-9]{7}/.test(barberPhone.value) || /^0900[0-9]{7}/.test(barberPhone.value) || /^0907[0-9]{7}/.test(barberPhone.value) || /^0908[0-9]{7}/.test(barberPhone.value) || /^0909[0-9]{7}/.test(barberPhone.value) || /^0910[0-9]{7}/.test(barberPhone.value) || /^0911[0-9]{7}/.test(barberPhone.value) || /^0912[0-9]{7}/.test(barberPhone.value) || /^0913[0-9]{7}/.test(barberPhone.value) || /^0914[0-9]{7}/.test(barberPhone.value) || /^0918[0-9]{7}/.test(barberPhone.value) || /^0919[0-9]{7}/.test(barberPhone.value) || /^0920[0-9]{7}/.test(barberPhone.value) || /^0921[0-9]{7}/.test(barberPhone.value) || /^0928[0-9]{7}/.test(barberPhone.value) || /^0929[0-9]{7}/.test(barberPhone.value) || /^0930[0-9]{7}/.test(barberPhone.value) || /^0938[0-9]{7}/.test(barberPhone.value) || /^0939[0-9]{7}/.test(barberPhone.value) || /^0940[0-9]{7}/.test(barberPhone.value) || /^0946[0-9]{7}/.test(barberPhone.value) || /^0947[0-9]{7}/.test(barberPhone.value) || /^0948[0-9]{7}/.test(barberPhone.value) || /^0949[0-9]{7}/.test(barberPhone.value) || /^0950[0-9]{7}/.test(barberPhone.value) || /^0951[0-9]{7}/.test(barberPhone.value) || /^0960[0-9]{7}/.test(barberPhone.value) || /^0961[0-9]{7}/.test(barberPhone.value) || /^0963[0-9]{7}/.test(barberPhone.value) || /^0964[0-9]{7}/.test(barberPhone.value) || /^0968[0-9]{7}/.test(barberPhone.value) || /^0969[0-9]{7}/.test(barberPhone.value) || /^0970[0-9]{7}/.test(barberPhone.value) || /^0971[0-9]{7}/.test(barberPhone.value) || /^0998[0-9]{7}/.test(barberPhone.value) || /^0999[0-9]{7}/.test(barberPhone.value)) {
        insertBarber();
    }
    //Sun Cellular
    else if (/^0922[0-9]{7}/.test(barberPhone.value) || /^0923[0-9]{7}/.test(barberPhone.value) || /^0924[0-9]{7}/.test(barberPhone.value) || /^0925[0-9]{7}/.test(barberPhone.value) || /^0931[0-9]{7}/.test(barberPhone.value) || /^0932[0-9]{7}/.test(barberPhone.value) || /^0933[0-9]{7}/.test(barberPhone.value) || /^0934[0-9]{7}/.test(barberPhone.value) || /^0941[0-9]{7}/.test(barberPhone.value) || /^0942[0-9]{7}/.test(barberPhone.value) || /^0943[0-9]{7}/.test(barberPhone.value) || /^0944[0-9]{7}/.test(barberPhone.value) || /^0952[0-9]{7}/.test(barberPhone.value) || /^0962[0-9]{7}/.test(barberPhone.value) || /^0972[0-9]{7}/.test(barberPhone.value) || /^0973[0-9]{7}/.test(barberPhone.value) || /^0974[0-9]{7}/.test(barberPhone.value)) {
        insertBarber();
    }
    //DITO Telecommunity
    else if (/^0991[0-9]{7}/.test(barberPhone.value) || /^0992[0-9]{7}/.test(barberPhone.value) || /^0993[0-9]{7}/.test(barberPhone.value) || /^0994[0-9]{7}/.test(barberPhone.value) || /^0895[0-9]{7}/.test(barberPhone.value) || /^0896[0-9]{7}/.test(barberPhone.value) || /^0897[0-9]{7}/.test(barberPhone.value) || /^0898[0-9]{7}/.test(barberPhone.value)) {
        insertBarber();
    } else {
        alert("Please input valid phone number!!")
    }
    /*
    //Check Telephone Number if integer
    if (isNaN(barberTelephone.value)) {
        alert("Please input valid telephone number!!")
    }*/
}



// ----------- Insert Barber ----------- //

function insertBarber() {
    set(ref(db, "BarbersList/" + barberUsername.value), {
            Username: barberUsername.value,
            Name: barberName.value,
            Password: encPass(),
            Address: barberAddress.value,
            Phone: barberPhone.value,
            Telephone: barberTelephone.value
        })
        .then(() => {
            alert("Create account successfully!");
            barberUsername.value = '';
            barberName.value = '';
            barberPassword.value = '';
            barberAddress.value = '';
            barberPhone.value = '';
            barberTelephone.value = '';
            window.location.reload();
        })
        .catch((error) => {
            alert("unsuccessful, error" + error);
        });
}



// ------------------------------ Delete Data Function ------------------------------ //

function RemoveData() {
    remove(ref(db, "BarbersList/" + barberUsername.value))
        .then(() => {
            alert("Barber account removed successfully!");
            barberUsername.value = '';
            window.location.reload();
        })
        .catch((error) => {
            alert("unsuccessful, error" + error);
        });
}

/*
// ------------------------------ Update Data Function ------------------------------ //

function UpdateData() {
    update(ref(db, "BarbersList/" + barberUsername.value), {
            Username: barberUsername.value,
            Name: barberName.value,
            Password: encPass(),
            Address: barberAddress.value,
            Phone: barberPhone.value,
            Telephone: barberTelephone.value
        })
        .then(() => {
            alert("Barber account update successfully!");
        })
        .catch((error) => {
            alert("unsuccessful, error" + error);
        });
}
*/


// ------------------------------ Encryption Password ------------------------------ //

function encPass() {
    var pass12 = CryptoJS.AES.encrypt(barberPassword.value, barberPassword.value);
    return pass12.toString();
}



// ------------------------------ Events ------------------------------ //



addBarber.addEventListener('click', InsertData);
//updateBarber.addEventListener('click', UpdateData);
removeBarber.addEventListener('click', RemoveData);
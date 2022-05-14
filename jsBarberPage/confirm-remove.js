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

// ------------------------------ Reference------------------------------ //

var confirmSched = document.querySelector('#confirmSched');
var confirmSchedBtn = document.querySelector('#confirmSchedBtn');

var dateSched, nameSched, addressSched, phoneSched, emailSched, serviceSched, priceSched, barberSched, QRSched;

// ------------------------------ Select Data Function ------------------------------ //
function SelectData() {
    const dbref = ref(db);

    get(child(dbref, "Schedule/" + confirmSched.value)).then((snapshot) => {
            if (snapshot.exists()) {
                dateSched = snapshot.val().H_Date + "-" + snapshot.val().G_Time;
                nameSched = snapshot.val().A_Name;
                addressSched = snapshot.val().B_Address;
                phoneSched = snapshot.val().C_Phone;
                emailSched = snapshot.val().D_Email;
                serviceSched = snapshot.val().E_Service;
                priceSched = snapshot.val().J_Price;
                barberSched = snapshot.val().F_Barber;
                QRSched = snapshot.val().I_QR;

                // -- Insert Data to History
                set(ref(db, "History/" + dateSched), {
                        A_Date: dateSched,
                        B_Name: nameSched,
                        C_Address: addressSched,
                        D_Phone: phoneSched,
                        E_Email: emailSched,
                        F_Service: serviceSched,
                        G_Price: priceSched,
                        H_Barber: barberSched,
                        I_QR: QRSched
                    })
                    .then(() => {
                        alert("Adding to history successful!");
                    })
                    .catch((error) => {
                        alert("unsuccessful, error" + error);
                    });

                // -- Delete pending schedule
                remove(ref(db, "Schedule/" + confirmSched.value))
                    .then(() => {
                        confirmSched.value = '';
                        window.location.reload();
                    })
                    .catch((error) => {
                        alert("unsuccessful, error" + error);
                    });

                // --Transfer Complete
            } else {
                alert("No data found");
            }
        })
        .catch((error) => {
            alert("unsuccessful, error" + error);
        });
}

confirmSchedBtn.addEventListener('click', SelectData)



// ------------------------------ Data go to MissedSchedule ------------------------------ //
var removeSchedBtn = document.querySelector('#removeSchedBtn');
var removeSched = document.querySelector('#removeSched');

function RemoveData() {
    const dbref = ref(db);

    get(child(dbref, "Schedule/" + removeSched.value)).then((snapshot) => {
            if (snapshot.exists()) {
                dateSched = snapshot.val().H_Date + "-" + snapshot.val().G_Time;
                nameSched = snapshot.val().A_Name;
                addressSched = snapshot.val().B_Address;
                phoneSched = snapshot.val().C_Phone;
                emailSched = snapshot.val().D_Email;
                serviceSched = snapshot.val().E_Service;
                priceSched = snapshot.val().J_Price;
                barberSched = snapshot.val().F_Barber;
                QRSched = snapshot.val().I_QR;

                // -- Insert Data to MissedSchedule
                set(ref(db, "MissedSchedule/" + dateSched), {
                        A_Date: dateSched,
                        B_Name: nameSched,
                        C_Address: addressSched,
                        D_Phone: phoneSched,
                        E_Email: emailSched,
                        F_Service: serviceSched,
                        G_Price: priceSched,
                        H_Barber: barberSched,
                        I_QR: QRSched
                    })
                    .then(() => {
                        alert("Adding to missed schedule successful!");
                    })
                    .catch((error) => {
                        alert("unsuccessful, error" + error);
                    });

                // -- Delete pending schedule
                remove(ref(db, "Schedule/" + removeSched.value))
                    .then(() => {
                        removeSched.value = '';
                        window.location.reload();
                    })
                    .catch((error) => {
                        alert("unsuccessful, error" + error);
                    });

                // --Transfer Complete
            } else {
                alert("No data found");
            }
        })
        .catch((error) => {
            alert("unsuccessful, error" + error);
        });
}





removeSchedBtn.addEventListener('click', RemoveData);
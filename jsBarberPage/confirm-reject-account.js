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

var pendingUsername, pendingName, pendingEmail, pendingPhone, pendingAddress, pendingPassword

// ------------------------------ Select Data Function ------------------------------ //
function SelectData() {
    const dbref = ref(db);

    get(child(dbref, "PendingAccount/" + confirmSched.value)).then((snapshot) => {
            if (snapshot.exists()) {
                pendingUsername = snapshot.val().Username;
                pendingName = snapshot.val().Name;
                pendingEmail = snapshot.val().Email;
                pendingPassword = snapshot.val().Password;
                pendingPhone = snapshot.val().Phone;
                pendingAddress = snapshot.val().Address;


                // -- Insert Data to History
                set(ref(db, "UserList/" + pendingUsername), {
                        Username: pendingUsername,
                        Name: pendingName,
                        Email: pendingEmail,
                        Password: pendingPassword,
                        Phone: pendingPhone,
                        Address: pendingAddress
                    })
                    .then(() => {
                        alert("Adding to user list successful!");
                    })
                    .catch((error) => {
                        alert("unsuccessful, error" + error);
                    });

                // -- Delete pending Account
                remove(ref(db, "PendingAccount/" + confirmSched.value))
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

    get(child(dbref, "PendingAccount/" + removeSched.value)).then((snapshot) => {
            if (snapshot.exists()) {
                pendingUsername = snapshot.val().Username;
                pendingName = snapshot.val().Name;
                pendingEmail = snapshot.val().Email;
                pendingPhone = snapshot.val().Phone;
                pendingAddress = snapshot.val().Address;

                // -- Insert Data to MissedSchedule
                set(ref(db, "RejectedAccount/" + pendingUsername), {
                        Username: pendingUsername,
                        Name: pendingName,
                        Email: pendingEmail,
                        Phone: pendingPhone,
                        Address: pendingAddress,

                    })
                    .then(() => {
                        alert("Adding to rejected accounts successful!");
                    })
                    .catch((error) => {
                        alert("unsuccessful, error" + error);
                    });

                // -- Delete pending Account
                remove(ref(db, "PendingAccount/" + removeSched.value))
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
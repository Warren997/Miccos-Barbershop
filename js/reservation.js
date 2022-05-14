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


// -- For auto Fill-up in reservation

var jsarray = JSON.parse(sessionStorage.getItem("jsArray"));
console.log(jsarray)

document.querySelector("#inputName").value = jsarray[0]

document.querySelector("#inputAddress").value = jsarray[1]

document.querySelector("#inputPhone").value = jsarray[2]

document.querySelector("#inputEmail").value = jsarray[3]




// ----------------- Program to generate random strings FOR QR CODE
// declare all characters
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


// ----------------- Program to generate random strings FOR OTP
// declare all characters
const charactersOTP = '0123456789';

function generateStringOTP(length) {
    let result = ' ';
    const charactersLengthOTP = charactersOTP.length;
    for (let i = 0; i < length; i++) {
        result += charactersOTP.charAt(Math.floor(Math.random() * charactersLengthOTP));
    }
    return result;
}

// ----------- Send OTP Event

// ------------------------------ References ------------------------------ //
var sendOTPBtn = document.querySelector('#sendOTPBtn');
var inputEmail = document.querySelector('#inputEmail');
var emailOTP;

var OtpTimer = false;


// ------------------------------ Generate OTP Event ------------------------------ //
sendOTPBtn.addEventListener('click', function() {

    //Check if email input is empty
    if (inputEmail.value == '') {
        alert('Please input your email first!')
    }
    //Check email format
    else if (!/^[a-zA-Z0-9]+@(gmail|yahoo|outlook)\.com$/.test(inputEmail.value)) {
        alert("Please enter a valid email!\n - ###@gmail.com\n - ###@yahoo.com\n - ###@outlook.com");
    }
    //Send OTP
    else {
        emailOTP = generateStringOTP(6);
        console.log(emailOTP)

        // ----------------- Send OTP to EmailJS ----------------- //

        alert('We sent the OTP, please check your email!')

        var tempParams = {
            from_name: "Micco's Barbershop",
            to_name: document.querySelector('#inputName').value,
            message: 'Your OTP for online reservation in Miccos Barbershop is { ' + emailOTP + ' } use it to complete the reservation',
            to_name_email: document.querySelector('#inputEmail').value,
        };
        emailjs.send('service_vo4ccl1', 'template_cv4m1jj', tempParams)
            .then(function(res) {
                console.log("success", res.status);
                //OTP already sent
            })

        // ----------------- ----------------- ----------------- //


        //Start Countdown at Title
        sendOTPBtn.innerHTML = 1 + ":" + 29;
        startTimer();
        //Start Countdown
        var myTimeout = setTimeout(myGreeting, 90000); //90000 = 1:30
        function myGreeting() {
            if (OtpTimer == false) {
                alert('The OTP has expired!');
                alert('Fail reservation please try again!');
                location.reload();
            }
        }
    }

})


// ----------------- Timer
function startTimer() {
    var presentTime = sendOTPBtn.innerHTML;
    var timeArray = presentTime.split(/[:]+/);
    var m = timeArray[0];
    var s = checkSecond((timeArray[1] - 1));
    if (s == 59) { m = m - 1 }
    if (m < 0) {
        return
    }
    sendOTPBtn.innerHTML = m + ":" + s;
    console.log(m)
    setTimeout(startTimer, 1000);
}

function checkSecond(sec) {
    if (sec < 10 && sec >= 0) { sec = "0" + sec }; // add zero in front of numbers < 10
    if (sec < 0) { sec = "59" };
    return sec;
}
// ----------------- Timer End



// ----------- Submit Btn Event

document.querySelector('#reservationSubmitBtn').addEventListener('click', function() {

    //QR Code Random Char
    document.querySelector('#inputQR').value = generateString(8);


    // ------------------------------ References ------------------------------ //

    // Customer Info
    var inputName = document.querySelector('#inputName').value;
    var inputAddress = document.querySelector('#inputAddress').value;
    var inputPhone = document.querySelector('#inputPhone').value;
    var inputEmail = document.querySelector('#inputEmail').value;
    var inputOTP = document.querySelector('#inputOTP').value;

    //Customer Sched
    var inputService = document.querySelector('#inputService').innerHTML;
    var inputBarbers = document.querySelector('#inputBarbers').innerHTML;
    var inputTime = document.querySelector('#inputTime').innerHTML;
    var inputDay = document.querySelector('#inputDay').value;


    // -------------------------- Insert Data Function
    function InsertData() {

        //Customer Service Price
        var inputPrice;
        if (inputService == 'Hair Cut') {
            inputPrice = '₱250'
        } else if (inputService == 'Hair Wash') {
            inputPrice = '₱275'
        } else if (inputService == 'Hair Color') {
            inputPrice = '₱300'
        } else if (inputService == 'Hair Shave') {
            inputPrice = '₱300'
        } else if (inputService == 'Hair Straight') {
            inputPrice = '₱350'
        } else if (inputService == 'Facial') {
            inputPrice = '₱375'
        } else if (inputService == 'Shampoo') {
            inputPrice = '₱220'
        } else if (inputService == 'Beard Trim') {
            inputPrice = '₱420'
        } else if (inputService == 'Beard Shave') {
            inputPrice = '₱400'
        } else if (inputService == 'Wedding Cut') {
            inputPrice = '₱475'
        } else if (inputService == 'Clean Up') {
            inputPrice = '₱340'
        } else if (inputService == 'Massage') {
            inputPrice = '₱350'
        } else {
            alert('Error price!')
        }


        // ----- Assigning to Firebase
        const dbref = ref(db);
        get(child(dbref, "Schedule/" + inputDay + "-" + inputTime)).then((snapshot) => {
                if (snapshot.exists()) {
                    //If the Sched Taken
                    alert("Schedule is Already Taken!!");
                } else {
                    //Add Sched to Firebase
                    set(ref(db, "Schedule/" + inputDay + "-" + inputTime), {
                            A_Name: inputName,
                            B_Address: inputAddress,
                            C_Phone: inputPhone,
                            D_Email: inputEmail,
                            E_Service: inputService,
                            F_Barber: inputBarbers,
                            G_Time: inputTime,
                            H_Date: inputDay,
                            I_QR: document.querySelector('#inputQR').value,
                            J_Price: inputPrice
                        })
                        .then(() => {
                            alert("Reservation Successfully!");

                            // ------------------ Clear Inputs
                            document.querySelector('#inputName').value = "";
                            document.querySelector('#inputAddress').value = "";
                            document.querySelector('#inputPhone').value = "";
                            document.querySelector('#inputEmail').value = "";
                            document.querySelector('#inputOTP').value = "";
                            document.querySelector('#inputBarbers').innerHTML = "Barbers";
                            document.querySelector('#inputTime').innerHTML = "Time";
                            document.querySelector('#inputDay').value = "";
                            //Service Input Reset
                            document.querySelector('#inputService').innerHTML = "Services";

                            // ------------------ QR Code to Modal
                            var qrcode = undefined;
                            var modalServices = document.querySelector('#inputServices');
                            var textQR = document.querySelector('#textQR');

                            if (qrcode === undefined) {
                                qrcode = new QRCode(document.getElementById('qrcode'), document.querySelector('#inputQR').value);
                            } else {
                                qrcode.clear();
                                qrcode.makeCode(document.querySelector('#inputQR').value);
                            }

                            // -- Customer Service Fee
                            if (inputService == "Hair Cut") {
                                textQR.value = "Please provide ₱250 for your Hair Cut";
                            } else if (inputService == "Hair Wash") {
                                textQR.value = "Please provide ₱275 for your Hair Wash";
                            } else if (inputService == "Hair Color") {
                                textQR.value = "Please provide ₱300 for your Hair Color";
                            } else if (inputService == "Hair Shave") {
                                textQR.value = "Please provide ₱300 for your Hair Shave";
                            } else if (inputService == "Hair Straight") {
                                textQR.value = "Please provide ₱350 for your Hair Straight";
                            } else if (inputService == "Facial") {
                                textQR.value = "Please provide ₱375 for your Facial";
                            } else if (inputService == "Shampoo") {
                                textQR.value = "Please provide ₱220 for your Shampoo";
                            } else if (inputService == "Beard Trim") {
                                textQR.value = "Please provide ₱420 for your Beard Trim";
                            } else if (inputService == "Beard Shave") {
                                textQR.value = "Please provide ₱400 for your Beard Shave";
                            } else if (inputService == "Wedding Cut") {
                                textQR.value = "Please provide ₱475 for your Wedding Cut";
                            } else if (inputService == "Clean Up") {
                                textQR.value = "Please provide ₱340 for your Clean Up";
                            } else if (inputService == "Massage") {
                                textQR.value = "Please provide ₱350 for your Massage";
                            };

                            // Prevent timer to reload the page
                            OtpTimer = true;

                            // Open Modal using Jquery
                            $("#modalQR").modal("show");

                        })
                        .catch((error) => {
                            alert("Unsuccessful, error" + error);
                        });
                }
            })
            .catch((error) => {
                alert("Unsuccessful, error" + error);
            });
    }




    // Add Customer Date to QR page
    document.querySelector('#customerDate').value = inputDay + "-" + inputTime;

    // Show email otp in console
    console.log(emailOTP)

    // Check if there are blank in reservation form
    if (inputName == "") {
        alert('Please input your name!');
    } else if (inputAddress == "") {
        alert('Please input your address!');
    } else if (inputPhone == "") {
        alert('Please input your phone!');
    } else if (inputEmail == "") {
        alert('Please input your email!');
    } else if (inputService == "Services") {
        alert('Please input what service you want!');
    } else if (inputBarbers == "Barbers") {
        alert("Please input your requested barber!");
    } else if (inputTime == "Time") {
        alert("Please input the time of reservation!");
    } else if (inputDay == "") {
        alert("Please input the day of reservation!");
    } else if (inputOTP == "") {
        alert("Please click Send OTP and check your email")
    }

    // Restrictions for each inputs
    else {
        //Check the name if has integer
        if (!/^[a-zA-Z\s]+$/.test(inputName)) {
            alert("The name should only contain alphabets!");
        }
        //Check email pattern
        else if (!/^[a-zA-Z0-9]+@(gmail|yahoo|outlook)\.com$/.test(inputEmail)) {
            alert("Please enter a valid email!\n - ###@gmail.com\n - ###@yahoo.com\n - ###@outlook.com");
        }
        // Check if the OTP is empty or wrong
        else if (inputOTP == '') {
            alert("Please input the OTP!")
        } else if (' ' + inputOTP != emailOTP) {
            alert("Please input valid OTP!")
        }
        //Check if phone number is Valid in the Philippines
        //Globe and TM
        else if (/^0905[0-9]{7}/.test(inputPhone) || /^0906[0-9]{7}/.test(inputPhone) || /^0915[0-9]{7}/.test(inputPhone) || /^0916[0-9]{7}/.test(inputPhone) || /^0917[0-9]{7}/.test(inputPhone) || /^0926[0-9]{7}/.test(inputPhone) || /^0927[0-9]{7}/.test(inputPhone) || /^0935[0-9]{7}/.test(inputPhone) || /^0936[0-9]{7}/.test(inputPhone) || /^0937[0-9]{7}/.test(inputPhone) || /^0945[0-9]{7}/.test(inputPhone) || /^0953[0-9]{7}/.test(inputPhone) || /^0954[0-9]{7}/.test(inputPhone) || /^0955[0-9]{7}/.test(inputPhone) || /^0956[0-9]{7}/.test(inputPhone) || /^0957[0-9]{7}/.test(inputPhone) || /^0958[0-9]{7}/.test(inputPhone) || /^0959[0-9]{7}/.test(inputPhone) || /^0965[0-9]{7}/.test(inputPhone) || /^0966[0-9]{7}/.test(inputPhone) || /^0967[0-9]{7}/.test(inputPhone) || /^0975[0-9]{7}/.test(inputPhone) || /^0976[0-9]{7}/.test(inputPhone) || /^0977[0-9]{7}/.test(inputPhone) || /^0978[0-9]{7}/.test(inputPhone) || /^0979[0-9]{7}/.test(inputPhone) || /^0980[0-9]{7}/.test(inputPhone) || /^0995[0-9]{7}/.test(inputPhone) || /^0996[0-9]{7}/.test(inputPhone) || /^0997[0-9]{7}/.test(inputPhone) || /^0817[0-9]{7}/.test(inputPhone) || /^09173[0-9]{6}/.test(inputPhone) || /^09175[0-9]{6}/.test(inputPhone) || /^09176[0-9]{6}/.test(inputPhone) || /^09178[0-9]{6}/.test(inputPhone) || /^09253[0-9]{6}/.test(inputPhone) || /^09255[0-9]{6}/.test(inputPhone) || /^09256[0-9]{6}/.test(inputPhone) || /^09267[0-9]{6}/.test(inputPhone) || /^09258[0-9]{6}/.test(inputPhone)) {
            InsertData();
        }
        //Smart and Tnt
        else if (/^0813[0-9]{7}/.test(inputPhone) || /^0900[0-9]{7}/.test(inputPhone) || /^0907[0-9]{7}/.test(inputPhone) || /^0908[0-9]{7}/.test(inputPhone) || /^0909[0-9]{7}/.test(inputPhone) || /^0910[0-9]{7}/.test(inputPhone) || /^0911[0-9]{7}/.test(inputPhone) || /^0912[0-9]{7}/.test(inputPhone) || /^0913[0-9]{7}/.test(inputPhone) || /^0914[0-9]{7}/.test(inputPhone) || /^0918[0-9]{7}/.test(inputPhone) || /^0919[0-9]{7}/.test(inputPhone) || /^0920[0-9]{7}/.test(inputPhone) || /^0921[0-9]{7}/.test(inputPhone) || /^0928[0-9]{7}/.test(inputPhone) || /^0929[0-9]{7}/.test(inputPhone) || /^0930[0-9]{7}/.test(inputPhone) || /^0938[0-9]{7}/.test(inputPhone) || /^0939[0-9]{7}/.test(inputPhone) || /^0940[0-9]{7}/.test(inputPhone) || /^0946[0-9]{7}/.test(inputPhone) || /^0947[0-9]{7}/.test(inputPhone) || /^0948[0-9]{7}/.test(inputPhone) || /^0949[0-9]{7}/.test(inputPhone) || /^0950[0-9]{7}/.test(inputPhone) || /^0951[0-9]{7}/.test(inputPhone) || /^0960[0-9]{7}/.test(inputPhone) || /^0961[0-9]{7}/.test(inputPhone) || /^0963[0-9]{7}/.test(inputPhone) || /^0964[0-9]{7}/.test(inputPhone) || /^0968[0-9]{7}/.test(inputPhone) || /^0969[0-9]{7}/.test(inputPhone) || /^0970[0-9]{7}/.test(inputPhone) || /^0971[0-9]{7}/.test(inputPhone) || /^0998[0-9]{7}/.test(inputPhone) || /^0999[0-9]{7}/.test(inputPhone)) {
            InsertData();
        }
        //Sun Cellular
        else if (/^0922[0-9]{7}/.test(inputPhone) || /^0923[0-9]{7}/.test(inputPhone) || /^0924[0-9]{7}/.test(inputPhone) || /^0925[0-9]{7}/.test(inputPhone) || /^0931[0-9]{7}/.test(inputPhone) || /^0932[0-9]{7}/.test(inputPhone) || /^0933[0-9]{7}/.test(inputPhone) || /^0934[0-9]{7}/.test(inputPhone) || /^0941[0-9]{7}/.test(inputPhone) || /^0942[0-9]{7}/.test(inputPhone) || /^0943[0-9]{7}/.test(inputPhone) || /^0944[0-9]{7}/.test(inputPhone) || /^0952[0-9]{7}/.test(inputPhone) || /^0962[0-9]{7}/.test(inputPhone) || /^0972[0-9]{7}/.test(inputPhone) || /^0973[0-9]{7}/.test(inputPhone) || /^0974[0-9]{7}/.test(inputPhone)) {
            InsertData();
        }
        //DITO Telecommunity
        else if (/^0991[0-9]{7}/.test(inputPhone) || /^0992[0-9]{7}/.test(inputPhone) || /^0993[0-9]{7}/.test(inputPhone) || /^0994[0-9]{7}/.test(inputPhone) || /^0895[0-9]{7}/.test(inputPhone) || /^0896[0-9]{7}/.test(inputPhone) || /^0897[0-9]{7}/.test(inputPhone) || /^0898[0-9]{7}/.test(inputPhone)) {
            InsertData();
        }
        //If the phone number is invalid
        else {
            alert('Please input valid phone number!!')
        }
    }
    //End of reservation
    //Submit Btn End
})

/* Philippines Sim cards Prefixes
0905 - Globe or TM
0906 - Globe or TM
0915 - Globe
0916 - Globe or TM
0917 - Globe
0926 - Globe or TM
0927 - Globe or TM
0935 - Globe or TM
0936 - Globe or TM
0937 - ABS-CBN mobile (defunct)
0945 - Globe or TM
0953 - TM
0954 - Globe, TM, or Globe At Home Prepaid WiFi
0955 - Globe or TM
0956 - Globe or TM
0957 - Globe or TM
0958 - Globe or TM
0959 - Globe or TM
0965 - Globe or TM
0966 - Globe or TM
0967 - Globe or TM
0975 - Globe or TM
0976 - GOMO
0977 - TM, Globe Prepaid, or Globe Postpaid Plan - formerly Next Mobile
0978 - Globe - formerly Next Mobile
0979 - Globe - formerly Next Mobile
0980 - Globe - formerly Next Mobile
0995 - Globe or TM
0996 - Cherry Prepaid
0997 - Globe or TM
0817 - Globe
09173 - Globe Postpaid
09175 - Globe Postpaid
09176 - Globe Postpaid
09178 - Globe Postpaid
09253 - Globe Postpaid
09255 - Globe Postpaid
09256 - Globe Postpaid
09257 - Globe Postpaid
09258 - Globe Postpaid

Smart and TNT Number Prefixes
0813 - Smart Postpaid
0900 - Smart
0907 - TNT
0908 - Smart
0909 - TNT
0910 - TNT
0911 - Smart
0912 - TNT
0913 - Smart
0914 - Smart
0918 - Smart or TNT
0919 - TNT
0920 - TNT - formerly Addict Mobile number
0921 - TNT
0928 - TNT
0929 - TNT
0930 - TNT - formerly Red Mobile
0938 - TNT - formerly Red Mobile
0939 - TNT - formerly Red Mobile
0940 - Smart
0946 - TNT
0947 - TNT
0948 - TNT
0949 - TNT
0950 - TNT
0951 - Smart
0960 - Smart
0961 - Smart
0963 - TNT 5G ready SIM
0964 - Smart or PLDT Prepaid WiFi
0968 - Smart
0969 - Smart
0970 - Smart
0971 - Smart
0998 - Smart
0999 - Smart - formerly Umobile number

Sun Cellular Number Prefixes
0922 - Sun Cellular
0923 - Sun Cellular
0924 - Sun Cellular
0925 - Sun Cellular
0931 - Sun Cellular
0932 - Sun Cellular
0933 - Sun Cellular
0934 - Sun Cellular
0941 - Sun Cellular
0942 - Sun Cellular
0943 - Sun Cellular
0944 - Sun Cellular
0952 - Sun Cellular
0962 - Sun Cellular
0972 - Sun Cellular
0973 - Sun Cellular - formerly Extelcom
0974 - Sun Cellular - formerly Extelcom

DITO Telecommunity Number Prefixes
0991 - DITO
0992 - DITO
0993 - DITO
0994 - DITO
0895 - DITO
0896 - DITO
0897 - DITO
0898 - DITO
*/


// ------------------- Restart the page when the QR modal is close

document.querySelector('#restartPageCloseBtn').addEventListener('click', function() {
    window.location.reload();
})

document.querySelector('#restartPageXBtn').addEventListener('click', function() {
    window.location.reload();
})
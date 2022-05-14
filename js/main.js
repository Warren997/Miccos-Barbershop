// ------------- Header Onscroll


function headerScroll() {
    if (window.pageYOffset == 0) {
        //Scroll Top
        //Hidden Header - hidden
        document.querySelector('.hidden-header').style.visibility = 'hidden';
        //Animation reset
        document.querySelector('.hidden-header').style.animation = 'none';
    } else if (window.pageYOffset < 88) {
        //Scroll Down
        //Hidden Header - visible
        document.querySelector('.hidden-header').style.visibility = 'visible';
        //Animation fade-in-top
        document.querySelector('.hidden-header').style.animation = 'fade-in-top 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both';
    }
}


//testimonials
var testimonials = document.querySelector('.testimonial-item-container');

function testimonialBtnNext() {
    if (testimonials.style.marginLeft == '') {
        testimonials.style.marginLeft = '-100%';
    } else if (testimonials.style.marginLeft == '-100%') {
        testimonials.style.marginLeft = '-200%';
    }
}

function testimonialBtnPrev() {
    if (testimonials.style.marginLeft == '-200%') {
        testimonials.style.marginLeft = '-100%';
    } else if (testimonials.style.marginLeft == '-100%') {
        testimonials.style.marginLeft = '';
    }
}


//Burger Menu

var toggleStatus = false;

function menuIcon(x) {
    let getSidebar = document.querySelector(".menu-dropdown");
    if (toggleStatus === false) {
        getSidebar.style.height = "250px";
        toggleStatus = true;
    } else if (toggleStatus === true) {
        getSidebar.style.height = "0px";
        toggleStatus = false;
    }
    x.classList.toggle("change");
}
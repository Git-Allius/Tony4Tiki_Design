const menu = document.getElementById("MenuItems");

function toggleMenu() {
    menu.classList.toggle("active");
}

const testimonialWheel = document.getElementById("testimonialWheel");
let testimonialMoving = false;

function getTestimonialStep() {
    const card = testimonialWheel.querySelector(".testimonial-card");
    const gap = 25;
    return card.offsetWidth + gap;
}

function moveTestimonials(direction) {
    if (testimonialMoving) return;

    testimonialMoving = true;
    const step = getTestimonialStep();

    if (direction === 1) {
        testimonialWheel.style.transform = `translateX(-${step}px)`;

        setTimeout(() => {
            testimonialWheel.appendChild(testimonialWheel.firstElementChild);
            testimonialWheel.style.transition = "none";
            testimonialWheel.style.transform = "translateX(0)";

            testimonialWheel.offsetHeight;

            testimonialWheel.style.transition = "transform 0.4s ease";
            testimonialMoving = false;
        }, 400);
    }

    if (direction === -1) {
        testimonialWheel.style.transition = "none";
        testimonialWheel.insertBefore(
            testimonialWheel.lastElementChild,
            testimonialWheel.firstElementChild
        );
        testimonialWheel.style.transform = `translateX(-${step}px)`;

        testimonialWheel.offsetHeight;

        testimonialWheel.style.transition = "transform 0.4s ease";
        testimonialWheel.style.transform = "translateX(0)";

        setTimeout(() => {
            testimonialMoving = false;
        }, 400);
    }
}
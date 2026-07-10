 window.addEventListener("load", () => {
    document.body.style.opacity = "1";
});

/animation/
const reveals = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .reveal-scale"
);

function revealOnScroll() {
    const trigger = window.innerHeight * 0.85;

    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;

        if (top < trigger) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

window.addEventListener("load", () => {

    setTimeout(() => {

        document.body.classList.add("loaded");

    },1800);

});
window.addEventListener("load", ()=>{

    setTimeout(()=>{
        document.getElementById("verify").style.opacity="1";
    },2200);

    setTimeout(()=>{
        document.getElementById("ready").style.opacity="1";
    },3300);

    setTimeout(()=>{
        document.getElementById("loader").style.opacity="0";
        document.getElementById("loader").style.pointerEvents="none";
    },4500);

});

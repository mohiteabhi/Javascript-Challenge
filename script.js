const fireButton = document.getElementById("fireButton");
const nameInput = document.getElementById("nameInput");
const message = document.getElementById("message");
const wishSound = document.getElementById("wishSound");
const firecrackerLeft = document.getElementById("firecrackerLeft");
const firecrackerRight = document.getElementById("firecrackerRight");
// const firecrackerTop = document.getElementById("firecrackerTop");

wishSound.loop = true;

fireButton.addEventListener("click", () => {
    const name = nameInput.value.trim();
    
    if (name) {

        if (wishSound.paused) {
            wishSound.play();
        }

        message.innerHTML = `💥 Happy Diwali, ${name}! 💥`;

        firecrackerLeft.style.display = "block";
        firecrackerRight.style.display = "block";
        // firecrackerTop.style.display = "block";
    } else {
        message.innerHTML = "Please enter your name!";
    }
});

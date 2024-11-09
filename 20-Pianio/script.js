
const pianoKeys = document.querySelectorAll(".piano-keys .key"),
      volumeSlider = document.querySelector(".volume-slider input"),
      keyCheckbox = document.querySelector(".keys-checkbox input"),
      recordButton = document.querySelector(".record-btn"),
      playbackButton = document.querySelector(".playback-btn"),
      keyDisplay = document.getElementById("keyDisplay");


let allKeys = [],
    audio = new Audio(),
    isPlaying = false;
    isRecording = false,
    recordedKeys = [],
    playbackIndex = 0;

const playTune = (key) => {
    if (isPlaying) return; 
    audio.src = `sounds/${key}.wav`;
    audio.loop = true;
    audio.play().then(() => {
        isPlaying = true;
        const clickedKey = document.querySelector(`[data-key="${key}"]`);
        clickedKey.classList.add("active");

        keyDisplay.textContent = key.toUpperCase();
    }).catch(error => {
        console.error("Playback error:", error);
    });
}

const stopTune = () => {
    if (!isPlaying) return; 
    audio.pause();
    audio.currentTime = 0;
    isPlaying = false;
    const activeKey = document.querySelector(".piano-keys .key.active");
    if (activeKey) activeKey.classList.remove("active");

    keyDisplay.textContent = "_";
}


pianoKeys.forEach(key => {
    allKeys.push(key.dataset.key);
    key.addEventListener("mousedown", () => playTune(key.dataset.key)); 
    key.addEventListener("mouseup", stopTune); 
});

const handleVolume = (e) => {
    audio.volume = e.target.value;
}

const showHideKeys = () => {
    pianoKeys.forEach(key => key.classList.toggle("hide"));
}

const pressedKey = (e) => {
    if (allKeys.includes(e.key)) playTune(e.key);
}

const releasedKey = (e) => {
    if (allKeys.includes(e.key)) stopTune();
}


keyCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);
document.addEventListener("keyup", releasedKey);


let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
let songImg = document.getElementById("song-img");
let songTitle = document.getElementById("song-title");
let songArtist = document.getElementById("song-artist");

const songs = [
    {
        title: "e-Spiderman",
        artist: "anonymous",
        src: "Spiderman.mp3",
        img: "s.webp"
    },
    {
        title: "Back In Black",
        artist: "AC/DC",
        src: "Back-in-black.mp3",
        img: "acdc.png"
    },
    {
        title: "Rolex Theam",
        artist: "Anirudh",
        src: "Rolex.mp3",
        img: "rolex.webp"
    }
];

let songIndex = 0;

function loadSong(index) {
    const currentSong = songs[index];
    song.src = currentSong.src;
    songImg.src = currentSong.img;
    songTitle.innerText = currentSong.title;
    songArtist.innerText = `-By ${currentSong.artist}`;
    progress.value = 0;
}

function playPause() {
    if (ctrlIcon.classList.contains("fa-pause")) {
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    } else {
        song.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
    }
}

function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
    playPause();
}

function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songIndex);
    playPause();
}

song.onloadedmetadata = function () {
    progress.max = song.duration;
    progress.value = song.currentTime;
};

if (song.play()) {
    setInterval(() => {
        progress.value = song.currentTime;
    }, 500);
}

progress.onchange = function () {
    song.currentTime = progress.value;
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
};

loadSong(songIndex);
